import test from '@playwright/test';


test('Handling dropdown', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page.selectOption('select#select-demo', {
        // label: 'Monday'
        // value: 'Monday'
        index: 3
    });
    await page.waitForTimeout(3000);
}); 

test('Handling  multi option dropdown', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page.selectOption('#multi-select', [{
        label: 'California',
    }, {
        index: 4
    }, {
        value: 'Washington'
    }]);
    await page.waitForTimeout(3000);
});

test('Jquery Select Dropdown', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
    await selectCountry('India'); 
    await selectCountry('Australia');
    await selectCountry('South Africa');
    async function selectCountry(countryName) {
        await page.click('#country+span');
        await page.locator('ul#select2-country-results')
            .locator('li', {
                hasText: countryName
            }).click();
    }
});


