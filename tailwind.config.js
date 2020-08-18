module.exports = {
  purge: ['./pages/**/*.mdx', './pages/**/*.js', './components/**/*.mdx', './components/**/*.js'],
  theme: {
    fontFamily: {
      sans: ['Gilroy', 'sans-serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    extend: {
      width: {
        44: '11rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
