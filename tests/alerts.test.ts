import test, { expect } from "@playwright/test";

test("Handling alert1", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    page.on("dialog", async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();
    });
    await page.locator("button:has-text('Click Me')").nth(0).click();
});

test("Handling alert2", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    page.on("dialog", async (dialog) => {
        console.log(dialog.message());
        await dialog.dismiss();
    });
    await page.locator("button:has-text('Click Me')").nth(1).click();
    expect(page.locator("p#confirm-demo")).toContainText("Cancel!");
});

test("Handling alerts3", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    page.on("dialog", async (dialog) => {
        console.log(dialog.defaultValue());
        await dialog.accept("Kartik");
    });
    await page.locator("button:has-text('Click Me')").nth(2).click();
    expect(page.locator("p#prompt-demo")).toContainText("'Kartik'");
});

test("Modal alerts", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo");
    await page.click("button[data-target='#myModal']");
    await page.click("(//button[text()='Save Changes'])[1]");
});

