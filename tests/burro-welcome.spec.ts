import { expect, test } from '@playwright/test';

test('Burro welcome default screen starts the flow', async ({ page }) => {
  await page.goto('/burro/welcome');

  await expect(page.getByText('Arab tilini yengil boshlang')).toBeVisible();
  await expect(
    page.getByText("Arab tilini noldan boshlab, oson va qiziqarli o'rganing."),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Boshlash' }).click();
  await expect(page).toHaveURL(/\/auth\/register\?redirect=%2Fburro$/);
});

test('Burro welcome figma variants are reachable', async ({ page }) => {
  await page.goto('/burro/welcome?variant=figma-3-50');
  await expect(page.getByText('Audio mashqlar')).toBeVisible();
  await expect(page.getByText('XP va streak')).toBeVisible();

  await page.goto('/burro/welcome?variant=figma-3-51');
  await expect(page.getByRole('heading', { name: /Darslaringiz tartibli bo.ladi/ })).toBeVisible();

  await page.getByRole('button', { name: 'Keyinroq' }).click();
  await expect(page).toHaveURL(/\/auth\/login\?redirect=%2Fburro%2Fprofile$/);
});
