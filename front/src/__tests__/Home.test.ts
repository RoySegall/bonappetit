const puppeteer = require('puppeteer');

let browser, page;

describe('Home', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:8080');
    });

    it('should be titled "Hello react"', async () => {
        await expect(page.title()).resolves.toMatch('Hello React!');
    });

    // it('Should see the products', async() => {
    // });

    afterAll(async() => {
        await browser.close();
    });
});
