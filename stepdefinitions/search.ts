// import { assert } from "console";
import { browser, element, by, protractor, ElementFinder } from "protractor";
import { SearchPageObject } from "../pages/searchPage";
const { When, Then } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
var assert = require('assert')
// const asserts = chai.asserts;
var should = require('chai').should() 
const search: SearchPageObject = new SearchPageObject();
let pdtitle:string;

When("I click on pincode",{timeout: 2 * 5000}, async () => {
    await search.pincode.click();
       await browser.sleep(2000)
       
});
async function present(toCheck:ElementFinder,checkvisiblity:boolean=true){
    if(checkvisiblity){
        var EC = protractor.ExpectedConditions;
        await browser.wait( EC.visibilityOf(toCheck),10000);
    }
    await toCheck.isPresent();
    const elementDisplyed =  await toCheck.isDisplayed();
      console.log("DISPLAYED", await toCheck.isDisplayed());
      expect(elementDisplyed).to.be.true;
   }
//  async function waitVisibility(checkvisible:any) {
        
//  }  
Then(/^I entered pin "(.*?)"$/,{timeout: 2 * 5000}, async(pin:string) => {
   
    await present(search.searchPin)
    await search.searchPin.sendKeys(pin);
   await browser.sleep(2000);

    // search.zipapply.getLocation().then(function (location) {
    //   return browser.executeScript(
    //     "window.scrollTo(" + location.x + ", " + location.y + ");"
    //   );
    // });
    await browser.sleep(3000);

    await search.zipapply.click();
    await present(search.updatedpin)
      await browser.sleep(2000);
    //   let code =  (await search.updatedpin.getText()).split(" ")[1].trim();
    let code =  (await search.updatedpin.getText()).trim()
      console.log(await search.updatedpin.getText());
      
       await browser.sleep(3000);
        // await waitVisibility(search.updatedpin)
        await present(search.updatedpin)
       await browser.sleep(3000);

      console.log("CODE", code, pin);
      expect(code.trim()).to.have.string(pin.trim());

});
When('I click on signIn to enter email {string} and password {string}',{timeout: 2 * 5000}, async (email:string,pwd:string) => {
    // When(/^I click on signIn to enter email "(.*?)" and password "(.*?)"$/, async (email:string,pwd:string) => {
        // search.hellosignin.getLocation().then(function (location) {
        //   return browser.executeScript(
        //     "window.scrollTo(" + location.x + ", " + location.y + ");"
        //   );
        // });
    
    await search.hellosignin.click();
    // await waitVisibility(search.inputemail)
    await present(search.inputemail)
    await search.inputemail.sendKeys(email);
    // //   browser.sleep(3000)
    // search.clickcontinue.getLocation().then(function (location) {
    //     return browser.executeScript(
    //       "window.scrollTo(" + location.x + ", " + location.y + ");"
    //     );
    //   });
    await search.clickcontinue.click();
    await present(search.inputpwd)
    await search.inputpwd.sendKeys(pwd);
});

Then(/^I log into my account$/,{timeout: 2 * 5000}, async () => {
    await search.signinbtn.click();
    await browser.sleep(2000);
});
When(/^I enter "(.*?)" in searchbar$/,{timeout: 2 * 5000}, async (item:string) => {
        await present(search.searchbox)
        await search.searchbox.sendKeys(item);
        // search.submitSearch.getLocation().then(function (location) {
        //     return browser.executeScript(
        //       "window.scrollTo(" + location.x + ", " + location.y + ");"
        //     );
        //   });
         await search.submitSearch.click();
        await browser.sleep(3000);
})

When(/^Go to fourth page$/, {timeout: 2 * 5000},async () => {
    let count = await search.pagecount.getText();
  console.log("COUNT", count[0]);
  let counter: number = +count;
  console.log("TotalCOUNTER", counter, typeof counter);
  let totalPageCount = counter;
  let pageToGo = 3;
  let j = totalPageCount > pageToGo ? pageToGo : totalPageCount;

  for (let i = 0; i < j; i++) {
    console.log("inside loop");
    await present(search.nextbtn)
    await search.nextbtn.click();
  }
});
Then(/^Click first item in cart$/,{timeout: 2 * 5000}, async () => {

    await present(search.firstiteminpg)
    // search.firstiteminpg.getLocation().then(function (location) {
    //     return browser.executeScript(
    //       "window.scrollTo(" + location.x + ", " + location.y + ");"
    //     );
    //   });
      await search.firstiteminpg.click();
  
      var winHandles = browser.getAllWindowHandles();
      winHandles.then(function (handles) {
        var parentWindow = handles[0];
        var popUpWindow = handles[1];
        browser.switchTo().window(popUpWindow);
        // //  browser.switchTo().window(parentWindow);
      });
    await present(search.addtocart)
       let pdtitle = await element(by.id("productTitle")).getText();
      console.log("PRDT title", pdtitle);
  
     await browser.sleep(3000)
})
Then(/^Add to cart and check$/,{timeout: 2 * 5000}, async () => {

    await present(search.addtocart)
        // search.addtocart.getLocation().then(function (location) {
        //   return browser.executeScript(
        //     "window.scrollTo(" + location.x + ", " + location.y + ");"
        //   );
        // });
    
        await search.addtocart.click();
    
        await browser.driver.switchTo().activeElement();
        console.log("going to close btn");
  await browser.sleep(2000);
  await present(search.sidesheetclosebtn)
    
    try{
        await search.sidesheetclosebtn.getLocation().then(function (location) {
            return browser.executeScript(
              "window.scrollTo(" + location.x + ", " + location.y + ");"
            );
          });
        await search.sidesheetclosebtn.click();
        await browser.sleep(3000);
        console.log("X clicked");

        }catch(err){ console.log("X not clicked");}
    // console.log("X clicked");
    
        // await browser.wait(EC.visibilityOf(element(by.id("nav-cart-count-container")).element(by.id("nav-cart-count"))),10000);
        await present(search.cartCount)
         console.log("item count in container ");
    
        let itemno = await search.cartCount.getText();
     console.log("Items IN CARt", typeof parseInt(itemno,10),parseInt(itemno,10));
        // expect(itemno).to.be.greaterThan(0);
        await search.cartPage.getLocation().then(function (location) {
            return browser.executeScript(
              "window.scrollTo(" + location.x + ", " + location.y + ");"
            );
          });
       await search.cartPage.click();
        console.log("checking items in cart");
    
       await browser.sleep(3000);
       
          let itemname=await search.itemNamecart.getAttribute('textContent')
        console.log("PRdct text", itemname);
        console.log("PRDT title",  pdtitle);
        expect(pdtitle).to.have.string(itemname)
       await  browser.sleep(2000);


})