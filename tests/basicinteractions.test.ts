import { test, expect } from '@playwright/test';


test('Interaction with inputs', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    const messageInput =  page.locator('input#user-message');
    await messageInput.scrollIntoViewIfNeeded();
    console.log(await messageInput.getAttribute('placeholder'));
    expect(messageInput).toHaveAttribute('placeholder', 'Please enter your Message');
    console.log('Before entering data: ' + await messageInput.inputValue());
    await messageInput.type('Hello Kartik');
    console.log('After entering data: ' + await messageInput.inputValue());
});

test('Verify sum ', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    const firstInput =  page.locator('input#sum1');
    const secondInput =  page.locator('input#sum2');
    const total =  page.locator('form#gettotal>button');
    let firstNumber = 10;
    let secondNumber = 20;
    await firstInput.type(" " + firstNumber);
    await secondInput.type(" " + secondNumber);
    await total.click();
    await total.scrollIntoViewIfNeeded();
    const result = page.locator('#addmessage');
    console.log(await result.textContent());
    let expectResult  = firstNumber + secondNumber;
    expect(result).toHaveText(" " + expectResult);
});

test('Verify checkbox', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');
    const checkbox =  page.locator('input#isAgeSelected');
    await checkbox.click();
    expect(checkbox).toBeChecked();
    await checkbox.click();
    expect(checkbox).not.toBeChecked();
});
