import {test, expect} from '@playwright/test';
const {registerPageSelectors} = require('../fixtures/locators/registerPageSelectors');
const {loginPageSelectors} = require('../fixtures/locators/loginPageSelectors');
const {commonPage} = require('../fixtures/locators/commonPage');


test.describe('Register New User', () => {
    const randomNumber = Math.floor(Math.random() * 1000);

    test.beforeEach(async ({page}) => {
        await page.goto(commonPage.baseUrl + registerPageSelectors.registerUrl);
    });

    test('successfully register new user', async ({page}) => {
        await page.fill(registerPageSelectors.username, 'testuser' + randomNumber);
        await page.fill(registerPageSelectors.password, 'testingpassword123');
        await page.click(registerPageSelectors.register_submit);
        await expect(page).toHaveURL(commonPage.baseUrl + loginPageSelectors.loginUrl);
    })
    test('Attempt unsuccessful registration with short password', async ({page}) => {
        await page.fill(registerPageSelectors.username, 'testuser' + randomNumber);
        await page.fill(registerPageSelectors.password, 'test');
        await page.click(registerPageSelectors.register_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Password must be at least 8 characters long');
            await dialog.dismiss();
        });
    });
    test('Attempt unsuccessful registration with no number in password', async ({page}) => {
        await page.fill(registerPageSelectors.username, 'testuser' + randomNumber);
        await page.fill(registerPageSelectors.password, 'testingpassword');
        await page.click(registerPageSelectors.register_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Password must contain at least one number');
            await dialog.dismiss();
        });
    });
    test('Attempt unsuccessful registration with a password with no special characters', async ({page}) => {
        await page.fill(registerPageSelectors.username, 'testuser' + randomNumber);
        await page.fill(registerPageSelectors.password, 'testingpassword123');
        await page.click(registerPageSelectors.register_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Password must contain at least one special character');
            await dialog.dismiss();
        });
    });
    test('Attempt unsuccessful registration with existing user', async ({page}) => {
        await page.fill(registerPageSelectors.username, 'will');
        await page.fill(registerPageSelectors.password, 'testingpassword123');
        await page.click(registerPageSelectors.register_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('User already exists');
            await dialog.dismiss();
        });
    });
    test('Attempt registration with empty username', async ({page}) => {
        await page.fill(registerPageSelectors.username, '');
        await page.fill(registerPageSelectors.password, 'testingpassword123!');
        await page.click(registerPageSelectors.register_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please enter a username');
            await dialog.dismiss();
        });
    });
    test('Attempt registration with empty password', async ({page}) => {
        await page.fill(registerPageSelectors.username, 'testUser' + randomNumber);
        await page.fill(registerPageSelectors.password, '');
        await page.click(registerPageSelectors.register_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please enter a password');
            await dialog.dismiss();
        });
    });
});

test.describe('Login functionality', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(commonPage.baseUrl + loginPageSelectors.loginUrl);
    });

    test('Successfully login with valid credentials', async ({page}) => {
        await page.fill(loginPageSelectors.username, 'testuser');
        await page.fill(loginPageSelectors.password, 'testpassword123!');
        await page.click(loginPageSelectors.login_submit);
        await expect(page).toHaveURL(commonPage.baseUrl + '/game/newUserSelectionPage');
    });

    test('Unsuccessful login with invalid password', async ({page}) => {
        await page.fill(loginPageSelectors.username, 'testuser');
        await page.fill(loginPageSelectors.password, 'wrongpassword');
        await page.click(loginPageSelectors.login_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Invalid username or password');
            await dialog.dismiss();
        });
    });
    test('Unsuccessful login with non-existing user', async ({page}) => {
        await page.fill(loginPageSelectors.username, 'nonexistinguser');
        await page.fill(loginPageSelectors.password, 'testpassword123!');
        await page.click(loginPageSelectors.login_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Invalid username or password');
            await dialog.dismiss();
        });
    });
    test('Attempt login with empty username', async ({page}) => {
        await page.fill(loginPageSelectors.username, '');
        await page.fill(loginPageSelectors.password, 'testingpassword123!');
        await page.click(loginPageSelectors.login_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Invalid username or password');
            await dialog.dismiss();
        });
    });
    test('Attempt login with empty password with existing user', async ({page}) => {
        await page.fill(loginPageSelectors.username, 'testuser');
        await page.fill(loginPageSelectors.password, '');
        await page.click(loginPageSelectors.login_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please enter a password');
            await dialog.dismiss();
        })
    });
    test('Attempt login with empty username and password', async ({page}) => {
        await page.fill(loginPageSelectors.username, '');
        await page.fill(loginPageSelectors.password, '');
        await page.click(loginPageSelectors.login_submit);
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please enter a username and password');
            await dialog.dismiss();
        });
    });
});