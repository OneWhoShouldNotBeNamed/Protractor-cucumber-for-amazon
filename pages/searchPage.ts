import { $, browser, ElementFinder, protractor } from "protractor";
import { element, by } from "protractor";
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
export class SearchPageObject {
    public pincode: ElementFinder;
    public searchPin: ElementFinder;
    public zipapply: ElementFinder;
    public updatedpin: ElementFinder;
    public hellosignin: ElementFinder
    public inputemail: ElementFinder;
    public clickcontinue: ElementFinder;
    public inputpwd: ElementFinder;
    public signinbtn: ElementFinder;
    public searchbox: ElementFinder;
    public submitSearch: ElementFinder;
    public pagecount: ElementFinder;

    public nextbtn: ElementFinder;
    public firstiteminpg: ElementFinder;

    public addtocart: ElementFinder;
    public productTitle: ElementFinder;
    public sidesheetclosebtn: ElementFinder;
    public cartCount: ElementFinder;
    public cartPage: ElementFinder;
    public itemNameincart: ElementFinder;
    public deleteProduct: ElementFinder;
    public activeItem: ElementFinder;
    delbtn: ElementFinder;


    constructor() {
        this.pincode = element(by.id("glow-ingress-line2"));
        this.searchPin = element(by.id("GLUXZipUpdateInput"))
        this.zipapply = element(by.id("GLUXZipUpdate")).element(by.css("input[aria-labelledby='GLUXZipUpdate-announce']"))
        this.updatedpin = element(by.id("glow-ingress-block")).element(by.id("glow-ingress-line2"))
        this.hellosignin = element(by.id("nav-link-accountList"))
        this.inputemail = element(by.id("ap_email"))
        this.clickcontinue = element(by.css("input[id='continue']"))
        this.inputpwd = element(by.id("ap_password"))
        this.signinbtn = element(by.id("signInSubmit"))
        this.searchbox = element(by.id("twotabsearchtextbox"))
        this.submitSearch = element(by.id("nav-search-submit-button"));
        this.pagecount = element(by.css("[class='s-pagination-strip']")).element(by.css("a:nth-child(6)"))
        this.nextbtn = element(by.className("s-pagination-item s-pagination-next s-pagination-button s-pagination-separator"))
        this.firstiteminpg = element(by.css("div[cel_widget_id='MAIN-SEARCH_RESULTS-2']")).element(by.css("a[class='a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal']"))
        this.addtocart = element(by.id("add-to-cart-button"))
        this.productTitle = element(by.id("productTitle"))
        // this.sidesheetclosebtn=element(by.css("div[class='a-section a-spacing-none a-padding-base attach-primary-atc-confirm-box']")).element(by.id("attach-close_sideSheet-link"))
        this.sidesheetclosebtn = element(by.id("attach-close_sideSheet-link"))

        this.cartCount = element(by.id("nav-cart-count-container")).element(by.id("nav-cart-count"))
        this.cartPage = element(by.id("nav-cart"))
        this.itemNameincart = element(by.css("div[data-item-index='1']")).element(by.css("li:nth-child(1)")).element(by.css("span[class='a-truncate a-size-medium']")).element(by.css("span[class='a-truncate-full a-offscreen']"))
        this.activeItem = element(by.css("div[data-name='Active Items']"))
        this.delbtn = element(by.css("input[data-action='delete']"))
    }

    present = async (toCheck: ElementFinder, checkvisiblity: boolean = true): Promise<void> => {
        if (checkvisiblity) {
            var EC = protractor.ExpectedConditions;
            await browser.wait(EC.visibilityOf(toCheck), 10000);
        }
        await toCheck.isPresent();
        const elementDisplyed = await toCheck.isDisplayed();
        console.log("DISPLAYED", await toCheck.isDisplayed());
        expect(elementDisplyed).to.be.true;
    }
    deleteItem = async (): Promise<void> => {
        await this.present(this.cartCount)
        console.log("For delete-item count in container ");
        let itemno = parseInt((await this.cartCount.getText()), 10)
        console.log("Items IN CARt", itemno, typeof itemno);
        await browser.executeScript(`arguments[0].scrollIntoView();`, this.cartPage.getWebElement());
        if (itemno > 0) {
            await this.cartPage.click();
            console.log("checking items in cart");
            for (let i = 0; i < itemno; i++) {
                console.log("INSIDE loop", i + 1);
                await this.present(this.activeItem.element(by.css(`div[data-item-index='${i + 1}']`)).element(by.css("input[data-action='delete']")))
                await browser.sleep(3000)
                await this.activeItem.element(by.css(`div[data-item-index='${i + 1}']`)).element(by.css("input[data-action='delete']")).click()
                console.log("Deleted", i + 1);
                await browser.sleep(3000)

            }
        }
    }
    scroll = async (eleItem: ElementFinder): Promise<void> => {
        await browser.executeScript(`arguments[0].scrollIntoView();`, eleItem.getWebElement());

    }
}
