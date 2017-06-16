module.exports = {
  plugins: {
    'postcss-use': {
      modules: [
        'postcss-partial-import',
        'postcss-custom-properties',
        'postcss-nested',
        'postcss-custom-media',
        'postcss-calc',
        'postcss-property-lookup'
      ]
    },
    'postcss-partial-import': {},
    'postcss-custom-properties': {},
    'postcss-nested': {},
    'postcss-custom-media': {},
    autoprefixer: ['last 2 versions', '> 5%']
  }
}
