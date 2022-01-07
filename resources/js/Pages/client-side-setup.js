import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Client-side setup',
  links: [
    { url: '#install-dependencies', name: 'Install dependencies' },
    { url: '#initialize-app', name: 'Initialize app' },
    { url: '#progress-indicator', name: 'Progress indicator' },
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
      <H2>Install dependencies</H2>
      <P>Install the Inertia client-side adapters using NPM or Yarn.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/inertia @inertiajs/inertia-vue
              yarn add @inertiajs/inertia @inertiajs/inertia-vue
            `,
          },
          {
            name: 'Vue 3',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/inertia @inertiajs/inertia-vue3
              yarn add @inertiajs/inertia @inertiajs/inertia-vue3
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/inertia @inertiajs/inertia-react
              yarn add @inertiajs/inertia @inertiajs/inertia-react
            `,
          },
          {
            name: 'Svelte',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/inertia @inertiajs/inertia-svelte
              yarn add @inertiajs/inertia @inertiajs/inertia-svelte
            `,
          },
        ]}
      />
      <H2>Initialize app</H2>
      <P>
        Next, update your main JavaScript file to boot your Inertia app. All we're doing here is initializing the
        client-side framework with the base Inertia component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import Vue from 'vue'
              import { createInertiaApp } from '@inertiajs/inertia-vue'\n
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
              import { createInertiaApp } from '@inertiajs/inertia-vue3'\n
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
              import React from 'react'
              import { render } from 'react-dom'
              import { createInertiaApp } from '@inertiajs/inertia-react'\n
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
              import { createInertiaApp } from '@inertiajs/inertia-svelte'\n
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
        The <Code>resolve</Code> callback tells Inertia how to load a page component. It receives a page name (string),
        and should return a page component module.
      </P>
      <P>
        By default, Inertia assumes that you have a root element with an <Code>id</Code> of <Code>app</Code>. If
        different, you can change this using the <Code>id</Code> property.
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
      <H2>Progress indicator</H2>
      <P>
        Since Inertia requests are made via XHR, there's no default browser loading indicator when navigating from one
        page to another. To solve this, Inertia provides an optional{' '}
        <A href="https://github.com/inertiajs/progress">progress</A> library, which shows a loading bar whenever you
        make an Inertia visit.
      </P>
      <P>To use it, start by installing it:</P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install @inertiajs/progress
          yarn add @inertiajs/progress
        `}
      />
      <P>Once it's been installed, initialize it in your app.</P>
      <CodeBlock
        language="js"
        children={dedent`
          import { InertiaProgress } from '@inertiajs/progress'\n
          InertiaProgress.init()
        `}
      />
      <P>
        It also provides a number of customization options, which you can learn more about on the{' '}
        <A href="/progress-indicators">progress indicators</A> page.
      </P>
      <H2>Code splitting</H2>
      <P>
        Code splitting breaks apart the various pages of your application into smaller bundles, which are then loaded on
        demand when visiting new pages. This can significantly reduce the size of the initial JavaScript bundle,
        improving the time to first render.
      </P>
      <Notice>
        While code splitting is helpful for very large projects, it does require extra requests when visiting new pages.
        Generally speaking, if you're able to use a single bundle, your app is going to feel snappier.
      </Notice>
      <P>
        To use code splitting with Inertia you'll need to enable{' '}
        <A href="https://github.com/tc39/proposal-dynamic-import">dynamic imports</A>. You'll need a Babel plugin to
        make this work. First, install the plugin:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install @babel/plugin-syntax-dynamic-import
          yarn add @babel/plugin-syntax-dynamic-import
        `}
      />
      <P>
        Next, create a <Code>.babelrc</Code> file in your project with the following:
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
        Laravel Mix 6, as there are known issues with older versions.
      </Notice>
      <P>
        Finally, update the <Code>resolve</Code> callback in your app initialization to use <Code>import</Code> instead
        of <Code>require</Code>.
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
        Consider using cache busting to force browsers to load the latest version of your assets. To do this, add the
        following to your webpack config:
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
