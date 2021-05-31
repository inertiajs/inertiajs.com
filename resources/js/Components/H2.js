import React from 'react'

function kebabCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('-')
    .toLowerCase()
}

export default function H2(props) {
  return (
    <h2
      {...props}
      id={props.id || kebabCase(props.children)}
      className="mt-16 mb-4 text-2xl font-bold text-gray-700 leading-none"
    />
  )
}
