import dedent from 'dedent-js'
import A from '../Components/A'
import P from '../Components/P'
import H1 from '../Components/H1'
import H2 from '../Components/H2'
import Code from '../Components/Code'
import Layout from '../Components/Layout'
import InlineCode from '../Components/InlineCode'
import TabbedCode from '../Components/TabbedCode'

const meta = {
  title: 'Pages',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#creating-pages', name: 'Creating pages' },
    { url: '#creating-layouts', name: 'Creating layouts' },
    { url: '#persistent-layouts', name: 'Persistent layouts' },
    { url: '#default-layouts', name: 'Default layouts' },
    { url: '#title-and-meta-tags', name: 'Title and meta tags' },
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
                <layout title="Welcome">
                  <H1>Welcome</H1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </layout>
              </template>\n
              <script>
                import Layout from './Layout'\n
                export default {
                  components: {
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
                <layout title="Welcome">
                  <H1>Welcome</H1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </layout>
              </template>\n
              <script>
                import Layout from './Layout'\n
                export default {
                  components: {
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
              import Layout from './Layout'\n
              export default function Welcome({ user }) {
                return (
                  <Layout title="Welcome">
                    <H1>Welcome</H1>
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
              <Layout title="Welcome">
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
        in our page example above that we're wrapping the page content within a <InlineCode>{`<layout>`}</InlineCode>{' '}
        component. Here's an example of such a component. There is nothing Inertia specific here. This is just a
        standard JavaScript component.
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
                    <inertia-link href="/">Home</inertia-link>
                    <inertia-link href="/about">About</inertia-link>
                    <inertia-link href="/contact">Contact</inertia-link>
                  </header>
                  <article>
                    <slot />
                  </article>
                </main>
              </template>\n
              <script>
                export default {
                  props: {
                    title: String,
                  },
                  watch: {
                    title: {
                      immediate: true,
                      handler(title) {
                        document.title = title
                      },
                    },
                  },
                }
              </script>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <template>
                <main>
                  <header>
                    <inertia-link href="/">Home</inertia-link>
                    <inertia-link href="/about">About</inertia-link>
                    <inertia-link href="/contact">Contact</inertia-link>
                  </header>
                  <article>
                    <slot />
                  </article>
                </main>
              </template>\n
              <script>
                export default {
                  props: {
                    title: String,
                  },
                  watch: {
                    title: {
                      immediate: true,
                      handler(title) {
                        document.title = title
                      },
                    },
                  },
                }
              </script>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import React, { useEffect } from 'react'
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              export default function Layout({ title, children }) {
                useEffect(() => {
                  document.title = title;
                }, [title])\n
                return (
                  <main>
                    <header>
                      <InertiaLink href="/">Home</InertiaLink>
                      <InertiaLink href="/about">About</InertiaLink>
                      <InertiaLink href="/contact">Contact</InertiaLink>
                    </header>\n
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
                import { inertia } from '@inertiajs/inertia-svelte'\n
                export let title
              </script>\n
              <svelte:head>
                  <title>{title}</title>
              </svelte:head>\n
              <main>
                <header>
                  <a use:inertia href="/">Home</a>
                  <a use:inertia href="/about">About</a>
                  <a use:inertia href="/contact">Contact</a>
                </header>\n
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
                    return h(Layout, () => h(GreenLayout, () => page))
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
        If you're using persistent layouts, it's possible to set a default page layout in the{' '}
        <InlineCode>resolveComponent()</InlineCode> callback.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import Layout from './Layout'\n
              resolveComponent: name => import(\`./Pages/\${name}\`)
                .then(({ default: page }) => {
                  if (page.layout === undefined) {
                    page.layout = Layout
                  }
                  return page
                }),
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import Layout from './Layout'\n
              resolveComponent: name => import(\`./Pages/\${name}\`)
                .then(({ default: page }) => {
                  if (page.layout === undefined) {
                    page.layout = Layout
                  }
                  return page
                }),
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import Layout from './Layout'\n
              resolveComponent: name => import(\`./Pages/\${name}\`)
                .then(({ default: page }) => {
                  if (page.layout === undefined) {
                    page.layout = Layout
                  }
                  return page
                }),
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import Layout from './Layout'\n
              resolveComponent: name => import(\`./Pages/\${name}\`)
                .then(page => {
                  if (page.layout === undefined) {
                    page.layout = Layout
                  }
                  return page
                }),
            `,
          },
        ]}
      />
      <P>
        This will automatically set the page layout to <InlineCode>Layout</InlineCode> if a layout has not already been
        set for that page. If needed, you can disable the default layout on specific pages by setting the{' '}
        <InlineCode>layout</InlineCode> to <InlineCode>null</InlineCode>.
      </P>
      <P>
        You can even go a step further and conditionally set the default page layout based on the page{' '}
        <InlineCode>name</InlineCode>, which is available to the <InlineCode>resolveComponent()</InlineCode> method. For
        example, maybe you don't want the default layout applied to your public pages.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import Layout from './Layout'\n
              resolveComponent: name => import(\`./Pages/\${name}\`)
                .then(({ default: page }) => {
                  if (page.layout === undefined && !name.startsWith('Public/')) {
                    page.layout = Layout
                  }
                  return page
                }),
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import Layout from './Layout'\n
              resolveComponent: name => import(\`./Pages/\${name}\`)
                .then(({ default: page }) => {
                  if (page.layout === undefined && !name.startsWith('Public/')) {
                    page.layout = Layout
                  }
                  return page
                }),
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import Layout from './Layout'\n
              resolveComponent: name => import(\`./Pages/\${name}\`)
                .then(({ default: page }) => {
                  if (page.layout === undefined && !name.startsWith('Public/')) {
                    page.layout = Layout
                  }
                  return page
                }),
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import Layout from './Layout'\n
              resolveComponent: name => import(\`./Pages/\${name}\`)
                .then(page => {
                  if (page.layout === undefined && !name.startsWith('Public/')) {
                    page.layout = Layout
                  }
                  return page
                }),
            `,
          },
        ]}
      />
      <H2>Title and meta tags</H2>
      <P>
        While it's possible to pass title and meta tag props from pages to layouts (as illustrated above), it's often
        easier to manage this using a document head library like <A href="https://github.com/nuxt/vue-meta">Vue Meta</A>{' '}
        or <A href="https://github.com/nfl/react-helmet">React Helmet</A>. Svelte has built-in support for manipulating
        the document head with the <InlineCode>{`<svelte:head>`}</InlineCode> element.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <template>
                <layout>
                  <H1>Welcome</H1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </layout>
              </template>\n
              <script>
                import Layout from './Layout'\n
                export default {
                  metaInfo() {
                    return {
                      title: \`Welcome \${this.user.name}\`,
                    }
                  },
                  components: {
                    Layout,
                  },
                  props: {
                    user: Object,
                  },
                }
              </script>
            `,
            description: "Don't forget to install and configure the Vue Meta package.",
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <template>
                <layout>
                  <H1>Welcome</H1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </layout>
              </template>\n
              <script>
                import Layout from './Layout'\n
                export default {
                  metaInfo() {
                    return {
                      title: \`Welcome \${this.user.name}\`,
                    }
                  },
                  components: {
                    Layout,
                  },
                  props: {
                    user: Object,
                  },
                }
              </script>
            `,
            description: "Don't forget to install and configure the Vue Meta package.",
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import React from 'react'
              import Layout from './Layout'
              import {Helmet} from "react-helmet"\n
              export default function Welcome({ user }) {
                return (
                  <Layout>
                    <Helmet>
                      <title>Welcome {user.name}</title>
                    </Helmet>
                    <H1>Welcome</H1>
                    <p>Hello {user.name}, welcome to your first Inertia app!</p>
                  </Layout>
                )
              }
            `,
            description: "Don't forget to install and configure the React Helmet package.",
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
              <svelte:head>
                  <title>Welcome {user.name}</title>
              </svelte:head>\n
              <H1>Welcome</H1>
              <p>Hello {user.name}, welcome to your first Inertia app!</p>
            `,
          },
        ]}
      />
      <P>
        If you're using Vue 3, you can alternatively use the{' '}
        <A href="https://v3.vuejs.org/guide/teleport.html">teleport</A> feature for this:
      </P>
      <Code
        language="twig"
        code={dedent`
          <template>
            <teleport to="head">
              <title>Welcome {{ user.name }}</title>
            </teleport>
          </template>
        `}
      />
      <P>
        Further, if it's critical for your application to set the page title and meta tags server-side, you can use{' '}
        <A href="/responses#root-template-data">root template data</A> to accomplish this.
      </P>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
