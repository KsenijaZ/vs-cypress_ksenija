import { loginPage } from "../../pageObjects/loginPage"
import { boards } from "../../pageObjects/boards"

describe('Delete board test scenarios', () => {

	let boardId = null;

	beforeEach(() => {
		cy.visit('/')
		loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"))

		// Intercept the API request for creating a new board
		cy.intercept("POST", `${Cypress.env('apiUrl')}/boards`)
		.as("newBoardData")

		// Create a new board and wait for the API response
		boards.createNewBoard()
		cy.wait('@newBoardData').then(result => {
			expect(result.response.statusCode).to.equal(201)
			boardId = result.response.body.id
			cy.url().should('contain', `/boards/${boardId}`)
		})

	})

	it('Delete board', () => {

		// Intercept the API request for deleting board
		cy.intercept("DELETE", `${Cypress.env('apiUrl')}/boards/${boardId}`)
        .as("newBoardDel")

        // Delete a board and wait for the API response
		cy.visit(`/boards/${boardId}`)
		boards.deleteBoard()

		cy.wait('@newBoardDel').then(result => {
			expect(result.response.statusCode).to.equal(200)
			
            // Verify that the new board doesn't exists in the All Boards section
            boards.myOrgBtn.click()
            boards.allBoardsSection
                .find(`div[id="${boardId}"]`)
                .should('not.exist')
        })
	})

})