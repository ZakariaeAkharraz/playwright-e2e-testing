import { test, expect } from '@playwright/test';

test('navigating to missions', async ({ page }) => {
  await page.goto('/fr/dashboard');
  // await expect(page).toHaveTitle(/GamiTool /);
  // await page.getByRole('textbox', { name: 'Votre e-mail' }).click();
  // await page.getByRole('textbox', { name: 'Votre e-mail' }).fill('sotavew907@fanlvr.com');
  // await page.getByRole('textbox', { name: '••••••••' }).click();
  // await page.getByRole('textbox', { name: '••••••••' }).fill('Pass12345@');
  // await page.getByRole('button', { name: 'Se connecter' }).click();
  // await expect(page).toHaveURL(/.*dashboard/)

  // await page.waitForLoadState('networkidle');




  // console.log(await page.getByRole('button', { name: 'Close tutorial' }).count());

  await expect(page.getByRole('img', { name: 'GamiTool' })).toBeVisible({ timeout: 5000 })

  await page.getByRole('button', { name: 'Close tutorial' }).click();

  await page.getByRole('button', { name: 'Mon Arène' }).click();



  // await page.locator('text="Mon Arène"').click();

  // await page.getByText("Mon Arène",{exact:true}).click();
  await expect(page).toHaveURL(/.*arenas.*/)

  const ArenaTutorialCloseButton = page.getByRole('button', { name: 'Close tutorial' });

  if (await ArenaTutorialCloseButton.isVisible()) {
    await ArenaTutorialCloseButton.click();
  }

  await page.getByRole("heading",{name:'asahi 58'}).click();

  await expect(page).toHaveURL(/projects/);

  

});
