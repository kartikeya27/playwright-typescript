import { test, expect } from '../base/pomFixture';
import * as data from '../test-data/addToCart.test-data.json';

// test.use({ 
//     browserName: 'firefox' 
// });

test.describe('Page object test demo', async () => {
    test('Register test_01', async ({ page, baseURL, registerPage }) => {
        await page.goto(`${baseURL}route=account/register`);
        await registerPage.enterFirstName(data.firstName);
        await registerPage.enterLastName(data.lastName);
        await registerPage.enterEmail(data.email);
        await registerPage.enterTelephone(data.phone_number);
        await registerPage.enterPassword(data.password);
        await registerPage.enterConfirmPassword(data.password);  
        expect(await registerPage.isSubscribeChecked()).toBeChecked();
        await registerPage.clikcTermsAndCondition();
        await registerPage.clickContinueToRegistration();
    });
    
    test('Login test_02', async ({ page, baseURL, loginPage }) => {
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.enterEmail(data.email);
        await loginPage.enterLoginPassword(data.password);
        await loginPage.clickLoginBtn();
        expect(await page.title()).toBe('My Account');  
    });

    test('Add to cart test_03', async ({ page, baseURL, loginPage, homePage, specialPage }) => {
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.login(data.email, data.password);
        await homePage.clickOnSpecialHotDeals();
        await specialPage.clickPhonesAndPDAs();
        await specialPage.addFirstProductToCart();
        const isCartVisible =  await specialPage.isToastVisible();
        expect(isCartVisible).toBeVisible();
    });
});



