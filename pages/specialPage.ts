import { Page } from "@playwright/test";

export default class SpecialPage {

    constructor(public page: Page) {
    }

    async clickPhonesAndPDAs() {
        await this.page.click(".custom-pills-left.flex-column.nav.nav-pills > a:nth-of-type(5)");
        // await this.page.waitForTimeout(10000);
    }

    async addFirstProductToCart() {
        await this.page.hover("//div[@class='carousel-item active']", {
            strict: false
        })
        await this.page.locator("//button[@title='Add to Cart']")
            .nth(0).click();
    } 
    
    async isToastVisible() {
        const toast = this.page.locator("//a[.='View Cart ']");
        await toast.waitFor({ state: "visible" });
        return toast;// Add your code here
    }
}
