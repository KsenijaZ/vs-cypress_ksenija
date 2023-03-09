import { loginPage } from "../pageObjects/loginPage";

describe("Login test scenario", () => {
  beforeEach(() => {
    cy.visit("/");
    loginPage.modalTitle.should(
      "have.text",
      "Log in with your existing account"
    );
    loginPage.signUpBtn.should("be.visible");
    loginPage.forgotPass.should("be.visible");
    loginPage.submitBtn.should(
      "have.css",
      "background-color",
      "rgb(78, 174, 147)"
    );
  });

  it("Login with valid credentials", () => {
    // Intercept the API request for login with valid credentials
    cy.intercept("POST", `${Cypress.env("apiUrl")}/login`).as("loginData");

    // Login and wait for the API response
    loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"));

    cy.wait("@loginData").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.url().should("contain", "/my-organizations");
    });
  });
});
