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

  const afterPath = path.join(OUT_DIR, 'arabitilbot-lessons.png');
  await page.screenshot({ path: afterPath, fullPage: true });
  console.log('Saved', afterPath);

  await browser.close();
  console.log('Done');
})();
