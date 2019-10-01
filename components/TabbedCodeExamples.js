import Code from './Code'
import React, { useState } from 'react'

export default ({ className, examples, height }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className={className}>
      <div className="px-4 pt-3 flex" css={{ background: '#303f6d' }}>
        {examples.map((example, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveTab(index)}
            className="focus:outline-none text-sm text-gray-500 hover:text-gray-200 font-medium px-3 sm:px-6 pt-3 pb-2 rounded-t mr-1"
            css={index === activeTab ? { color: 'white', background: '#202e59' } : {}}
          >
            {example.name}
          </button>
        ))}
      </div>
      <Code className="p-6 leading-normal" language={examples[activeTab].language} height={height}>
        {examples[activeTab].code}
      </Code>
      {examples[activeTab].description && (
        <div className="p-4 text-sm font-medium text-white flex items-baseline" css={{ background: '#303f6d' }}>
          <div className="flex-shrink-0 w-4 h-4 fill-current mr-2">
            <svg className="mt-1 w-full h-full" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z" />
            </svg>
          </div>
          <div className="leading-snug">{examples[activeTab].description}</div>
        </div>
      )}
    </div>
  )
}
