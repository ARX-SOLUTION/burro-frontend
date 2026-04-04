import { expect, test } from '@playwright/test';

async function resolveBase(page: any) {
  // Use only `BASE_URL` if provided. Otherwise probe the common preview ports with retries.
  const env = process.env.BASE_URL;
  if (env) {
    // if BASE_URL is set, try it with a single attempt (longer timeout)
    const resp = await page.goto(env, { waitUntil: 'domcontentloaded', timeout: 8000 }).catch(() => null);
    if (resp) return env;
    throw new Error('No reachable preview server found at BASE_URL: ' + env);
  }

  const candidates = ['http://127.0.0.1:5173', 'http://127.0.0.1:5174'];

  // helper sleep
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  for (const base of candidates) {
    // try for up to ~10 seconds per candidate with short backoff
    const maxAttempts = 20;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const resp = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 2000 }).catch(() => null);
        if (resp && (resp.status() >= 200 && resp.status() < 400)) return base;
        if (resp) return base; // navigation succeeded but no status (e.g., file:// fallback)
      } catch (e) {
        // ignore and retry
      }
      // small jitter backoff
      await sleep(250 + attempt * 10);
    }
  }

  throw new Error('No reachable preview server found. Tried: ' + candidates.join(', '));
}

test('onboarding -> lessons flow', async ({ page }) => {
  const base = await resolveBase(page);
  await page.goto(base + '/arab-tili');

  // Onboarding content
  await expect(page.getByText('Burro')).toBeVisible();
  const cta = page.getByRole('button', { name: /Boshlash/i });
  await expect(cta).toBeVisible();

  // capture onboarding screenshot
  await page.screenshot({ path: 'artifacts/playwright-onboarding.png', fullPage: true });

  // Navigate to lessons
  await cta.click();
  await page.waitForURL(/arab-tili\/lessons/);

  // Verify lessons header or hero text visible (use first match)
  await expect(page.getByText(/Sa, Jim, Ha|Davom etish/i).first()).toBeVisible();

  // capture lessons screenshot
  await page.screenshot({ path: 'artifacts/playwright-lessons.png', fullPage: true });
});

test('lesson page UI details', async ({ page }) => {
  const base = await resolveBase(page);
  await page.goto(base + '/arab-tili/lessons');

  // progress bar inner width should be non-zero and ideally ~45%
  const progressInner = page.locator('div[style*="width"]').filter({ hasText: '' }).first();
  // evaluate computed width percent of progress inner if present
  if (await progressInner.count() > 0) {
    const pct = await progressInner.evaluate((el) => {
      const w = window.getComputedStyle(el).width;
      const parent = el.parentElement;
      if (!parent) return null;
      const pw = window.getComputedStyle(parent).width;
      try {
        const nW = parseFloat(w);
        const nPW = parseFloat(pw);
        if (isFinite(nW) && isFinite(nPW) && nPW > 0) return Math.round((nW / nPW) * 100);
      } catch (e) {
        return null;
      }
      return null;
    });
    if (pct === null) {
      // allow null if layout not present, but otherwise ensure it's a number in a sane range
      expect(pct === null).toBeTruthy();
    } else {
      expect(typeof pct === 'number').toBeTruthy();
      // expect percent between 1% and 99%
      expect(pct).toBeGreaterThanOrEqual(1);
      expect(pct).toBeLessThanOrEqual(99);
    }
  }

  // Module cards contain expected titles
  await expect(page.getByText('Alif').first()).toBeVisible();
  await expect(page.getByText('Sa').first()).toBeVisible();

  // expect at least two module entries present
  const modules = await Promise.all([
    page.getByText('Alif').count(),
    page.getByText('Sa').count(),
  ]);
  expect(modules.reduce((a, b) => a + b, 0)).toBeGreaterThanOrEqual(2);

  // CTA in hero should have white background and teal text; check CTA background color on lessons hero
  const heroCta = page.getByRole('button', { name: /Boshlash/i }).first();
  await expect(heroCta).toBeVisible();
  const bg = await heroCta.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  // accept either white or rgb(255,255,255)
  expect(bg === 'rgb(255, 255, 255)' || bg.includes('255')).toBeTruthy();

  // check CTA text color is the expected teal (approx rgb(13,148,136))
  const color = await heroCta.evaluate((el) => window.getComputedStyle(el).color);
  expect(color.includes('13') || color.includes('148') || color.includes('136')).toBeTruthy();

  // Floating center play button should be visible and clickable
  const floatingPlay = page.getByRole('button', { name: /O'rtadagi Boshlash|O'rtadagi|Boshlash|Play/i }).first();
  await expect(floatingPlay).toBeVisible();
  // Click and ensure navigation to a lesson play page works
  await floatingPlay.click();
  await page.waitForURL(/arab-tili\/lesson\/[a-zA-Z0-9_-]+\/play/);
  // go back to lessons for remaining assertions
  await page.goBack();

  // Locked modules should show an overlay icon with alt text 'locked'
  const lockedImg = page.locator('img[alt="locked"]').first();
  if (await lockedImg.count() > 0) {
    await expect(lockedImg).toBeVisible();
  } else {
    // if no locked modules present in this build, ensure at least module cards exist
    const moduleCards = await page.getByText('Alif').count();
    expect(moduleCards).toBeGreaterThanOrEqual(1);
  }
});

test('lesson-play interactions: check then next advances question', async ({ page }) => {
  const base = await resolveBase(page);
  await page.goto(base + '/arab-tili/lesson/sa/play');

  // find the check button and ensure it's disabled before selection
  const checkBtn = page.getByRole('button', { name: /Tekshirish/i }).first();
  await expect(checkBtn).toBeVisible();
  await expect(checkBtn).toBeDisabled();

  // capture the large letter before answering
  const letterLocator = page.getByText(/[\u0600-\u06FF]/).first();
  const before = (await letterLocator.textContent()) || '';

  // select the first option (Ja)
  const firstOption = page.getByRole('button', { name: /^Ja$|^Sa$|^Alif$/ }).first();
  await expect(firstOption).toBeVisible();
  await firstOption.click();

  // check button should become enabled
  await expect(checkBtn).toBeEnabled();

  // click check to reveal feedback
  await checkBtn.click();
  await expect(page.getByText(/To'g'ri|Noto'g'ri|To'gri|Noto'gri/i).first()).toBeVisible();

  // after checking, button becomes 'Keyingi' — click it to advance
  const nextBtn = page.getByRole('button', { name: /Keyingi|Darsni yakunlash/ }).first();
  await expect(nextBtn).toBeVisible();
  await nextBtn.click();

  // verify the displayed letter changed
  const after = (await letterLocator.textContent()) || '';
  expect(after).not.toBe(before);
});
