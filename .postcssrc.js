module.exports = {
  plugins: {
    'postcss-partial-import': {},
    'postcss-custom-properties': {
      preserve: false
    },
    'postcss-nested': {},
    autoprefixer: ['last 2 versions', '> 5%']
  }
}
