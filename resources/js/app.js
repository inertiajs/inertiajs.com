import React from 'react'
import { render } from 'react-dom'
import { App } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'

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
