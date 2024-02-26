import { Page } from '@playwright/test';

export default class LoginPage {

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterLoginPassword(password);
        await this.clickLoginBtn();
    }

    constructor(public page: Page) {
    }   

    async enterEmail(emailaddress: string) {
        await this.page.locator('input[name="email"]')
            .type(emailaddress);
    }

    async enterLoginPassword(password: string) {
        await this.page.locator('input[name="password"]')
            .type(password);
    }

    async clickLoginBtn() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click("input[type='submit']")
        ]);
    }
}   