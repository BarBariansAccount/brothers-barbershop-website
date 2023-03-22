module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? ''
  : '/',

  devServer: {
    allowedHosts: "all"
  },

  "transpileDependencies": [
    "vuetify"
  ]
}
