import { expect, test } from '@playwright/test';
import { testData } from './data/test-data';
import { BasePage } from './pages/base.page';

test.describe.serial('Authenticated user', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.goto(testData.urls.login);
    await basePage.login(
      testData.credentials.username,
      testData.credentials.password,
    );
  });


  test('Adding a user through user management', async ({ page }) => {
   await basePage.wait(3000);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({timeout: 5000});
    await basePage.click(basePage.adminTab);
    await basePage.wait(3000);
    await expect(basePage.addUserButton).toBeVisible({timeout: 5000});
    await basePage.click(basePage.addUserButton);
    await basePage.wait(3000);
    await expect(basePage.addUserHeader).toBeVisible({timeout: 5000});
    await basePage.click(basePage.userRoleDropdown);
    await basePage.click(page.getByRole('option', { name: 'Admin' }));
    await basePage.fill(
      basePage.employeeName,
      testData.newUser.employeeSearchText,
    );
    await page.waitForTimeout(5000);
    await basePage.click(
      basePage.employeeNameResults.getByRole('option').first(),
    );
    await basePage.click(basePage.status);
    await basePage.click(page.getByRole('option', { name: 'Enabled' }));
    await basePage.fill(basePage.userName, testData.newUser.username);
    await basePage.fill(basePage.password, testData.newUser.password);
    await basePage.fill(basePage.confirmPassword, testData.newUser.password);
    await basePage.click(basePage.saveButton);
    await basePage.wait(3000);
    await expect(basePage.addUserButton).toBeVisible({timeout: 10000});

  });

    test('Searching for the user , editing, validating and deleting', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({timeout: 5000});
    await basePage.click(basePage.adminTab);
    await expect(basePage.systemUsers).toBeVisible({timeout:5000});
    await basePage.fill(basePage.searchUsername,testData.newUser.username);
    await basePage.click(basePage.searchButton);
    await expect(basePage.recordsFound).toBeVisible({timeout:5000});
    await basePage.click(basePage.editIcon);
    await basePage.wait(3000);
    await expect(basePage.editUserTitle).toBeVisible({timeout:1000});
    await basePage.fill(basePage.userName, testData.newUser.newUserName);
    await basePage.click(basePage.saveButton);
    await basePage.wait(3000);
    await expect(basePage.systemUsers).toBeVisible({timeout:5000});
    await basePage.fill(basePage.searchUsername,testData.newUser.newUserName);
     await basePage.wait(3000);
    await basePage.click(basePage.searchButton);
    await expect(basePage.recordsFound).toBeVisible({timeout:5000});
    await basePage.click(basePage.deleteIcon);
    await expect(basePage.confirmPopup).toBeVisible({timeout:5000});
    await basePage.click(basePage.confirmDelete);
    await expect(basePage.noRecords).toBeVisible({timeout:5000});
    

  });
});