import { Layout } from '@/Components'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'

createServer(page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: name => {
      const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
      const page = pages[`./Pages/${name}.jsx`]
      const meta = page.meta
      page.default.layout = page => <Layout children={page} meta={meta} />
      return page
    },
    setup({ App, props }) {
      return <App {...props} />
    },
  }),
)
