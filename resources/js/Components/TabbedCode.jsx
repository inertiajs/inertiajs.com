import CodeBlock from '@/Components/CodeBlock'
import { useContext, useState } from 'react'

import { CodeTabContext } from './Layout'

const guessTabType = tabNames => {
  if (tabNames.includes('Laravel')) {
    return 'backend'
  }

  if (tabNames.includes('Vue')) {
    return 'frontend'
  }
}

const TabbedCode = ({ className, examples, height }) => {
  const [codeTabs, setCodeTabs] = useContext(CodeTabContext) || useState({ unknown: 0 })
  const tabType = guessTabType(examples.map(example => example.name))
  const exampleIndex = examples.findIndex(example => {
    if (codeTabs[tabType] === example.name) {
      return true
    }

    if (
      (codeTabs[tabType]?.startsWith('Svelte') && example.name === 'Svelte') ||
      (codeTabs[tabType] === 'Svelte' && example.name.startsWith('Svelte'))
    ) {
      // Svelte example are named either 'Svelte', 'Svelte 4', or 'Svelte 5'
      return true
    }
  })
  const activeTab = exampleIndex < 0 ? 0 : exampleIndex

  return (
    <div className={className || 'my-8 overflow-hidden rounded'}>
      {examples.length > 1 && (
        <div className="flex px-4 pt-3" style={{ background: '#303f6d' }}>
          {examples.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCodeTabs({ ...codeTabs, [tabType]: example.name })}
              className="focus:outline-none mr-1 rounded-t px-3 pt-3 pb-2 text-sm font-medium text-gray-500 hover:text-gray-200 sm:px-6"
              style={index === activeTab ? { color: 'white', background: '#202e59' } : {}}
            >
              {example.name}
            </button>
          ))}
        </div>
      )}
      <CodeBlock
        height={height}
        className="p-6 leading-normal"
        language={examples[activeTab].language}
        children={examples[activeTab].code}
      />
      {examples[activeTab].description && (
        <div className="flex items-baseline p-4 text-sm font-medium text-white" style={{ background: '#303f6d' }}>
          <div className="mr-2 h-4 w-4 flex-shrink-0 fill-current">
            <svg className="mt-1 h-full w-full" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z" />
            </svg>
          </div>
          <div className="leading-snug">{examples[activeTab].description}</div>
        </div>
      )}
    </div>
  )
}

export default TabbedCode
