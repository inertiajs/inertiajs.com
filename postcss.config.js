const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./pages/**/*.mdx', './pages/**/*.js', './components/**/*.mdx', './components/**/*.js'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && purgecss,
  ],
}
