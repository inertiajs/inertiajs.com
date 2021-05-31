import React from 'react'
import { render } from 'react-dom'
import { Inertia } from '@inertiajs/inertia'
import { App } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'

/*
|--------------------------------------------------------------------------
| Setup Google Analytics
|--------------------------------------------------------------------------
*/

Inertia.on('navigate', () => {
  setTimeout(() => {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'UA-140425344-1', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: window.document.title,
    })
  })
})

/*
|--------------------------------------------------------------------------
| Setup Inertia app
|--------------------------------------------------------------------------
*/

InertiaProgress.init()

const el = document.getElementById('app')

render(
  <App
    initialPage={JSON.parse(el.dataset.page)}
    resolveComponent={name => {
      return require(`./Pages/${name}`).default
    }}
  />,
  el
)
