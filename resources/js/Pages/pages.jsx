import { A, Code, CodeBlock, H1, H2, P, React, Svelte, TabbedCode, Vue } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Pages',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#creating-pages', name: 'Creating pages' },
    { url: '#creating-layouts', name: 'Creating layouts' },
    { url: '#persistent-layouts', name: 'Persistent layouts' },
    { url: '#default-layouts', name: 'Default layouts' },
  ],
}

export default function () {
  return (
    <>
      <H1>Pages</H1>
      <P>
        When building applications using Inertia, each page in your application typically has its own controller / route
        and a corresponding JavaScript component. This allows you to retrieve just the data necessary for that page - no
        API required.
      </P>
      <P>
        In addition, all of the data needed for the page can be retrieved before the page is ever rendered by the
        browser, eliminating the need for displaying "loading" states when users visit your application.
      </P>
      <H2>Creating pages</H2>
      <P>
        Inertia pages are simply JavaScript components. If you have ever written a Vue, React, or Svelte component, you
        will feel right at home. As you can see in the example below, pages receive data from your application's
        controllers as props.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import Layout from './Layout'
              import { Head } from '@inertiajs/vue3'

              defineProps({ user: Object })
              </script>

              <template>
                <Layout>
                  <Head title="Welcome" />
                  <h1>Welcome</h1>
                  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
                </Layout>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import Layout from './Layout'
              import { Head } from '@inertiajs/react'

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
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <script>
                import Layout from './Layout.svelte'

                export let user
              </script>

              <svelte:head>
                <title>Welcome</title>
              </svelte:head>

              <Layout>
                <h1>Welcome</h1>
                <p>Hello {user.name}, welcome to your first Inertia app!</p>
              </Layout>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'html',
            code: dedent`
              <script>
                import Layout from './Layout.svelte'

                let { user } = $props()
              </script>

              <svelte:head>
                <title>Welcome</title>
              </svelte:head>

              <Layout>
                <h1>Welcome</h1>
                <p>Hello {user.name}, welcome to your first Inertia app!</p>
              </Layout>
            `,
          },
        ]}
      />
      <P>
        Given the page above, you can render the page by returning an <A href="/responses">Inertia response</A> from a
        controller or route. In this example, let's assume this page is stored at{' '}
        <Vue>
          <Code>resources/js/Pages/User/Show.vue</Code>
        </Vue>
        <React>
          <Code>resources/js/Pages/User/Show.jsx</Code>
        </React>
        <Svelte>
          <Code>resources/js/Pages/User/Show.svelte</Code>
        </Svelte>{' '}
        within a Laravel application.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Inertia\\Inertia;

              class UserController extends Controller
              {
                  public function show(User $user)
                  {
                      return Inertia::render('User/Show', [
                        'user' => $user
                      ]);
                  }
              }
            `,
          },
        ]}
      />
      <H2>Creating layouts</H2>
      <P>
        While not required, for most projects it makes sense to create a site layout that all of your pages can extend.
        You may have noticed in our page example above that we're wrapping the page content within a{' '}
        <Code>{`<Layout>`}</Code> component. Here's an example of such a component:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { Link } from '@inertiajs/vue3'
              </script>

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
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

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
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <script>
                import { inertia } from '@inertiajs/svelte'
              </script>

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
          {
            name: 'Svelte 5',
            language: 'html',
            code: dedent`
              <script>
                import { inertia } from '@inertiajs/svelte'

                let { children } = $props()
              </script>

              <main>
                <header>
                  <a use:inertia href="/">Home</a>
                  <a use:inertia href="/about">About</a>
                  <a use:inertia href="/contact">Contact</a>
                </header>
                <article>
                  {@render children()}
                </article>
              </main>
            `,
          },
        ]}
      />
      <P>
        As you can see, there is nothing Inertia specific within this template. This is just a typical <Vue>Vue</Vue>
        <React>React</React>
        <Svelte>Svelte</Svelte> component.
      </P>
      <H2>Persistent layouts</H2>
      <P>
        While it's simple to implement layouts as children of page components, it forces the layout instance to be
        destroyed and recreated between visits. This means you cannot have persistent layout state when navigating
        between pages.
      </P>
      <P>
        For example, maybe you have an audio player on a podcast website that you want to continue playing as users
        navigate the site. Or, maybe you simply want to maintain the scroll position in your sidebar navigation between
        page visits. In these situations, the solution is to leverage Inertia's persistent layouts.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script>
              import Layout from './Layout'

              export default {
                // Using a render function...
                layout: (h, page) => h(Layout, [page]),

                // Using shorthand syntax...
                layout: Layout,
              }
              </script>

              <script setup>
              defineProps({ user: Object })
              </script>

              <template>
                <h1>Welcome</h1>
                <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import Layout from './Layout'

              const Home = ({ user }) => {
                return (
                  <>
                    <H1>Welcome</H1>
                    <p>Hello {user.name}, welcome to your first Inertia app!</p>
                  </>
                )
              }

              Home.layout = page => <Layout children={page} title="Welcome" />

              export default Home
            `,
          },
          {
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <script context="module">
                export { default as layout } from './Layout.svelte'
              </script>

              <script>
                export let user
              </script>

              <h1>Welcome</h1>
              <p>Hello {user.name}, welcome to your first Inertia app!</p>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'html',
            code: dedent`
              <script module>
                export { default as layout } from './Layout.svelte'
              </script>

              <script>
                let { user } = $props()
              </script>

              <h1>Welcome</h1>
              <p>Hello {user.name}, welcome to your first Inertia app!</p>
            `,
          },
        ]}
      />
      <P>You can also create more complex layout arrangements using nested layouts.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script>
              import SiteLayout from './SiteLayout'
              import NestedLayout from './NestedLayout'

              export default {
                // Using a render function...
                layout: (h, page) => {
                  return h(SiteLayout, () => h(NestedLayout, () => page))
                },

                // Using the shorthand...
                layout: [SiteLayout, NestedLayout],
              }
              </script>

              <script setup>
              defineProps({ user: Object })
              </script>

              <template>
                <h1>Welcome</h1>
                <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import SiteLayout from './SiteLayout'
              import NestedLayout from './NestedLayout'

              const Home = ({ user }) => {
                return (
                  <>
                    <H1>Welcome</H1>
                    <p>Hello {user.name}, welcome to your first Inertia app!</p>
                  </>
                )
              }

              Home.layout = page => (
                <SiteLayout title="Welcome">
                  <NestedLayout children={page} />
                </SiteLayout>
              )

              export default Home
            `,
          },
          {
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <script context="module">
                import SiteLayout from './SiteLayout.svelte'
                import NestedLayout from './NestedLayout.svelte'

                // Using a render function...
                export const layout = (h, page) => {
                  return h(SiteLayout, [h(NestedLayout, [page])])
                }

                // Using the shorthand...
                export const layout = [SiteLayout, NestedLayout]
              </script>

              <script>
                export let user
              </script>

              <h1>Welcome</h1>
              <p>Hello {user.name}, welcome to your first Inertia app!</p>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'html',
            code: dedent`
              <script module>
                import SiteLayout from './SiteLayout.svelte'
                import NestedLayout from './NestedLayout.svelte'

                // Using a render function...
                export const layout = (h, page) => {
                  return h(SiteLayout, [h(NestedLayout, [page])])
                }

                // Using the shorthand...
                export const layout = [SiteLayout, NestedLayout]
              </script>

              <script>
                let { user } = $props()
              </script>

              <h1>Welcome</h1>
              <p>Hello {user.name}, welcome to your first Inertia app!</p>
            `,
          },
        ]}
      />
      <Vue>
        <P>
          If you're using Vue 3.3+, you can alternatively use{' '}
          <A href="https://vuejs.org/api/sfc-script-setup.html#defineoptions">defineOptions</A> to define a layout
          within <Code>{'<script setup>'}</Code>. Older versions of Vue can use the
          <A href="https://vue-macros.sxzz.moe/macros/define-options.html">defineOptions plugin</A>:
        </P>
        <CodeBlock
          language="markup"
          children={dedent`
            <script setup>
            import Layout from './Layout'

            defineOptions({ layout: Layout })
            </script>
          `}
        />
      </Vue>
      <H2>Default layouts</H2>
      <P>
        If you're using persistent layouts, you may find it convenient to define the default page layout in the{' '}
        <Code>resolve()</Code> callback of your application's main JavaScript file.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import Layout from './Layout'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
                  let page = pages[\`./Pages/\${name}.vue\`]
                  page.default.layout = page.default.layout || Layout
                  return page
                },
                // ...
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import Layout from './Layout'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
                  let page = pages[\`./Pages/\${name}.jsx\`]
                  page.default.layout = page.default.layout || (page => <Layout children={page} />)
                  return page
                },
                // ...
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import Layout from './Layout'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                  let page = pages[\`./Pages/\${name}.svelte\`]
                  return { default: page.default, layout: page.layout || Layout }
                },
                // ...
              })
            `,
          },
        ]}
      />
      <P>
        This will automatically set the page layout to <Code>Layout</Code> if a layout has not already been set for that
        page.
      </P>
      <P>
        You can even go a step further and conditionally set the default page layout based on the page <Code>name</Code>
        , which is available to the <Code>resolve()</Code> callback. For example, maybe you don't want the default
        layout to be applied to your public pages.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import Layout from './Layout'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
                  let page = pages[\`./Pages/\${name}.vue\`]
                  page.default.layout = name.startsWith('Public/') ? undefined : Layout
                  return page
                },
                // ...
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import Layout from './Layout'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
                  let page = pages[\`./Pages/\${name}.jsx\`]
                  page.default.layout = name.startsWith('Public/') ? undefined : page => <Layout children={page} />
                  return page
                },
                // ...
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import Layout from './Layout'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                  let page = pages[\`./Pages/\${name}.svelte\`]
                  return { default: page.default, layout: name.startsWith('Public/') ? undefined : Layout }
                },
                // ...
              })
            `,
          },
        ]}
      />
    </>
  )
}
