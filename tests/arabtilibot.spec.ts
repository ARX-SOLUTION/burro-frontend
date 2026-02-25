import { expect, test } from '@playwright/test';

test('ArabTiliBot lessons basic flow', async ({ page, baseURL }) => {
  await page.goto('/arab-tili/lessons');

  // Start the featured lesson (Sa)
  await page.getByRole('button', { name: /Boshlash|O'rtadagi Boshlash|Play/i }).first().click();

  await expect(page).toHaveURL(/arab-tili\/lesson\//);

  // If landing on lesson detail, navigate to play
  if (page.url().includes('/lesson/') && !page.url().includes('/play')) {
    await page.getByRole('button', { name: /Boshlash|O'ynash|Boshlash/i }).first().click();
    await expect(page).toHaveURL(/play/);
  }

  // Wait for choices to appear
  const choice = page.locator('div.space-y-4 button').first();
  await expect(choice).toBeVisible();

  // Select first choice and attempt check
  await choice.click();

  const checkBtn = page.getByRole('button', { name: /Tekshirish|Check/i }).first();
  await expect(checkBtn).toBeVisible();
  await checkBtn.click();

  // Expect either feedback or success overlay
  const successEmoji = page.getByText('🎉').first();
  const feedback = page.locator("text=To\'g\'ri").first();

  const successVisible = await successEmoji.isVisible().catch(() => false);
  const feedbackVisible = await feedback.isVisible().catch(() => false);

  // At least one of success or feedback should be visible
  expect(successVisible || feedbackVisible).toBe(true);
});
