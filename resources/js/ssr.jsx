import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'

createServer(page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: name => import.meta.globEager('./Pages/**/*.jsx')[`./Pages/${name}.jsx`],
    setup({ App, props }) {
      return <App {...props} />
    },
  })
)
