const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vij8ht',
  e2e: {
    baseUrl: 'http://frontend-testing:4001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
