import Nav from './Nav'
import Head from 'next/head'
import Link from 'next/link'
import dedent from 'dedent-js'
import Mousetrap from 'mousetrap'
import { MDXProvider } from '@mdx-js/react'
import TabbedCodeExamples from './TabbedCodeExamples'
import MarkdownComponents from './MarkdownComponents'
import React, { useState, useEffect, useRef } from 'react'

export const CodeTabContext = React.createContext()

const getFromLocalStorage = (key, defaultValue = 0) => {
  if (typeof window === 'undefined') {
    return defaultValue
  }

  return parseInt(localStorage.getItem(key) || defaultValue)
}

export default function Layout({ meta, children }) {
  const mobileNav = useRef(null)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const initialTabValue = 0;
  const [codeTabs, setCodeTabsState] = useState({
    client: initialTabValue,
    server: initialTabValue,
  })

  const setCodeTabs = (newValue) => {
    setCodeTabsState(newValue);
    localStorage.setItem('currentClientSideTab', newValue.client);
    localStorage.setItem('currentServerSideTab', newValue.server);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    setCodeTabsState({
      client: getFromLocalStorage('currentClientSideTab'),
      server: getFromLocalStorage('currentServerSideTab'),
    })
  }, [initialTabValue])

  useEffect(() => {
    // Algolia DocSearch
    docsearch({
      apiKey: 'ea9f3351550104420cd3c7b4e2b9b7b1',
      indexName: 'inertiajs',
      inputSelector: '#docsearch',
      debug: false,
    })

    // Add shortcut to search input when pressing the "/" key
    Mousetrap.bind('/', function(e) {
      e.preventDefault()
      document.getElementById('docsearch').focus()
    })

    if (process.env.NODE_ENV === 'production') {
      // Carbon Ads
      var s = document.createElement('script')
      s.setAttribute('async', '')
      s.src = '//cdn.carbonads.com/carbon.js?serve=CE7DCKJ7&placement=inertiajscom'
      s.id = '_carbonads_js'
      var adElement = document.getElementById('ad')
      adElement.innerHTML = ''
      adElement.appendChild(s)

      // Google Analytics
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'UA-140425344-1', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: window.document.title,
      })
    }
  }, [])

  return (
    <div
      onClick={e => setShowMobileNav(mobileNav.current.contains(e.target))}
      className="leading-none font-sans text-gray-800 antialiased"
    >
      <Head>
        <title>{meta.title ? `${meta.title} - Inertia.js` : `Inertia.js - The Modern Monolith`}</title>
        {meta.description && <meta type="description" content={meta.description} />}
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        {meta.twitterCardImage && (
          <React.Fragment>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@reinink" />
            <meta name="twitter:creator" content="@reinink" />
            <meta name="twitter:title" content={`Inertia.js - ${meta.title ? meta.title : 'The Modern Monolith'}`} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={meta.twitterCardImage} />
          </React.Fragment>
        )}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-140425344-1"></script>
      </Head>
      {meta.sponsor && (
        <div
          className="px-6 md:px-12 xl:px-0 py-4 text-md font-medium flex items-center justify-center"
          css={{ background: '#92eee2' }}
        >
          <svg className="w-5 h-5 fill-current text-purple-500 flex-shrink-0" viewBox="0 0 20 20">
            <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
          </svg>
          <div className="mx-2">Support the ongoing development of Inertia.js.</div>
          <Link href="/sponsors">
            <a className="px-3 py-1 bg-purple-500 hover:bg-purple-600 rounded-full text-xs text-white leading-tight whitespace-no-wrap">
              Learn more
            </a>
          </Link>
        </div>
      )}
      <div className="text-white" css={{ background: 'linear-gradient(to right, #9553e9, #6d74ed)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-0 relative">
          <div className="overflow-hidden absolute top-0 left-0 w-full h-full">
            <svg className="w-auto" css={{ height: '600px', fill: '#b2b6ff', opacity: '.08' }} viewBox="0 0 95 52.8">
              <path d="M27.3 0H0l26.4 26.4L0 52.8h27.3l26.4-26.4z" />
              <path d="M68.6 0H41.3l26.4 26.4-26.4 26.4h27.3L95 26.4z" />
            </svg>
          </div>
          <header className="py-12 relative flex items-center justify-between">
            <Link href="/">
              <a className="md:flex md:items-end">
                <svg className="block fill-current text-white" css={{ height: '25px' }} viewBox="0 0 275.3 50.5">
                  <path d="M231.2 16.1h-17.8l17.2 17.2-17.2 17.2h17.8l17.2-17.2z" />
                  <path d="M258.1 16.1h-17.8l17.2 17.2-17.2 17.2h17.8l17.2-17.2z" />
                  <path d="M6 15.3h10.3l-6 34.2H0l6-34.2zm.6-9.1C7.2 2.9 10.3 0 13.7 0s5.7 2.8 5.2 6.2c-.5 3.4-3.7 6.2-7.2 6.2s-5.6-3-5.1-6.2zM54.3 28.5l-3.7 21H40.4L43.8 30c.8-4.4-1.6-6.2-4.9-6.2-3.4 0-6.5 2-7.5 6.6L28 49.5H17.8l6-34.2h10.3l-.5 3.2c2.3-2.6 6.2-4.2 10.1-4.2 6.9.1 12.2 5.1 10.6 14.2zM94.5 32.4c-.1.8-.5 2.7-1.1 4.1H68.9c.6 3.8 3.8 4.8 7 4.8 2.9 0 5.2-.8 7.2-2.7l7.2 5.9c-4 4-8.7 6-15 6-11.8 0-18-8.5-16.3-18.7a20.7 20.7 0 0 1 20.5-17.4c9.8 0 16.9 7.6 15 18zm-9.7-3.7c-.3-3.8-3-5.3-6.2-5.3a8.9 8.9 0 0 0-8.3 5.3h14.5zM123.9 14.6l-2 11.6c-4-.6-10.5.8-11.7 7.8l.1-.4-2.8 15.9H97.3l6-34.2h10.3l-1.1 6.2c2.1-4.7 6.6-6.9 11.4-6.9zM137.8 37.3c-.5 3.1 2 3.3 6.6 2.9l-1.6 9.3c-12.3 1.4-16.9-2.7-15.2-12.2l2.1-12.1h-5.5l1.8-9.9h5.4l1.2-6.5 10.8-3.1-1.7 9.6h7.1l-1.8 9.9h-7l-2.2 12.1zM155.3 15.3h10.3l-6 34.2h-10.3l6-34.2zm.6-9.1c.5-3.3 3.7-6.2 7.1-6.2s5.7 2.8 5.2 6.2c-.5 3.4-3.7 6.2-7.2 6.2s-5.7-3-5.1-6.2zM208.1 15.3l-6 34.2h-10.3l.4-2.3a15.5 15.5 0 0 1-10.3 3.3c-11.1 0-15.3-9.6-13.5-18.9 1.6-8.8 8.6-17.2 19.2-17.2 4.5 0 7.7 1.8 9.6 4.6l.6-3.6h10.3zm-13.2 17.2c.9-5.2-1.9-8.4-6.6-8.4a9.5 9.5 0 0 0-9.5 8.3c-.9 5.1 1.8 8.3 6.6 8.3 4.6.1 8.6-3.1 9.5-8.2z" />
                </svg>
                <svg
                  className="block fill-current text-white mt-2 md:mt-0 md:ml-4"
                  css={{ height: '8px' }}
                  viewBox="0 0 328.3 16"
                >
                  <path d="M11.1 2.2H6.6v13.5h-2V2.2H0V.3h11.1v1.9zM29.1.3v15.4h-2V8.8h-7.5v6.9h-2V.3h2v6.5h7.5V.3h2zM46 13.8v1.9h-9.2V.3h9.1v1.9h-7V7h6.5v1.9h-6.5v4.9H46zM77.2 15.7h-2v-12l-5 8.4h-.3l-5-8.4v12h-2V.3h2.3L70 8.4 74.9.3h2.3v15.4zM84 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.4 0 5.9-2.6 5.9-6zM120.2 8c0 4.3-3.1 7.7-7.3 7.7h-6V.3h6c4.2 0 7.3 3.4 7.3 7.7zm-2 0c0-3.3-2.2-5.8-5.3-5.8h-4v11.5h4c3.1.1 5.3-2.5 5.3-5.7zM136.2 13.8v1.9H127V.3h9.1v1.9h-7V7h6.5v1.9h-6.5v4.9h7.1zM148.8 9.8h-3.6v5.9h-2V.3h6.2c2.6 0 4.8 2.1 4.8 4.8 0 2-1.3 3.8-3.2 4.5l3.6 6.2h-2.3l-3.5-6zm-3.6-1.9h4.1c1.5 0 2.8-1.3 2.8-2.9 0-1.6-1.2-2.9-2.8-2.9h-4.1v5.8zM172.6.3v15.4H171l-8-11.5v11.5h-2V.3h1.7l7.9 11.5V.3h2zM204.6 15.7h-2v-12l-5 8.4h-.3l-5-8.4v12h-2V.3h2.3l4.9 8.1 4.9-8.1h2.3v15.4zM211.5 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.3 0 5.9-2.6 5.9-6zM245.9.3v15.4h-1.6l-7.9-11.5v11.5h-2V.3h1.7l7.9 11.5V.3h1.9zM252.8 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.3 0 5.9-2.6 5.9-6zM284.3 13.8v1.9h-8.7V.3h2v13.5h6.7zM292.8.3v15.4h-2V.3h2zM310.3 2.2h-4.6v13.5h-2V2.2h-4.5V.3h11.1v1.9zM328.3.3v15.4h-2V8.8h-7.5v6.9h-2V.3h2v6.5h7.5V.3h2z" />
                </svg>
              </a>
            </Link>
            <div ref={mobileNav} className="md:hidden relative z-10">
              <button className="block focus:outline-none" type="button">
                <svg className="block fill-current text-white w-6 h-6" viewBox="0 0 20 20">
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>
              {showMobileNav && (
                <Nav className="absolute top-0 right-0 -mt-4 px-6 pb-6 bg-white shadow-xl rounded z-50 whitespace-no-wrap" />
              )}
            </div>
            <div className="hidden md:flex items-center text-white">
              <div className="mr-5 relative">
                <input
                  id="docsearch"
                  placeholder="Search…"
                  className="py-1 pl-8 w-40 lg:w-56 focus:outline-none block appearance-none bg-white rounded-full text-sm leading-normal font-medium text-gray-700"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg className="fill-current pointer-events-none text-gray-500 w-4 h-4" viewBox="0 0 20 20">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                  </svg>
                </div>
              </div>
              <a className="block flex items-center hover:text-purple-900 mr-5" href="https://github.com/inertiajs">
                <svg className="fill-current w-6 h-6" viewBox="0 0 20 20">
                  <title>GitHub</title>
                  <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0" />
                </svg>
              </a>
              <a className="block flex items-center hover:text-purple-900 mr-5" href="https://twitter.com/inertiajs">
                <svg className="fill-current w-6 h-6" viewBox="0 0 20 20">
                  <title>Twitter</title>
                  <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84" />
                </svg>
              </a>
              <a className="block flex items-center hover:text-purple-900" href="https://discord.gg/gwgxN8Y">
                <svg className="fill-current w-6 h-6" viewBox="0 0 146 146">
                  <title>Discord</title>
                  <path
                    d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
                    fillRule="nonzero"
                  />
                </svg>
              </a>
            </div>
          </header>
          {meta.hero && (
            <div className="lg:mt-16 relative flex flex-wrap items-start">
              <div className="w-full lg:w-1/2 mt-4">
                <h1 className="text-4xl lg:text-5xl leading-tight font-light">
                  Build single-page apps, <strong className="font-bold">without building an API.</strong>
                </h1>
                <p className="mt-8 text-lg lg:text-xl leading-relaxed max-w-md pr-2">
                  Inertia.js lets you{' '}
                  <strong className="font-bold" css={{ color: '#92eee2' }}>
                    quickly build modern single-page React, Vue and Svelte apps
                  </strong>{' '}
                  using classic server-side routing and controllers.
                </p>
              </div>
              <div className="w-full lg:w-1/2 lg:pl-24 mt-8 lg:mt-0">
                <TabbedCodeExamples
                  className="rounded-t overflow-hidden"
                  height="330"
                  examples={[
                    {
                      name: 'UsersController.php',
                      language: 'php',
                      code: dedent`
                        class UsersController
                        {
                            public function index()
                            {
                                $users = User::active()
                                    ->orderByName()
                                    ->get()
                                    ->only('id', 'name', 'email');

                                return Inertia::render('Users', [
                                    'users' => $users
                                ]);
                            }
                        }
                      `,
                    },
                    {
                      name: 'Users.vue',
                      language: 'html',
                      code: dedent`
                        <template>
                          <layout title="Users">
                            <div v-for="user in users" :key="user.id">
                              <inertia-link :href="\`/users/\${user.id}\`">
                                {{ user.name }}
                              </inertia-link>
                              <div>{{ user.email }}</div>
                            </div>
                          </layout>
                        </template>

                        <script>
                        import Layout from '../Shared/Layout'

                        export default {
                          components: {
                            Layout,
                          },
                          props: {
                            users: Array,
                          },
                        }
                        </script>
                      `,
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {meta.sponsor && (
        <div className="bg-gray-200">
          <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-0 py-4 flex items-center justify-start overflow-x-scroll">
            <div className="mr-6 text-md font-medium text-gray-600">
              <div className="md:hidden">Sponsors:</div>
              <div className="hidden md:block">Our gold sponsors:</div>
            </div>
            <a className="text-gray-600 hover:text-gray-800 mr-8" href="https://ploi.io" title="Ploi">
              <svg className="w-auto h-6 fill-current" viewBox="0 0 253 93.3">
                <path d="M25.7 66a11.4 11.4 0 01-9.5-4.7q-3.6-4.7-3.7-12.6T16.2 36a11.4 11.4 0 019.5-4.7 11.4 11.4 0 019.6 4.7Q39 40.7 39 48.7t-3.6 12.6a11.5 11.5 0 01-9.6 4.7zm3.8-45.1a18.9 18.9 0 00-10.2 2.7 18 18 0 00-6.7 7.5h-.3v-9.3H0v71.5h12.6V66.5h.3a17 17 0 006.6 7.2 19.4 19.4 0 0010.2 2.6q10.2 0 16.1-7.4t6-20.3q0-12.9-6-20.4T29.5 21zM59.2 75.5h12.6V2.5H59.2v73.1zM105.3 66.6a11.5 11.5 0 01-9.6-4.7Q92 57.2 92 48.7t3.6-13.3a12.1 12.1 0 0119.2 0q3.6 4.7 3.6 13.3t-3.6 13.2a11.5 11.5 0 01-9.6 4.7zm0 10q11.8 0 19-7.4t7-20.6q0-13-7.1-20.4t-19-7.5q-11.7 0-18.8 7.5t-7.1 20.4q0 13.2 7 20.6t19 7.4zM145 13.7a6.7 6.7 0 004.9-2 6.6 6.6 0 002-4.8 6.6 6.6 0 00-2-4.9 6.8 6.8 0 00-5-2 6.7 6.7 0 00-4.8 2 6.5 6.5 0 00-2 4.9 6.5 6.5 0 002 4.8 6.6 6.6 0 004.8 2zm-6.3 61.9h12.6V21.8h-12.7v53.8zM168.8 76a5.7 5.7 0 10-4.1-1.6 5.6 5.6 0 004 1.7zM191.5 13.4a5.3 5.3 0 004-1.6A5.3 5.3 0 00197 8a5.5 5.5 0 10-11 0 5.3 5.3 0 001.5 4 5.3 5.3 0 004 1.5zm-4.4 62.1h8.8V22.8H187v52.8zM228.6 68.7a13.8 13.8 0 01-11.2-5q-4.3-5.2-4.3-14.5t4.3-14.4a14.9 14.9 0 0122.4 0q4.2 5 4.2 14.4t-4.2 14.4a13.8 13.8 0 01-11.2 5.1zm0 7.8q10.9 0 17.6-7.4t6.8-20q0-12.5-6.8-19.9T228.7 22q-11 0-17.7 7.3t-6.7 20q0 12.6 6.7 20t17.7 7.3z" />
              </svg>
            </a>
            <a
              className="text-gray-600 hover:text-gray-800 mr-8"
              href="https://forge.laravel.com"
              title="Laravel Forge"
            >
              <svg className="w-auto h-4 fill-current" viewBox="0 0 217.38 39.97">
                <path d="M77.94.32c4.13 0 6.03.74 7.2 2.22 1.68 2.22 2.64 6.66-.11 17.55S79.2 35.3 76.36 37.64c-1.9 1.48-4.23 2.22-8.36 2.22H54.8c-4.13 0-6.13-.74-7.2-2.22-1.68-2.22-2.63-6.66.22-17.55 2.75-10.9 5.92-15.23 8.78-17.55C58.49 1.06 60.8.32 64.94.32h13zM58.7 30.24c.21.32.74.42 2.43.42h5.08c1.69 0 2.32-.1 2.75-.42.52-.42 1.48-1.48 3.59-10.15 2.22-8.67 1.8-9.73 1.48-10.15-.21-.32-.74-.42-2.43-.42h-4.97c-1.7 0-2.33.1-2.75.42-.53.42-1.48 1.48-3.6 10.15-2.32 8.77-1.9 9.73-1.58 10.15zm51.28-3.17c-.42-.53-.85-.74-3.38-.74h-4.97c-.53 0-1.06.42-1.17.95L97.61 38.9c-.1.53-.64.95-1.16.95H86.19c-.53 0-.85-.42-.74-.95l9.4-37.64c.11-.53.64-.95 1.17-.95h24.1c3.92 0 6.03.53 7.2 2 1.27 1.8 1.69 3.7.32 9.2-1.8 7.4-4.55 9.52-9.3 10.47v.1c3.7.96 5.7 2.23 4.43 7.94-.74 3.27-1.27 6.55-1.58 8.77-.11.53-.64 1.06-1.17 1.06h-10.46c-.43 0-.85-.32-.74-.85.31-2.43.74-4.86 1.37-7.93.42-2.85.21-3.38-.21-4.01zm-.74-9.3c2.22 0 2.85-.11 3.28-.43.74-.53 1.26-1.48 1.8-3.8s.42-3.18 0-3.7c-.32-.32-.85-.43-3.07-.43h-5.5c-.53 0-1.06.42-1.16.95L103 16.92c-.1.53.21.95.74.95h5.5v-.1zM160.94 0c4.23 0 6.45.53 7.72 2 1.48 1.8 2 4.56.84 10.69-.1.53-.63.95-1.16.95h-9.83c-.53 0-.85-.42-.74-.85.42-2.43-.1-2.75-.43-3.17-.2-.32-.63-.42-2.43-.42h-5.07c-1.8 0-2.33.1-2.75.42-.64.53-1.8 2.33-3.7 10.36s-1.59 9.94-1.27 10.47c.21.32.74.42 2.54.42h5.39c1.59 0 2.22-.1 2.64-.42.53-.42 1.59-1.48 2.22-4.33l.1-.32h-7.6c-.53 0-.85-.43-.74-.95l1.48-6.35c.1-.53.63-.95 1.16-.95h18.3c.52 0 .84.42.73.95l-.95 3.91c-2.22 9.63-4.86 13-7.61 15.23-2.01 1.7-4.87 2.33-8.57 2.33H138c-4.13 0-6.14-.74-7.3-2.33-1.8-2.33-2.75-6.66-.1-17.66s5.7-15.43 8.56-17.65C141.06.74 143.39 0 147.51 0h13.43zm41.23 39.97h-31.6c-.54 0-.85-.43-.75-.96L178.7.95c.1-.53.64-.95 1.17-.95h36.79c.63 0 .95.63.53 1.27-1.59 2.54-7.72 7.93-14.6 7.93H189.8c-.52 0-1.05.42-1.16.95l-.95 4.23c-.1.53.21.95.74.95h17.23c.53 0 .85.42.74.95l-1.48 6.66c-.1.53-.63.95-1.16.95h-17.23c-.53 0-1.06.43-1.17.96l-1.16 4.86c-.1.53.21.95.74.95h19.35c.53 0 .84.42.74.95l-1.7 7.3c-.1.63-.63 1.06-1.16 1.06zM50.24.32H6.9c-.53 0-1.05.42-1.16.95l-1.06 3.8c-.1.43.1.75.43.96 1.69.53 10.78.74 9.4 5.81l-.31 1.38-3.7 13.85-.32 1.37c-1.37 5.08-6.24 5.29-8.25 5.82-.42.1-.74.52-.84.95L.02 39c-.1.53.21.96.74.96h17.66c.53 0 1.05-.43 1.16-.96l3.17-12.26c.1-.53.64-.95 1.16-.95h11.32c.53 0 1.06-.43 1.16-.95l1.7-6.56c.1-.53-.22-.95-.75-.95H26.03c-.53 0-.85-.42-.74-.95l1.59-5.92c.1-.53.63-.95 1.16-.95h17.02c.53 0 1.06-.43 1.16-.96l4.55-7.19c.21-.63 0-1.05-.53-1.05z" />
              </svg>
            </a>
            <a
              className="text-gray-600 hover:text-gray-800 mr-8"
              href="https://www.activitysource.com"
              title="ActivitySource"
            >
              <svg className="w-auto h-5 fill-current" viewBox="0 0 209.6 30.1">
                <path d="M44.3 3.9h3.2l7 20.2H51L49.4 19h-7l-1.7 5.1h-3.4l7-20.2zm4.1 12.3l-2.5-8-2.6 8h5.1zM54 16.9c0-4 2.3-7.5 6.9-7.5 3.1 0 5.3 1.4 6.4 4.1l-2.7 1.1c-.8-1.6-1.9-2.6-3.7-2.6-2.5 0-3.7 2.1-3.7 4.9s1.2 4.9 3.7 4.9c1.8 0 2.9-.9 3.7-2.6l2.7 1.1c-1.1 2.7-3.3 4.1-6.4 4.1-4.6 0-6.9-3.5-6.9-7.5zM70.5 19.3v-7.1h-2.3V9.6h2.3v-4l3.1-1.9v5.9h3.9v2.7h-3.9v7.1c0 1.8.7 2.4 1.9 2.4.5 0 1-.1 1.5-.4l.7 2.5c-.8.4-1.6.5-2.4.5-2.9 0-4.8-1.6-4.8-5.1zM78.7 5.4c0-1.2.9-2.1 2.1-2.1 1.2 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1c-1.2 0-2.1-.9-2.1-2.1zm.5 4.2h3.1v14.6h-3.1V9.6zM83.8 9.6h3.1l3.3 10.8 3.3-10.8h3.1l-4.9 14.6h-2.8L83.8 9.6zM97.5 5.4c0-1.2.9-2.1 2.1-2.1 1.2 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1c-1.3 0-2.1-.9-2.1-2.1zm.5 4.2h3.1v14.6H98V9.6zM105.1 19.3v-7.1h-2.3V9.6h2.3v-4l3.1-1.9v5.9h3.9v2.7h-3.9v7.1c0 1.8.7 2.4 1.9 2.4.5 0 1-.1 1.5-.4l.7 2.5c-.8.4-1.6.5-2.4.5-2.9 0-4.8-1.6-4.8-5.1zM118.5 23.5l-5.3-13.9h3.1l3.7 9.9 3.4-9.9h3.1l-7.4 20.5h-2.9l2.3-6.6zM128 18.8l2.6-1.6c.6 2.3 1.8 4.2 4.2 4.2 1.6 0 2.9-.9 2.9-2.9s-2.2-2.9-4.6-4.1c-2.1-1-4-2.6-4-5.6s2.3-5.2 5.4-5.2c2.8 0 4.5 1.3 5.5 3.5l-2.6 1.7c-.6-1.7-1.7-2.2-2.9-2.2-1.3 0-2.3.9-2.3 2.1 0 1.9 2 2.8 4.1 3.7 2.5 1.1 4.6 2.6 4.6 5.9 0 3.7-2.6 6-6.2 6-3.5.1-6-2.4-6.7-5.5zM142.2 16.9c0-4.1 2.7-7.5 7.2-7.5s7.2 3.4 7.2 7.5-2.7 7.5-7.2 7.5-7.2-3.4-7.2-7.5zm11.3 0c0-2.6-1.4-4.9-4-4.9s-4 2.3-4 4.9 1.4 4.9 4 4.9 4-2.3 4-4.9zM158.3 19.9V9.6h3.1v9.5c0 1.8.9 2.7 2.3 2.7 2 0 3.8-2.2 3.8-6.2v-6h3v14.6h-3v-2.5c-1.1 1.7-2.7 2.8-4.7 2.8-2.7-.1-4.5-1.6-4.5-4.6zM172.5 9.6h3.1V12c1-1.7 2.5-2.7 4.3-2.7.7 0 1.3.1 1.9.3l-.6 2.8c-.5-.3-1-.4-1.7-.4-2.1 0-3.9 1.9-3.9 6.7V24h-3.1V9.6zM181.6 16.9c0-4 2.3-7.5 6.9-7.5 3.1 0 5.3 1.4 6.4 4.1l-2.7 1.1c-.8-1.7-1.9-2.6-3.7-2.6-2.5 0-3.7 2.1-3.7 4.9s1.2 4.9 3.7 4.9c1.8 0 2.9-.9 3.7-2.6l2.7 1.1c-1.1 2.7-3.3 4.1-6.4 4.1-4.6 0-6.9-3.5-6.9-7.5zM196.1 16.9c0-3.7 2.2-7.5 6.8-7.5 4.5 0 6.7 3.6 6.7 7.1v1.3h-10.3c.1 2.2 1.4 4.1 3.8 4.1 1.8 0 2.9-.8 3.8-2.5l2.5 1c-1.2 2.7-3.2 4.2-6.5 4.2-4.6-.2-6.8-4-6.8-7.7zm10.4-1.7c-.3-1.8-1.4-3.2-3.6-3.2-2 0-3.2 1.5-3.5 3.2h7.1z" />
                <path d="M14.5 0C6.5 0 0 6.3 0 14.1s6.5 14.1 14.5 14.1c3.8 0 7.4-1.4 10.1-4h-4.1c-1.8 1-3.9 1.6-6 1.6-6.7 0-12.1-5.2-12.1-11.7 0-6.4 5.4-11.7 12.1-11.7s12.1 5.2 12.1 11.7c0 .8-.1 1.6-.3 2.4-.1.6-.3 1.1-.4 1.3-.4 1-.8 1.1-1.1 1.1-.4 0-.6-.3-.7-.5l-.3-1s-.2-.5-.2-.8c-.4-1.3-1.5-2.2-2.8-2.3-1-.1-1.9.3-2.6 1.1-.2.2-.4.5-.6.8-.1.2-.2.4-.4.7l.1.1-.3.6c-.5 1.1-.9 1.3-1.2 1.2-.4 0-.6-.3-.7-.5l-.5-1.5-3.5-10.1H8.8L4.4 19.5H7l3-9.2 2.6 8.2v.1c.1.3.1.5.2.6.4 1.3 1.5 2.2 2.8 2.3 2 .1 3-1.4 3.5-2.6l.1-.2c.1-.2.2-.4.2-.5.5-1.1.9-1.3 1.2-1.3.4 0 .6.3.7.5l.3 1s.2.5.2.8c.4 1.3 1.5 2.2 2.8 2.3 2 .1 3-1.4 3.5-2.6l.3-.6c.3-.8.4-1.6.4-1.8.1-.8.2-1.6.2-2.4C29 6.3 22.5 0 14.5 0z" />
              </svg>
            </a>
            <div>&nbsp;</div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto md:px-12 xl:px-0 py-12 md:py-24 flex">
        <Nav className="hidden md:block md:w-48 lg:w-56 flex-shrink-0 border-r" />
        <div
          className="flex-1 overflow-hidden px-6 md:pl-12 md:pr-0 lg:pl-16 xl:pl-16 xl:pr-20 leading-relaxed text-lg"
          id="top"
        >
          <CodeTabContext.Provider value={[codeTabs, setCodeTabs]}>
            <MDXProvider components={MarkdownComponents} children={children} />
          </CodeTabContext.Provider>
        </div>
        <div className="hidden xl:block w-44 flex-shrink-0 relative -mt-8">
          <div className="pt-8 sticky top-0">
            {meta.links && (
              <div className="mb-12">
                <div className="text-xs font-bold uppercase text-gray-500 tracking-widest">On this page</div>
                <ul>
                  {meta.links.map((link, index) => (
                    <li className="mt-4" key={index}>
                      <Link href={link.url}>
                        <a className="hover:text-blue-700 hover:underline font-medium text-gray-700">{link.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div id="ad" />
          </div>
        </div>
      </div>
    </div>
  )
}
