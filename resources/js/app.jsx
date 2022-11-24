import { router, createInertiaApp } from '@inertiajs/react'
import { hydrateRoot } from 'react-dom/client'
import '../css/app.css'

/*
|--------------------------------------------------------------------------
| Setup Google Analytics
|--------------------------------------------------------------------------
*/

router.on('navigate', () => {
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

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
