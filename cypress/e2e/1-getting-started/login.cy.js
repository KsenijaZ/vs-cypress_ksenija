import { loginPage } from "../../pageObjects/loginPage"

describe('login test scenarios', () => {

   beforeEach(() => {
     cy.visit('/')
     loginPage.modalTitle.should('have.text', 'Log in with your existing account')
     loginPage.signUpBtn.should('be.visible')
     loginPage.forgotPass.should('be.visible')
     loginPage.submitBtn.should('have.css', 'background-color', 'rgb(78, 174, 147)')
   })

    it('Login with valid credentials', () => {

        // Intercept the API request for creating a new board
        cy.intercept("POST", `${Cypress.env('apiUrl')}/login`)
        .as('loginData')

        // Login and wait for the API response
        loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))

        cy.wait("@loginData").then( result => {
            expect(result.response.statusCode).to.eq(200)
            cy.url().should('contain', '/my-organizations')
        })

   })

})
