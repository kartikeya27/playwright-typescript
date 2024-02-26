import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/registerPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import SpecialPage from '../pages/specialPage';

const email = 'kartikeya03@mailinator.com';
const password = 'Kartikeya@123';
const minPrice = '1950';
const maxPrice = '2000';

test.describe('Page object test demo', async () => {
    // test.use({ 
    //     baseURL: 'http://opencart.abstracta.us/' 
    // });
    test('Register test_01', async ({ page, baseURL }, testInfo) => {
        console.log('TITLE: ' + testInfo.title);
        const register = new RegisterPage(page);
        await page.goto(`${baseURL}route=account/register`);
        await register.enterFirstName('Kartikeya');
        await register.enterLastName('Bhatt');
        await register.enterEmail(email);
        await register.enterTelephone('1234567890');
        await register.enterPassword(password);
        await register.enterConfirmPassword(password);  
        expect(await register.isSubscribeChecked()).toBeChecked();
        await register.clikcTermsAndCondition();
        await register.clickContinueToRegistration();
        console.log('STATUS: ' + testInfo.status);
    });
    
    test('Login test_02', async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        await page.goto(`${baseURL}route=account/login`);
        await login.enterEmail(email);
        await login.enterLoginPassword(password);
        await login.clickLoginBtn();
        expect(await page.title()).toBe('My Account');  
    });
    
    test('Add to cart test_03', async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        const home = new HomePage(page);
        const special = new SpecialPage(page);
        await page.goto(`${baseURL}route=account/login`);
        await login.login(email, password);
        await home.clickOnSpecialHotDeals();
        await special.clickPhonesAndPDAs();
        await special.addFirstProductToCart();
        const isCartVisible =  await special.isToastVisible();
        expect(isCartVisible).toBeVisible();
    });
});



