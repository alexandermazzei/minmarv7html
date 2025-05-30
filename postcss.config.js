module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {
      overrideBrowserslist: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 11'
      ],
      grid: 'autoplace'
    },
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'custom-selectors': true
      }
    }
  }
};
