const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vij8ht',
  e2e: {
    baseUrl: 'http://frontend:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  defaultCommandTimeout: 10000
});
