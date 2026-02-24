import { test, expect } from '@playwright/test';

test('onboarding -> lessons flow', async ({ page, baseURL }) => {
  await page.goto('/arab-tili');

  // Onboarding content
  await expect(page.getByText('Burro')).toBeVisible();
  const cta = page.getByRole('button', { name: /Boshlash/i });
  await expect(cta).toBeVisible();

  // capture onboarding screenshot
  await page.screenshot({ path: 'artifacts/playwright-onboarding.png', fullPage: true });

  // Navigate to lessons
  await cta.click();
  await page.waitForURL(/arab-tili\/lessons/);

  // Verify lessons header or hero text visible
  await expect(page.getByText(/Sa, Jim, Ha|Davom etish/i)).toBeVisible();

  // capture lessons screenshot
  await page.screenshot({ path: 'artifacts/playwright-lessons.png', fullPage: true });
});
