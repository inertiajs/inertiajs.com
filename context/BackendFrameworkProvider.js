import React, { useEffect, useState } from 'react'

export const BackendFrameworkContext = React.createContext()

const BackendFrameworkProvider = ({ children }) => {
  const [backendFramework, setBackendFramework] = useState('laravel')

  useEffect(() => {
    const initialFramework = localStorage.getItem('inertia.backend.framework')
    if (initialFramework) {
      setBackendFramework(initialFramework)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('inertia.backend.framework', backendFramework)
  }, [backendFramework])

  return (
    <BackendFrameworkContext.Provider
      value={{
        backendFramework,
        setBackendFramework,
      }}
    >
      {children}
    </BackendFrameworkContext.Provider>
  )
}

export default BackendFrameworkProvider
