import { expect, test, Page } from "@playwright/test";
let facebookPage: Page;

test("Interact with single tabs", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
    
    const [newWindow] = await Promise.all([

        page.waitForEvent('popup'),
        page.click("a[title='Follow @Lambdatesting on Twitter']")
    ]);

    console.log(newWindow.url());
    // newWindow.fill('input[name="session[username_or_email]"]', 'Kartik');
});

test("Interact with multiple tabs", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
    
    const [multiPage] = await Promise.all([

        page.waitForEvent('popup'),
        page.click("#followboth")
    ]);
    await multiPage.waitForLoadState();
    const pages = multiPage.context().pages();
    console.log("number of tabs: " + pages.length);

    pages.forEach(tab => {
        console.log(tab.url()); 
    });

    for (let index = 0; index < pages.length; index++) {
        const url = pages[index].url();
        if (url == "https://www.facebook.com/LambdaTest/") {
            facebookPage = pages[index];
        }
    }
    const text = await facebookPage.textContent("(//h1");
    console.log(text);
});
