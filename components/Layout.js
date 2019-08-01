import Code from './Code'
import dedent from 'dedent'
import Head from 'next/head'
import Link from 'next/link'
import { MDXProvider } from '@mdx-js/react'
import TabbedCodeExamples from '../components/TabbedCodeExamples'

const components = {
  h1: ({ children }) => <h1 className="mb-8 text-4xl font-bold text-gray-700 leading-none">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-16 mb-4 text-2xl font-bold text-gray-700 leading-none">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-16 mb-4 text-xl font-bold text-gray-700 leading-none">{children}</h3>,
  a: (props) => <a className="text-blue-700 hover:text-orange-700 font-medium underline" {...props} />,
  pre: ({ children }) => children,
  code: ({ className, children }) => <Code className="my-8 p-6 leading-normal rounded" language={className.replace('language-', '')} children={children} />,
  TabbedCodeExamples: (props) => <TabbedCodeExamples className="my-8 rounded overflow-hidden" {...props} />,
  inlineCode: (props) => <code className="font-mono text-sm font-bold bg-gray-200 rounded p-1" {...props} />,
}

export default function Layout({ meta, children }) {
  return (
    <div className="leading-none font-sans text-gray-800 antialiased">
      <Head>
        <title>{meta.title}</title>
      </Head>
      <div className="overflow-hidden text-white" css={{ background: 'linear-gradient(to right, #9553e9, #6d74ed)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-0 relative">
          <svg className="absolute z-10 top-0 w-auto" css={{ height: '600px', fill: '#b2b6ff', opacity: '.08' }} viewBox="0 0 95 52.8"><path d="M27.3 0H0l26.4 26.4L0 52.8h27.3l26.4-26.4z"/><path d="M68.6 0H41.3l26.4 26.4-26.4 26.4h27.3L95 26.4z"/></svg>
          <header className="py-12 relative z-20 flex justify-between">
            <Link href="/">
              <a className="lg:flex lg:items-end">
                <svg className="block fill-current text-white" css={{ height: '25px' }} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275.3 50.5"><path d="M231.2 16.1h-17.8l17.2 17.2-17.2 17.2h17.8l17.2-17.2z"/><path d="M258.1 16.1h-17.8l17.2 17.2-17.2 17.2h17.8l17.2-17.2z"/><g><path d="M6 15.3h10.3l-6 34.2H0l6-34.2zm.6-9.1C7.2 2.9 10.3 0 13.7 0s5.7 2.8 5.2 6.2c-.5 3.4-3.7 6.2-7.2 6.2s-5.6-3-5.1-6.2zM54.3 28.5l-3.7 21H40.4L43.8 30c.8-4.4-1.6-6.2-4.9-6.2-3.4 0-6.5 2-7.5 6.6L28 49.5H17.8l6-34.2h10.3l-.5 3.2c2.3-2.6 6.2-4.2 10.1-4.2 6.9.1 12.2 5.1 10.6 14.2zM94.5 32.4c-.1.8-.5 2.7-1.1 4.1H68.9c.6 3.8 3.8 4.8 7 4.8 2.9 0 5.2-.8 7.2-2.7l7.2 5.9c-4 4-8.7 6-15 6-11.8 0-18-8.5-16.3-18.7a20.7 20.7 0 0 1 20.5-17.4c9.8 0 16.9 7.6 15 18zm-9.7-3.7c-.3-3.8-3-5.3-6.2-5.3a8.9 8.9 0 0 0-8.3 5.3h14.5zM123.9 14.6l-2 11.6c-4-.6-10.5.8-11.7 7.8l.1-.4-2.8 15.9H97.3l6-34.2h10.3l-1.1 6.2c2.1-4.7 6.6-6.9 11.4-6.9zM137.8 37.3c-.5 3.1 2 3.3 6.6 2.9l-1.6 9.3c-12.3 1.4-16.9-2.7-15.2-12.2l2.1-12.1h-5.5l1.8-9.9h5.4l1.2-6.5 10.8-3.1-1.7 9.6h7.1l-1.8 9.9h-7l-2.2 12.1zM155.3 15.3h10.3l-6 34.2h-10.3l6-34.2zm.6-9.1c.5-3.3 3.7-6.2 7.1-6.2s5.7 2.8 5.2 6.2c-.5 3.4-3.7 6.2-7.2 6.2s-5.7-3-5.1-6.2zM208.1 15.3l-6 34.2h-10.3l.4-2.3a15.5 15.5 0 0 1-10.3 3.3c-11.1 0-15.3-9.6-13.5-18.9 1.6-8.8 8.6-17.2 19.2-17.2 4.5 0 7.7 1.8 9.6 4.6l.6-3.6h10.3zm-13.2 17.2c.9-5.2-1.9-8.4-6.6-8.4a9.5 9.5 0 0 0-9.5 8.3c-.9 5.1 1.8 8.3 6.6 8.3 4.6.1 8.6-3.1 9.5-8.2z"/></g></svg>
                <svg className="block fill-current text-white mt-2 lg:mt-0 lg:ml-4" css={{ height: '8px' }} version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 328.3 16"><path d="M11.1 2.2H6.6v13.5h-2V2.2H0V.3h11.1v1.9zM29.1.3v15.4h-2V8.8h-7.5v6.9h-2V.3h2v6.5h7.5V.3h2zM46 13.8v1.9h-9.2V.3h9.1v1.9h-7V7h6.5v1.9h-6.5v4.9H46zM77.2 15.7h-2v-12l-5 8.4h-.3l-5-8.4v12h-2V.3h2.3L70 8.4 74.9.3h2.3v15.4zM84 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.4 0 5.9-2.6 5.9-6zM120.2 8c0 4.3-3.1 7.7-7.3 7.7h-6V.3h6c4.2 0 7.3 3.4 7.3 7.7zm-2 0c0-3.3-2.2-5.8-5.3-5.8h-4v11.5h4c3.1.1 5.3-2.5 5.3-5.7zM136.2 13.8v1.9H127V.3h9.1v1.9h-7V7h6.5v1.9h-6.5v4.9h7.1zM148.8 9.8h-3.6v5.9h-2V.3h6.2c2.6 0 4.8 2.1 4.8 4.8 0 2-1.3 3.8-3.2 4.5l3.6 6.2h-2.3l-3.5-6zm-3.6-1.9h4.1c1.5 0 2.8-1.3 2.8-2.9 0-1.6-1.2-2.9-2.8-2.9h-4.1v5.8zM172.6.3v15.4H171l-8-11.5v11.5h-2V.3h1.7l7.9 11.5V.3h2zM204.6 15.7h-2v-12l-5 8.4h-.3l-5-8.4v12h-2V.3h2.3l4.9 8.1 4.9-8.1h2.3v15.4zM211.5 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.3 0 5.9-2.6 5.9-6zM245.9.3v15.4h-1.6l-7.9-11.5v11.5h-2V.3h1.7l7.9 11.5V.3h1.9zM252.8 8a8 8 0 0 1 8-8c4.5 0 8 3.5 8 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8zm13.9 0c0-3.4-2.6-6-5.9-6a5.8 5.8 0 0 0-5.9 6c0 3.4 2.6 6 5.9 6 3.3 0 5.9-2.6 5.9-6zM284.3 13.8v1.9h-8.7V.3h2v13.5h6.7zM292.8.3v15.4h-2V.3h2zM310.3 2.2h-4.6v13.5h-2V2.2h-4.5V.3h11.1v1.9zM328.3.3v15.4h-2V8.8h-7.5v6.9h-2V.3h2v6.5h7.5V.3h2z"/></svg>
              </a>
            </Link>
            <div className="flex items-center text-white">
              <a className="block flex items-center hover:text-purple-900 mr-5" href="https://github.com/inertiajs">
                <svg className="fill-current w-6 h-6" viewBox="0 0 20 20"><title>GitHub</title><path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"/></svg>
              </a>
              <a className="block flex items-center hover:text-purple-900 mr-5" href="https://twitter.com/inertiajs">
                <svg className="fill-current w-6 h-6" viewBox="0 0 20 20"><title>Twitter</title><path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"/></svg>
              </a>
              <a className="block flex items-center hover:text-purple-900" href="https://discord.gg/gwgxN8Y">
                <svg className="fill-current w-6 h-6" viewBox="0 0 146 146"><title>Discord</title><path d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z" fillRule="nonzero"/></svg>
              </a>
            </div>
          </header>
          { meta.hero &&
            <div className="lg:mt-16 relative z-20 flex flex-wrap items-start">
              <div className="w-full lg:w-1/2 mt-4">
                  <h1 className="text-4xl lg:text-5xl leading-tight font-light">
                    Build single-page apps, <strong className="font-bold">without building an API.</strong>
                  </h1>
                  <p className="mt-8 text-lg lg:text-xl leading-relaxed max-w-md pr-2">
                    Inertia.js allows you to <strong className="font-bold" css={{ color: '#92eee2' }}>quickly build modern <span className="whitespace-no-wrap">single-page</span> React and Vue.js applications</strong> using classic server-side routing and controllers.
                  </p>
              </div>
              <div className="w-full lg:w-1/2 lg:pl-24 mt-8 lg:mt-0">
                <TabbedCodeExamples
                  className="rounded-t overflow-hidden"
                  height="320"
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
                      `
                    },
                    {
                      name: 'Users.vue',
                      language: 'html',
                      code: dedent`
                        <template>
                          <layout>
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
                      `
                    }
                  ]}
                />
              </div>
            </div>
          }
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-0 py-12 md:py-24 flex">
        <nav className="hidden md:block md:w-48 lg:w-64 flex-shrink-0 border-r">
          <div className="text-xs font-bold uppercase text-gray-500 tracking-widest">Getting started</div>
          <ul className="font-medium">
            <li className="mt-4"><Link href="/"><a className="hover:underline">Introduction</a></Link></li>
            <li className="mt-4"><Link href="/installation"><a className="hover:underline">Installation</a></Link></li>
            <li className="mt-4"><Link href="/server-side-setup"><a className="hover:underline">Server-side</a></Link></li>
            <li className="mt-4"><Link href="/client-side-setup"><a className="hover:underline">Client-side</a></Link></li>
            <li className="mt-4"><Link href="/code-splitting"><a className="hover:underline">Code splitting</a></Link></li>
          </ul>
          <div className="mt-12 text-xs font-bold uppercase text-gray-500 tracking-widest">Core concepts</div>
          <ul className="font-medium">
            <li className="mt-4"><Link href="/routing"><a className="hover:underline">Routing</a></Link></li>
            <li className="mt-4"><Link href="/pages"><a className="hover:underline">Pages</a></Link></li>
            <li className="mt-4"><Link href="/links"><a className="hover:underline">Links</a></Link></li>
            <li className="mt-4"><Link href="/forms"><a className="hover:underline">Forms</a></Link></li>
            <li className="mt-4"><Link href="/shared-data"><a className="hover:underline">Shared data</a></Link></li>
            <li className="mt-4"><Link href="/authorization"><a className="hover:underline">Authorization</a></Link></li>
          </ul>
          <div className="mt-12 text-xs font-bold uppercase text-gray-500 tracking-widest">Advanced</div>
          <ul className="font-medium">
          <li className="mt-4"><Link href="/asset-versioning"><a className="hover:underline">Asset versioning</a></Link></li>
            <li className="mt-4"><Link href="/local-state-caching"><a className="hover:underline">Local state caching</a></Link></li>
            <li className="mt-4"><Link href="/transforming-props"><a className="hover:underline">Transforming props</a></Link></li>
            <li className="mt-4"><Link href="/server-side-rendering"><a className="hover:underline">Server-side rendering</a></Link></li>
          </ul>
        </nav>
        <div className="flex-1 overflow-hidden md:pl-8 lg:pl-16 leading-relaxed text-lg">
          <MDXProvider components={components} children={children} />
        </div>
      </div>
    </div>
  )
}
