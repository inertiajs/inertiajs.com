import React from 'react'

export default function Code({ color, ...props }) {
  const bgClass = color === 'orange' ? 'bg-orange-300' : 'bg-gray-200'
  return <code {...props} className={`font-mono text-sm rounded p-1 whitespace-nowrap ${bgClass}`} />
}
