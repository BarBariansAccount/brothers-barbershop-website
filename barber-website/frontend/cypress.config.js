const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vij8ht',
  e2e: {
    baseUrl: 'http://localhost:8081',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
