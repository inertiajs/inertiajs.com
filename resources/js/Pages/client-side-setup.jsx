import { A, Code, CodeBlock, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

const meta = {
  title: 'Client-side setup',
  links: [
    { url: '#laravel-starter-kits', name: 'Laravel starter kits' },
    { url: '#install-dependencies', name: 'Install dependencies' },
    { url: '#initialize-app', name: 'Initialize the Inertia app' },
    { url: '#code-splitting', name: 'Code splitting' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Client-side setup</H1>
      <P>
        Once you have your <A href="/server-side-setup">server-side framework configured</A>, you then need to setup
        your client-side framework. Inertia currently provides support for React, Vue, and Svelte.
      </P>
      <H2>Laravel starter kits</H2>
      <P>
        Laravel's <A href="https://laravel.com/docs/starter-kits">starter kits</A>, Breeze and Jetstream, provide
        out-of-the-box scaffolding for new Inertia applications. These starter kits are the absolute fastest way to
        start building a new Inertia project using Laravel and Vue or React. However, if you would like to manually
        install Inertia into your application, please consult the documentation below.
      </P>
      <H2>Install dependencies</H2>
      <P>First, install the Inertia client-side adapter corresponding to your framework of choice.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/vue2
            `,
          },
          {
            name: 'Vue 3',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/vue3
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/react
            `,
          },
          {
            name: 'Svelte',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/svelte
            `,
          },
        ]}
      />
      <H2>Initialize the Inertia app</H2>
      <P>
        Next, update your main JavaScript file to boot your Inertia app. To accomplish this, we'll initialize the
        client-side framework with the base Inertia component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import Vue from 'vue'
              import { createInertiaApp } from '@inertiajs/vue2'\n
              createInertiaApp({
                resolve: name => require(\`./Pages/\${name}\`),
                setup({ el, App, props, plugin }) {
                  Vue.use(plugin)\n
                  new Vue({
                    render: h => h(App, props),
                  }).$mount(el)
                },
              })
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import { createApp, h } from 'vue'
              import { createInertiaApp } from '@inertiajs/vue3'\n
              createInertiaApp({
                resolve: name => require(\`./Pages/\${name}\`),
                setup({ el, App, props, plugin }) {
                  createApp({ render: () => h(App, props) })
                    .use(plugin)
                    .mount(el)
                },
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { render } from 'react-dom'
              import { createInertiaApp } from '@inertiajs/react'\n
              createInertiaApp({
                resolve: name => require(\`./Pages/\${name}\`),
                setup({ el, App, props }) {
                  render(<App {...props} />, el)
                },
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/svelte'\n
              createInertiaApp({
                resolve: name => require(\`./Pages/\${name}.svelte\`),
                setup({ el, App, props }) {
                  new App({ target: el, props })
                },
              })
            `,
          },
        ]}
      />
      <P>
        Let's dig into this example a bit further. The <Code>resolve</Code> callback tells Inertia how to load a page
        component. As you can see, it receives a page name (string), and returns a page component module.
      </P>
      <P>
        By default, Inertia assumes that your application's root template has a root element with an <Code>id</Code> of{' '}
        <Code>app</Code>. If your application's root element has a different <Code>id</Code>, you can provide it using
        the <Code>id</Code> property.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          createInertiaApp({
            id: 'my-app',
            // ...
          })
        `}
      />
      <H2>Code splitting</H2>
      <P>
        Code splitting breaks apart the various pages of your application into smaller bundles, which are then loaded on
        demand when visiting new pages. This can significantly reduce the size of the initial JavaScript bundle loaded
        by the browser, improving the time to first render.
      </P>
      <Notice>
        While code splitting is helpful for very large projects, it does require extra requests when visiting new pages.
        Generally speaking, if you're able to use a single bundle, your app is going to feel snappier.
      </Notice>
      <P>
        To use code splitting with Inertia, you will first need to enable{' '}
        <A href="https://github.com/tc39/proposal-dynamic-import">dynamic imports</A> via a Babel plugin. Let's install
        it now.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install @babel/plugin-syntax-dynamic-import
        `}
      />
      <P>
        Next, create a <Code>.babelrc</Code> file in your project with the following configuration:
      </P>
      <CodeBlock
        language="json"
        children={dedent`
          {
            "plugins": ["@babel/plugin-syntax-dynamic-import"]
          }
        `}
      />
      <Notice>
        If you're using Laravel Mix, the dynamic imports Babel plugin is already configured. However, we recommend using
        Laravel Mix 6 or above, as there are known issues with older versions.
      </Notice>
      <P>
        Finally, update the <Code>resolve</Code> callback in your app's initialization code to use <Code>import</Code>{' '}
        instead of <Code>require</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              resolve: name => import(\`./Pages/\${name}\`),
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              resolve: name => import(\`./Pages/\${name}\`),
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              resolve: name => import(\`./Pages/\${name}\`),
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              resolve: name => import(\`./Pages/\${name}.svelte\`),
            `,
          },
        ]}
      />
      <P>
        You should also consider using cache busting to force browsers to load the latest version of your assets. To
        accomplish this, add the following configuration to your webpack configuration file.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          output: {
            chunkFilename: 'js/[name].js?id=[chunkhash]',
          }
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
