import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'

export default function A({ color, ...props }) {
  const classes = color === 'orange' ? 'text-orange-600 hover:text-orange-800' : 'text-blue-700 hover:text-orange-700'
  return props.href.startsWith('http') || props.href.startsWith('#') ? (
    <a {...props} className={`${classes} font-medium underline`} />
  ) : (
    <InertiaLink {...props} className={`${classes} font-medium underline`} />
  )
}
