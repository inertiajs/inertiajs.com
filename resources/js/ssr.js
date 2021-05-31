import React from 'react'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/inertia-react'

const server = express()
server.use(express.json())
server.post('/render', async (request, response, next) => {
  try {
    response.json(
      await createInertiaApp({
        page: request.body,
        render: ReactDOMServer.renderToString,
        resolve: name => require(`./Pages/${name}`),
        setup: ({ App, props }) => <App {...props} />,
      })
    )
  } catch (error) {
    next(error)
  }
})
server.listen(8080, () => console.log('Server started.'))

console.log('Starting SSR server...')
