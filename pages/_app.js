import React from 'react'
import App from 'next/app'
import '../public/tailwind.css'
import FrontendFrameworkProvider from '../context/FrontendFrameworkProvider'
import BackendFrameworkProvider from '../context/BackendFrameworkProvider'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <BackendFrameworkProvider>
        <FrontendFrameworkProvider>
          <Component {...pageProps} />
        </FrontendFrameworkProvider>
      </BackendFrameworkProvider>
    )
  }
}

export default MyApp
