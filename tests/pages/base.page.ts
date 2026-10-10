import type { LoadState, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly adminTab: Locator;
  readonly addUserButton: Locator;
  readonly addUserHeader: Locator;
  readonly userRoleDropdown: Locator;
  readonly employeeName: Locator;
  readonly employeeNameResults: Locator;
  readonly status: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly saveButton: Locator;
  readonly systemUsers: Locator;
  readonly searchUsername: Locator;
  readonly searchButton: Locator;
  readonly recordsFound: Locator;
  readonly editIcon: Locator;
  readonly editUserTitle: Locator;
  readonly deleteIcon: Locator;
  readonly confirmDelete: Locator;
  readonly confirmPopup : Locator;
  readonly noRecords: Locator;

  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.adminTab = page.locator('.oxd-main-menu-item-wrapper').filter({ hasText: 'Admin' });
    this.addUserButton = page.locator('.oxd-button').filter({ hasText: 'Add' });
    this.addUserHeader = page.locator('h6.oxd-text').filter({ hasText: 'Add User' });
    this.systemUsers =  page.getByRole('heading', { name: 'System Users' });
    this.searchUsername = page.locator("div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']");
    this.searchButton =  page.getByRole('button', { name: 'Search' });
    this.recordsFound =  page.getByText('(1) Record Found', { exact: true });
    this.editIcon =  page.locator('div.oxd-table-cell-actions').locator('button').nth(1);
    this.editUserTitle =  page.getByRole('heading', { name: 'Edit User' });
    this.deleteIcon =  page.locator('div.oxd-table-cell-actions').locator('button').nth(0);
    this.confirmDelete =  page.getByRole('button', { name: 'Yes, Delete' });
    this.confirmPopup =  page.locator('div.oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.oxd-dialog-sheet.oxd-dialog-sheet--shadow.oxd-dialog-sheet--gutters.orangehrm-dialog-popup');
   this.noRecords =  page.getByText('No Records Found', { exact: true }).first();
    this.userRoleDropdown = page
      .locator('.oxd-input-group__label-wrapper')
      .filter({ hasText: 'User Role' })
      .locator('xpath=following-sibling::div[1]')
      .locator('.oxd-select-text');

    this.employeeName = page
    .getByRole('textbox', { name: 'Type for hints...' });

    this.employeeNameResults = page.locator(
      '[role="listbox"].oxd-autocomplete-dropdown',
    );

    this.status = page
      .locator('.oxd-input-group__label-wrapper')
      .filter({ hasText: 'Status' })
      .locator('xpath=following-sibling::div[1]')
      .locator('.oxd-select-text');

    this.userName = page
      .locator('.oxd-input-group__label-wrapper')
      .filter({ hasText: 'Username' })
      .locator('xpath=following-sibling::div[1]')
      .locator('.oxd-input');

    this.password = page
      .locator('.oxd-input-group__label-wrapper')
      .filter({ hasText: /^Password$/ })
      .locator('xpath=following-sibling::div[1]')
      .locator('input.oxd-input');

    this.confirmPassword = page
      .locator('.oxd-input-group__label-wrapper')
      .filter({ hasText: /^Confirm Password$/ })
      .locator('xpath=following-sibling::div[1]')
      .locator('input.oxd-input');

    this.saveButton = page.locator('.oxd-button').filter({ hasText: 'Save' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'load' });
    await this.waitForNetworkIdle();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async wait(time: number): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, time));
  }

  async waitForLoadState(state: LoadState = 'load'): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.waitForLoadState('networkidle');
  }
}
