module.exports = {
  purge: [
    './resources/js/pages/**/*.js',
    './resources/js/components/**/*.js',
  ],
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
