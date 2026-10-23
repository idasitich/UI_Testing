const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const console = require("console");
const { not } = require("ajv/dist/compile/codegen");




describe("Regression Testing", function () {
    let driver;
    before(async function(){
        let options = new chrome.Options();
        options.addArguments("--headless");
         driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

            console.log("open browser")
    });

    beforeEach(async function () {

    await driver.get("https://belajar-bareng.onrender.com/");

    async function login(){
        await driver.findElement(
            By.xpath("//input[@data-testid='username-input']")
        ).sendKeys("admin");

        await driver.findElement(
            By.xpath("//input[@data-testid='password-input']")
        ).sendKeys("admin");

        await driver.findElement(
            By.xpath("//button[@data-testid='login-button']")
        ).click();
        };
    await login()
    });

    afterEach (async function(){
        await driver.manage().deleteAllCookies();

        console.log("test complete")
    });

    after(async function(){
        if(driver){
            await driver.quit()
            console.log("Finish")
        }
    });


    it("Login for standard user", async function () {

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
    });

       it("Login for locked user", async function () {

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
         
        await username.sendKeys('Maria');
        await age.sendKeys('60');
        await buttonSubmit.click();

        let nama = await username.getAttribute('value');

        // Memvalidasi dengan notifikasi user added successful
        let toastMessage = await driver.wait(
        until.elementLocated(By.xpath("//div[@data-testid='toast-content']")),
        10000  );

        await driver.wait(until.elementIsVisible(toastMessage), 5000);

        let actualText = await toastMessage.getText();
        // console.log(nama)
        // console.log(actualText)
        assert.strictEqual(
        actualText,
        `User successfully added, Hi ${nama}!`, // Expected text
        );
    })
});