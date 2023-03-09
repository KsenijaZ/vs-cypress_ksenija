const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://cypress.vivifyscrum-stage.com/",
    env: {
      validEmail: "my02@scrum.com",
      validPassword: "myPass123",
      apiUrl: "https://cypress-api.vivifyscrum-stage.com/api/v2",
    },
  },
});
