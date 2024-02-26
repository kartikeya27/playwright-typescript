import { expect, test } from "@playwright/test";


test("Interact with frames", async ({ page }) => {
    await page.goto("https://letcode.in/frame");

    const allFrames = page.frames();
    console.log("No of frames: " + allFrames.length);

    const myFrame = page.frame("firstFr");
    // if(myFrame != null) {
    //   await myFrame.fill('#fname', 'Kartik');
    // }

    await myFrame?.fill('input[name="fname"]', "Kartik");
    await myFrame?.fill('input[name="lname"]', "Bhatt");

    expect(await myFrame?.locator("p.title.has-text-info").textContent()).toContain("You have entered Kartik Bhatt");

    await page.waitForTimeout(3000);
});

test("Interact with frames through different method", async ({ page }) => {
    await page.goto("https://letcode.in/frame");

    const allFrames = page.frames();
    console.log("No of frames: " + allFrames.length);

    const frame = page.frameLocator("#firstFr");
    await frame.locator('input[name="fname"]').fill("Kartik");
    await frame.locator('input[name="lname"]').fill("Bhatt");

    const innerFrame = frame.frameLocator("iframe.has-background-white")
    innerFrame.locator('input[name="email"]').fill("kartik@gmail.com");

    await page.waitForTimeout(3000);
});
