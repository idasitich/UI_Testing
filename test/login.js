const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const console = require("console");
const { not } = require("ajv/dist/compile/codegen");


let driver;
let options = new chrome.Options();

async function login(driver) {
    await driver.get("https://belajar-bareng.onrender.com/");

    await driver.findElement(
        By.xpath("//input[@data-testid='username-input']")
    ).sendKeys("admin");

    await driver.findElement(
        By.xpath("//input[@data-testid='password-input']")
    ).sendKeys("admin");

    await driver.findElement(
        By.xpath("//button[@data-testid='login-button']")
    ).click();
}

 beforeEach(async function () {
        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

            await login(driver);
    });

describe("", function () {
    it("Login", async function () {

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

        // Assert 2: Nyocokin H2 Title
        // 1. Mencari elemen h2 menggunakan CSS Selector (disarankan menggunakan tag h2 atau gabungan atribut Vue)
        let headerElement = await driver.findElement(
            By.css('h2[data-v-e206bbd6]')
        );

        // Mengambil teks dari elemen tersebut
        let actualText = await headerElement.getText();

        //Melakukan Assertion (Memastikan teks sesuai dengan "List Users")
        assert.strictEqual(
            actualText, 
            'List Users', 
            `Assertion Gagal! Teks yang ditemukan adalah: "${actualText}"`
        );
        // await driver.quit();

    });
    it("Add User", async function (){

        let addButton = await driver.wait(
            until.elementLocated(By.xpath("//*[@data-testid = 'add-button']")),
            1000
        );
        
        await addButton.click();
        await driver.sleep(3000);
        
        let username = await driver.findElement(
        By.xpath("//input[@data-testid='username-input']"))
         
        let age = await driver.findElement(
        By.xpath("//input[@data-testid='age-input']"))

        let buttonSubmit = await driver.findElement(
        By.xpath("//button[@type= 'submit']"))
         
        await username.sendKeys('Andrea');
        await age.sendKeys('60');
        await buttonSubmit.click();

        let nama = await username.getAttribute('value');

        // Memvalidasi dengan notifikasi user added successful
        let toastMessage = await driver.wait(
        until.elementLocated(By.xpath("//div[@data-testid='toast-content']")),
        10000  );

        await driver.wait(until.elementIsVisible(toastMessage), 5000);

        let actualText = await toastMessage.getText();
        console.log(nama)
        console.log(actualText)

        assert.strictEqual(
        actualText,
        `User successfully added, Hi ${nama}!`, // Expected text
        );
    })
});