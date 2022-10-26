const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  // plugins: [
  //   { src: '~/plugins/vuex-persist', ssr: false }
  // ]
})
