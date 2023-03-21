const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vij8ht',
  e2e: {
    baseUrl: 'http://104.225.142.153:81',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
