Feature: To search cucumber in google

@CucumberScenario
Scenario: Cucumber Amazon page
        Given I am on "amazon" search page
        When I click on pincode
        Then I entered pin "695004" 
        # When I click on signIn to enter email "8848582203" and password "qwerty"
        # Then I log into my account
        # When I enter "apple ipad" in searchbar 
        # When Go to fourth page 
        # Then Click first item in cart
        # Then Add to cart and check
        