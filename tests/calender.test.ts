import { expect, test, Page } from "@playwright/test";
import moment from "moment";

test("Calender using fill function", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
    let date = "1994-12-04";

    await page.fill("#birthday", date);
    await page.waitForTimeout(3000);
});

test("Calender using moment", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
    let date = "";

    await selectDate(12, "May 2021");

    await page.reload();

    await selectDate(25, "May 2024");

    await page.reload();

    await selectDate(6, "February 2024");

    await page.waitForTimeout(3000);


    async function selectDate(date: number, dateToSelect: string) {  
        await page.click("input[placeholder='Start date']");
        const mmYY = page.locator(".datepicker-days .datepicker-switch");
        const prev = page.locator(".datepicker-days > .table-condensed .prev");
        const next = page.locator(".datepicker-days > .table-condensed .next");
        // let dateToSelect: string = "May 2021";
        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
        console.log("this months? " + thisMonth);

        while (await mmYY.  textContent() != dateToSelect) {
            if (thisMonth) {
                await prev.click();
            } else {
                await next.click();
            }
        }
        await page.click(`//td[@class='day' and text()='${date}']`);
    }
});