const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Open Sauce Demo", function () {
    it("Login", async function () {

        let options = new chrome.Options();
        let driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        await driver.get("https://belajar-bareng.onrender.com/");

        let usernameInput = await driver.findElement(
            By.xpath("//input[@data-testid = 'username-input']")
        );
         let passwordInput  = await driver.findElement(
            By.xpath("//input[@data-testid = 'password-input']")
        );
          let loginButton  = await driver.findElement(
            By.xpath("//button[@data-testid = 'login-button']")
        );

        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("admin");
        await loginButton.click();

        await driver.sleep(3000);

        // Assert 1: CheckOut Button
        let checkout_button = await driver.wait(
            until.elementLocated(
                By.xpath("//*[@data-testid='checkout-button']")
            ),
            10000
        )

        assert.strictEqual(
            await checkout_button.isDisplayed(),
            true
        );

        // Assert 2: Nyocokin Tittle
        let title = await driver.getTitle();
        assert.strictEqual(title, "List Users");

        await driver.quit();

    });
});