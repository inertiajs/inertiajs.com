import { useContext } from 'react'

import { CodeTabContext } from './Layout'

const FrameworkSpecific = ({ frameworks, children }) => {
  const [codeTabs] = useContext(CodeTabContext)

  if (frameworks.includes(codeTabs.frontend) || frameworks.includes(codeTabs.backend)) {
    return children
  }
}

export default FrameworkSpecific
