import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { Inertia } from '@inertiajs/inertia'
import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/inertia-react'

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

createInertiaApp({
  resolve: name => import.meta.globEager('./Pages/**/*.jsx')[`./Pages/${name}.jsx`],
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
