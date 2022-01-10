import React from 'react'
import dedent from 'dedent-js'
import { Code, CodeBlock, H1, H2, Layout, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Pages',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#creating-pages', name: 'Creating pages' },
    { url: '#creating-layouts', name: 'Creating layouts' },
    { url: '#persistent-layouts', name: 'Persistent layouts' },
    { url: '#default-layouts', name: 'Default layouts' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Pages</H1>
      <P>
        With Inertia, each page in your application has its own controller and corresponding JavaScript component. This
        allows you to retrieve just the data necessary for that page, no API required.
      </P>
      <H2>Creating pages</H2>
      <P>
        Pages are simply JavaScript components. There is nothing particularly special about them. Pages receive data
        from the controllers as props. Here's an example of a simple page component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <template>
                <Layout>
                  <Head title="Welcome" />
                  <h1>Welcome</h1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </Layout>
              </template>\n
              <script>
                import Layout from './Layout'
                import { Head } from '@inertiajs/inertia-vue'\n
                export default {
                  components: {
                    Head,
                    Layout,
                  },
                  props: {
                    user: Object,
                  },
                }
              </script>
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <template>
                <Layout>
                  <Head title="Welcome" />
                  <h1>Welcome</h1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </Layout>
              </template>\n
              <script>
                import Layout from './Layout'
                import { Head } from '@inertiajs/inertia-vue3'\n
                export default {
                  components: {
                    Head,
                    Layout,
                  },
                  props: {
                    user: Object,
                  },
                }
              </script>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import React from 'react'
              import Layout from './Layout'
              import { Head } from '@inertiajs/inertia-react'\n
              export default function Welcome({ user }) {
                return (
                  <Layout>
                    <Head title="Welcome" />
                    <h1>Welcome</h1>
                    <p>Hello {user.name}, welcome to your first Inertia app!</p>
                  </Layout>
                )
              }
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script>
                import Layout from './Layout.svelte'\n
                export let user
              </script>\n
              <Layout>
                <svelte:head>
                  <title>Welcome</title>
                </svelte:head>
                <H1>Welcome</H1>
                <p>Hello {user.name}, welcome to your first Inertia app!</p>
              </Layout>
            `,
          },
        ]}
      />
      <H2>Creating layouts</H2>
      <P>
        While not required, for most projects it makes sense to create a site layout that your pages can extend. Notice
        in our page example above that we're wrapping the page content within a <Code>{`<layout>`}</Code> component.
        Here's an example of such a component. There is nothing Inertia specific here. This is just a standard
        JavaScript component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <template>
                <main>
                  <header>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                  </header>
                  <article>
                    <slot />
                  </article>
                </main>
              </template>\n
              <script>
              import { Link } from '@inertiajs/inertia-vue'\n
              export default {
                components: {
                  Link,
                }
              }
              </script>
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <template>
                <main>
                  <header>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                  </header>
                  <article>
                    <slot />
                  </article>
                </main>
              </template>\n
              <script>
              import { Link } from '@inertiajs/inertia-vue3'\n
              export default {
                components: {
                  Link,
                }
              }
              </script>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import React, { useEffect } from 'react'
              import { Link } from '@inertiajs/inertia-react'\n
              export default function Layout({ children }) {
                return (
                  <main>
                    <header>
                      <Link href="/">Home</Link>
                      <Link href="/about">About</Link>
                      <Link href="/contact">Contact</Link>
                    </header>
                    <article>{children}</article>
                  </main>
                )
              }
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script>
                import { inertia } from '@inertiajs/inertia-svelte'
              </script>\n
              <main>
                <header>
                  <a use:inertia href="/">Home</a>
                  <a use:inertia href="/about">About</a>
                  <a use:inertia href="/contact">Contact</a>
                </header>
                <article>
                  <slot />
                </article>
              </main>
            `,
          },
        ]}
      />
      <H2>Persistent layouts</H2>
      <P>
        While it's simple to implement layouts as children of the page components, it does force the layout instance to
        be destroyed and recreated between visits. This means you cannot have persistent layout state when navigating
        between pages.
      </P>
      <P>
        For example, maybe you have an audio player on a podcast website that you want to continue playing as users
        navigate the site. Or, maybe you simply want to maintain the scroll position in your navigation between page
        visits. In these situations, using the persistent layouts feature in Inertia is a better choice.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <template>
                <div>
                  <H1>Welcome</H1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </div>
              </template>\n
              <script>
                import Layout from './Layout'\n
                export default {
                  // Using a render function
                  layout: (h, page) => h(Layout, [page]),\n
                  // Using the shorthand
                  layout: Layout,\n
                  props: {
                    user: Object,
                  },
                }
              </script>
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <template>
                <div>
                  <H1>Welcome</H1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </div>
              </template>\n
              <script>
                import Layout from './Layout'\n
                export default {
                  // Using a render function
                  layout: (h, page) => h(Layout, () => child),\n
                  // Using the shorthand
                  layout: Layout,\n
                  props: {
                    user: Object,
                  },
                }
              </script>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import React from 'react'
              import Layout from './Layout'\n
              const Home = ({ user }) => {
                return (
                  <>
                    <H1>Welcome</H1>
                    <p>Hello {user.name}, welcome to your first Inertia app!</p>
                  </>
                )
              }\n
              Home.layout = page => <Layout children={page} title="Welcome" />\n
              export default Home
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script context="module">
                import Layout from './Layout.svelte'
                export const layout = Layout
              </script>\n
              <script>
                export let user
              </script>\n
              <H1>Welcome</H1>
              <p>Hello {user.name}, welcome to your first Inertia app!</p>
            `,
          },
        ]}
      />
      <P>You can also create more complex layout arrangements using nested layouts.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <template>
                <div>
                  <H1>Welcome</H1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </div>
              </template>\n
              <script>
                import SiteLayout from './SiteLayout'
                import NestedLayout from './NestedLayout'\n
                export default {
                  // Using a render function
                  layout: (h, page) => {
                    return h(SiteLayout, [
                      h(NestedLayout, [page]),
                    ])
                  },\n
                  // Using the shorthand
                  layout: [SiteLayout, NestedLayout],\n
                  props: {
                    user: Object,
                  },
                }
              </script>
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <template>
                <div>
                  <H1>Welcome</H1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </div>
              </template>\n
              <script>
                import SiteLayout from './SiteLayout'
                import NestedLayout from './NestedLayout'\n
                export default {
                  // Using a render function
                  layout: (h, page) => {
                    return h(SiteLayout, () => h(NestedLayout, () => page))
                  },\n
                  // Using the shorthand
                  layout: [SiteLayout, NestedLayout],\n
                  props: {
                    user: Object,
                  },
                }
              </script>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import React from 'react'
              import SiteLayout from './SiteLayout'
              import NestedLayout from './NestedLayout'\n
              const Home = ({ user }) => {
                return (
                  <>
                    <H1>Welcome</H1>
                    <p>Hello {user.name}, welcome to your first Inertia app!</p>
                  </>
                )
              }\n
              Home.layout = page => (
                <SiteLayout title="Welcome">
                  <NestedLayout children={page} />
                </SiteLayout>
              )\n
              export default Home
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script context="module">
                import SiteLayout from './SiteLayout.svelte'
                import NestedLayout from './NestedLayout.svelte'
                export const layout = [SiteLayout, NestedLayout]
              </script>\n
              <script>
                export let user
              </script>\n
              <H1>Welcome</H1>
              <p>Hello {user.name}, welcome to your first Inertia app!</p>
            `,
          },
        ]}
      />
      <H2>Default layouts</H2>
      <P>
        If you're using persistent layouts, it's possible to set a default page layout in the <Code>resolve</Code>{' '}
        callback.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import Layout from './Layout'\n
          createInertiaApp({
            resolve: name => {
              const page = require(\`./Pages/\${name}\`).default
              page.layout = page.layout || Layout
              return page
            },
            // ...
          })
        `}
      />
      <P>
        This will automatically set the page layout to <Code>Layout</Code> if a layout has not already been set for that
        page. If needed, you can disable the default layout on specific pages by setting the <Code>layout</Code> to{' '}
        <Code>null</Code>.
      </P>
      <P>
        You can even go a step further and conditionally set the default page layout based on the page <Code>name</Code>
        , which is available to the <Code>resolve()</Code> method. For example, maybe you don't want the default layout
        applied to your public pages.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import Layout from './Layout'\n
          createInertiaApp({
            resolve: name => {
              const page = require(\`./Pages/\${name}\`).default
              if (page.layout === undefined && !name.startsWith('Public/')) {
                page.layout = Layout
              }
              return page
            },
            // ...
          })
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
