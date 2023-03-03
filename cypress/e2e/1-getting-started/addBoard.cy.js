import { loginPage } from "../../pageObjects/loginPage"
import { boards } from "../../pageObjects/boards"

describe('Create board test scenarios', () => {

   let boardId = null;
   let boardName = null;

   beforeEach(() => {
     cy.visit('/')
     loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))
   })

   it('Create new board', () => {

        // Intercept the API request for creating a new board
        cy.intercept("POST", `${Cypress.env('apiUrl')}/boards`)
        .as("newBoardData")

        // Create a new board and wait for the API response
        boards.createNewBoard()
        cy.wait('@newBoardData').then( result => {
            expect(result.response.statusCode).to.equal(201)
            boardId = result.response.body.id
            boardName = result.response.body.name
            cy.url().should('contain', `/boards/${boardId}`)
       
            // Verify that the new board exists in the All Boards section
            boards.myOrgBtn.click()
            boards.allBoardsSection
            .find('.vs-c-organization-boards__item .vs-c-boards-item__title')
            .contains(`${boardName}`)
            .should('exist')
        })
    })

    afterEach(() => {
      cy.visit(`boards/${boardId}/settings`)
      boards.deleteBoard()
    })
    
})
