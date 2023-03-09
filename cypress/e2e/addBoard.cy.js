import { loginPage } from "../pageObjects/loginPage";
import { boards } from "../pageObjects/boards";

describe("Create board test scenario", () => {
  let boardId;

  beforeEach(() => {
    cy.visit("/");
    loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
  });

  it("Create new board", () => {
    // Intercept the API request for creating a new board
    cy.intercept("POST", `${Cypress.env("apiUrl")}/boards`).as("newBoardData");

    // Create a new board and wait for the API response
    boards.createNewBoard();
    cy.wait("@newBoardData").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      boardId = interception.response.body.id;
      cy.url().should("contain", `/boards/${boardId}`);
    });
  });

  afterEach(() => {
    cy.request({
      url: `${Cypress.env("apiUrl")}/boards/${boardId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
  });
});
