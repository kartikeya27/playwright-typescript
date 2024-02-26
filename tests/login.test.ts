import { chromium, test } from "@playwright/test";


    const capabilities = {
        'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'Windows 10',
            'build': 'Playwright Test Build',
            'name': 'Playwright Test',
            'user': 'kebijebi',
            'accessKey': 'E5qHCHGku1lbPr57J91gVWCxzia0HRvc9TyUSyI5QxZ1tDto7Z',
            'network': true,
            'video': true,
            'console': true
        }
    };
    

    // const context = await browser.newContext();                                             

test("Login test demo", async() => {
    // const browser =  await chromium.launch();
    const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    }); 
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
    // await page.click("text=Login");
    await page.click("'Login'");
    await page.fill("input[name='email']", "kebijebi@gmail.com");
    await page.fill("input[type='password']", "1200@Villa");
    await page.click("input[type='submit']");

    await page.close();
    await context.close();
    await browser.close();

    // await page.waitForTimeout(5000);
    
    // const newContext = await browser.newContext();
    // const newPage = await newContext.newPage();
    // await newPage.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");

    // await newPage.waitForTimeout(5000);

    
}); 