import { test } from "./myFixture"

test("Fixture demo", async ({ age, email }) => {
    console.log(age+15);
    console.log(email.toUpperCase());
})