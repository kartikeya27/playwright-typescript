import { Page } from '@playwright/test';

export default class HomePage {
    constructor(public page: Page) {
    }

    async clickOnSpecialHotDeals() {
        await Promise.all([
            this.page.waitForNavigation({waitUntil: 'networkidle'}),
            this.page.click(".horizontal .nav-item:nth-of-type(2) .title")
        ]);
    }
}