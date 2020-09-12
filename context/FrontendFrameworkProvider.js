import React, { useEffect, useState } from 'react'

export const FrontendFrameworkContext = React.createContext()

const FrontendFrameworkProvider = ({ children }) => {
  const [frontendFramework, setFrontendFramework] = useState('vue')

  useEffect(() => {
    const initialFramework = localStorage.getItem('inertia.frontend.framework')
    if (initialFramework) {
      setFrontendFramework(initialFramework)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('inertia.frontend.framework', frontendFramework)
  }, [frontendFramework])

  return (
    <FrontendFrameworkContext.Provider
      value={{
        frontendFramework,
        setFrontendFramework,
      }}
    >
      {children}
    </FrontendFrameworkContext.Provider>
  )
}

export default FrontendFrameworkProvider
