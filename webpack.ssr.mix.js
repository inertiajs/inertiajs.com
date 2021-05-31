const path = require('path')
const mix = require('laravel-mix')
const nodeExternals = require('webpack-node-externals')

require('laravel-mix-merge-manifest')

mix
  .js('resources/js/ssr.js', 'public/js')
  .react()
  .alias({
    '@': path.resolve('resources/js'),
  })
  .webpackConfig({
    target: 'node',
    externals: [nodeExternals()],
  })
  .mergeManifest()
