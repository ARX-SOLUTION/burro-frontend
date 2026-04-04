import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const OUT_DIR = path.resolve(process.cwd(), 'artifacts');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const base = process.env.BASE_URL || 'http://127.0.0.1:5173';

  console.log('Navigating to', `${base}/arab-tili`);
  await page.goto(`${base}/arab-tili`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Basic assertions for onboarding page
  const title = await page.locator('text=Burro').first();
  if (!(await title.isVisible())) {
    console.error('Assertion failed: onboarding title "Burro" not visible');
    await browser.close();
    process.exit(2);
  }

  const cta = page.getByRole('button', { name: /Boshlash/i });
  if (!(await cta.isVisible())) {
    console.error('Assertion failed: Boshlash button not visible on onboarding');
    await browser.close();
    process.exit(3);
  }

  const beforePath = path.join(OUT_DIR, 'arabitilbot-onboarding.png');
  await page.screenshot({ path: beforePath, fullPage: true });
  console.log('Saved', beforePath);

  // Click Boshlash and assert navigation to lessons
  await cta.click();
  try {
    await page.waitForURL('**/arab-tili/lessons', { timeout: 5000 });
  } catch (e) {
    console.error('Navigation to /arab-tili/lessons did not happen within timeout');
    await browser.close();
    process.exit(4);
  }

  await page.waitForTimeout(500);
  const lessonsHeader = page.getByText(/Davom etish|Sa, Jim, Ha/i).first();
  if (!(await lessonsHeader.isVisible())) {
    console.error('Assertion failed: lessons header not visible after navigation');
    await browser.close();
    process.exit(5);
  }

  // Additional assertions: progress bar, module cards, CTA style
  try {
    const progressInner = page.locator('div[style*="width"]').first();
    if ((await progressInner.count()) > 0) {
      const pct = await progressInner.evaluate((el) => {
        const w = window.getComputedStyle(el).width;
        const parent = el.parentElement;
        if (!parent) return null;
        const pw = window.getComputedStyle(parent).width;
        const nW = parseFloat(w);
        const nPW = parseFloat(pw);
        if (isFinite(nW) && isFinite(nPW) && nPW > 0) return Math.round((nW / nPW) * 100);
        return null;
      });
      console.log('Progress percent (approx):', pct);
    }
  } catch (e) {
    console.warn('Could not evaluate progress inner width', e?.message || e);
  }

  // Module card titles
  await page.waitForTimeout(200);
  const hasAlif = await page.getByText('Alif').count();
  const hasSa = await page.getByText('Sa').count();
  if (!hasAlif || !hasSa) {
    console.error('Module card texts missing');
    await browser.close();
    process.exit(6);
  }

  // Check hero CTA background color
  const heroCta = page.getByRole('button', { name: /Boshlash/i }).first();
  const bg = await heroCta.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  console.log('Hero CTA background:', bg);

  const afterPath = path.join(OUT_DIR, 'arabitilbot-lessons.png');
  await page.screenshot({ path: afterPath, fullPage: true });
  console.log('Saved', afterPath);

  await browser.close();
  console.log('Done');
})();
