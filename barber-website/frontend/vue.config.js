const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    allowedHosts: "all"
  }
  // plugins: [
  //   { src: '~/plugins/vuex-persist', ssr: false }
  // ]
})
