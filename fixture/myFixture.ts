import { test as myTest } from '@playwright/test';

type kartik = {
    age: number;
    email: string;
}

const myFixtureTest = myTest.extend<kartik>({
    age: 20,
    email: "kartik121@gmail.com",
})

export const test = myFixtureTest;