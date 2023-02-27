import { loginPage } from "../../pageObjects/loginPage"
import { boards } from "../../pageObjects/boards"
import { constants } from "../../fixtures/constants"

describe('Create board test scenarios', () => {
   beforeEach(() => {
     cy.visit('/')
     loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))
   })

   let boardId = 0;
   let boardName = undefined;

    it('Add a board', () => {

        cy.intercept("POST", Cypress.env('apiUrl')+'/boards').as("newBoardData")

           //step 01
           boards.addBoardTitle(constants.randomTitle)
           boards.pageOneDot.should("have.class", "active")
           boards.nextBtn.click()

           //step 02
           boards.addBoardType()
           boards.pageTwoDot.should("have.class", "active")
           boards.nextBtn.click()

           //step 03
           boards.addBoardConfig()
           boards.pageThrDot.should("have.class", "active")
           boards.nextBtn.click()

           //step 04
           boards.addBoardLogo(constants.imgUrl)
           boards.pageFourDot.should("have.class", "active")
           boards.nextBtn.click()


           //step 04
           boards.pageFiveDot.should("have.class", "active")
           boards.nextBtn.click()
      
       cy.wait('@newBoardData').then( result => {
           expect(result.response.statusCode).to.equal(201)
           boardId = result.response.body.id
           boardName = result.response.body.name
           cy.url().should('contain', '/boards'+`/${boardId}`)
       })

       
    })

    it('Confirm that board is created', () => {

        boards.myOrgBtn.click()
        boards.boardsModal.click()
        boards.allBoardsSection.find('.vs-c-organization-boards__item').contains(`${boardName}`)
        .should('exist')
    })

})