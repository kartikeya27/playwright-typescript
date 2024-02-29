import { test as baseTest, chromium } from "@playwright/test"
import RegisterPage from '../pages/registerPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import SpecialPage from '../pages/specialPage';
import path from 'path';

type pages = {
    registerPage: RegisterPage,
    loginPage: LoginPage,
    homePage: HomePage,
    specialPage: SpecialPage
}
//Lamdatest capabilities
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
        'console': true,
        'tunnel': false, //Add tunel configuration if testing locally hosted webpage
        'tunnelName': '', //optional
        'geoLocation': '', //country code can be fetched from lambdatest website
    }
};

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName, testName) => {
    let config = configName.split("@lambdatest")[0];
    let [browserName, browserVersion, platform] = config.split(":");
    capabilities.browserName = browserName
        ? browserName
        : capabilities.browserName;
    capabilities.browserVersion = browserVersion
        ? browserVersion
        : capabilities.browserVersion;
    capabilities["LT:Options"]["platform"] = platform
        ? platform
        : capabilities["LT:Options"]["platform"];
    capabilities["LT:Options"]["name"] = testName;
};

const getErrorMessage = (obj, keys) =>
    keys.reduce(
        (obj, key) => (typeof obj == "object" ? obj[key] : undefined),
        obj
    );

const testPages = baseTest.extend<pages>({
    page: async ({ }, use, testInfo) => {
        let fileName = testInfo.file.split(path.sep).pop();
        if (testInfo.project.name.match(/lambdatest/)) {
            modifyCapabilities(
                testInfo.project.name,
                `${testInfo.title} - ${fileName}`
            );
        const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        ${encodeURIComponent(JSON.stringify(capabilities))}`);
        const context = await browser.newContext(testInfo.project.use);
        const ltPage = await context.newPage();
        await use(ltPage);
        const testStatus = {
            action: "setTestStatus",
            arguments: {
                status: testInfo.status,
                remark: getErrorMessage(testInfo, ["error", "message"]),
            },
        };
        await ltPage.evaluate(() => { },
            `lambdatest_action: ${JSON.stringify(testStatus)}`);
        await ltPage.close();
        await context.close();
        await browser.close();
    } else {
            const browser = await chromium.launch();    
            const context = await browser.newContext();
            const page = await context.newPage(); 
        await use(page);
    }
},     

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    specialPage: async ({ page }, use) => {
        await use(new SpecialPage(page));
    }   
});

export const test = testPages;
export const expect = baseTest.expect;