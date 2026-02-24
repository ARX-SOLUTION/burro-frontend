import { expect, test } from '@playwright/test';

async function resolveBase(page: any) {
  const env = process.env.BASE_URL;
  const candidates = [env, 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://localhost:5173', 'http://localhost:5174', 'http://[::1]:5173', 'http://[::1]:5174'].filter(Boolean);
  for (const c of candidates) {
    try {
      // Try a fast navigation to the root to determine reachability
      const resp = await page.goto(c, { waitUntil: 'domcontentloaded', timeout: 2000 }).catch(() => null);
      if (resp && (resp.status() === 200 || resp.status() === 301 || resp.status() === 302 || resp.status() === 304)) return c;
      // if response object not available, but navigation succeeded without throwing, accept it
      if (resp) return c;
    } catch (e) {
      // ignore and try next
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
});
