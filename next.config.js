const withMDX = require('@next/mdx')()

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  async redirects() {
    return [
      {
        source: '/requests',
        destination: '/manual-visits',
        permanent: true,
      },
    ]
  },
})
