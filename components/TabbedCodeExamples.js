import Code from './Code'
import React, { useState, useContext, useEffect } from 'react'
import { FrontendFrameworkContext } from '../context/FrontendFrameworkProvider'
import { BackendFrameworkContext } from '../context/BackendFrameworkProvider'

export default ({ className, snippets, height, type }) => {

  const { frontendFramework, setFrontendFramework } = useContext(FrontendFrameworkContext)
  const { backendFramework, setBackendFramework } = useContext(BackendFrameworkContext)

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const frameworkIndex = type === 'frontend' ? frontndFrameworkIndex() : backendFrameworkIndex()
    setActiveTab(frameworkIndex)
  }, [frontendFramework, backendFramework])

  const handleTabClick = (snippet) => {
    type === 'frontend' ? setFrontendFramework(snippet.framework) : setBackendFramework(snippet.framework)
  }

  const frontndFrameworkIndex = () => {
    return snippets.findIndex((e) => e.framework === frontendFramework)
  }

  const backendFrameworkIndex = () => {
    return snippets.findIndex((e) => e.framework === backendFramework)
  }

  return (
    <div className={className}>
      <div className="px-4 pt-3 flex" css={{ background: '#303f6d' }}>
        {snippets.map((snippet, index) => (
          <a
            key={index}
            type="button"
            onClick={() => handleTabClick(snippet)}
            className="cursor-pointer focus:outline-none text-sm text-gray-500 hover:text-gray-200 font-medium px-3 sm:px-6 pt-3 pb-2 rounded-t mr-1"
            css={index === activeTab ? { color: 'white', background: '#202e59' } : {}}
          >
            {snippet.name}
          </a>
        ))}
      </div>
      <Code className="p-6 leading-normal" language={snippets[activeTab].language} height={height}>
        {snippets[activeTab].code}
      </Code>
      {snippets[activeTab].description && (
        <div className="p-4 text-sm font-medium text-white flex items-baseline" css={{ background: '#303f6d' }}>
          <div className="flex-shrink-0 w-4 h-4 fill-current mr-2">
            <svg className="mt-1 w-full h-full" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z" />
            </svg>
          </div>
          <div className="leading-snug">{snippets[activeTab].description}</div>
        </div>
      )}
    </div>
  )
}
