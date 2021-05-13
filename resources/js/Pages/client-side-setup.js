import dedent from 'dedent-js'
import A from '../Components/A'
import P from '../Components/P'
import H1 from '../Components/H1'
import H2 from '../Components/H2'
import Code from '../Components/Code'
import Layout from '../Components/Layout'
import Notice from '../Components/Notice'
import InlineCode from '../Components/InlineCode'
import TabbedCode from '../Components/TabbedCode'

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
        client-side framework with the base Inertia page component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import { App, plugin } from '@inertiajs/inertia-vue'
              import Vue from 'vue'\n
              Vue.use(plugin)\n
              const el = document.getElementById('app')\n
              new Vue({
                render: h => h(App, {
                  props: {
                    initialPage: JSON.parse(el.dataset.page),
                    resolveComponent: name => require(\`./Pages/\${name}\`).default,
                  },
                }),
              }).$mount(el)
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import { createApp, h } from 'vue'
              import { App, plugin } from '@inertiajs/inertia-vue3'\n
              const el = document.getElementById('app')\n
              createApp({
                render: () => h(App, {
                  initialPage: JSON.parse(el.dataset.page),
                  resolveComponent: name => require(\`./Pages/\${name}\`).default,
                })
              }).use(plugin).mount(el)\n\n
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { App } from '@inertiajs/inertia-react'
              import React from 'react'
              import { render } from 'react-dom'\n
              const el = document.getElementById('app')\n
              render(
                <App
                  initialPage={JSON.parse(el.dataset.page)}
                  resolveComponent={name => require(\`./Pages/\${name}\`).default}
                />,
                el
              )
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { App } from '@inertiajs/inertia-svelte'\n
              const el = document.getElementById('app')\n
              new App({
                target: el,
                props: {
                  initialPage: JSON.parse(el.dataset.page),
                  resolveComponent: name => require(\`./Pages/\${name}.svelte\`),
                },
              })
            `,
          },
        ]}
      />
      <P>
        The <InlineCode>resolveComponent</InlineCode> is a callback that tells Inertia how to load a page component. It
        receives a page name (string), and should return a page component instance.
      </P>
      <H2>Progress indicator</H2>
      <P>
        Since Inertia requests are made via XHR, there's no default browser loading indicator when navigating from one
        page to another. To solve this, Inertia provides an optional{' '}
        <A href="https://github.com/inertiajs/progress">progress</A> library, which shows a loading bar whenever you
        make an Inertia visit.
      </P>
      <P>To use it, start by installing it:</P>
      <Code
        language="bash"
        code={dedent`
          npm install @inertiajs/progress
          yarn add @inertiajs/progress
        `}
      />
      <P>Once it's been installed, initialize it in your app.</P>
      <Code
        language="js"
        code={dedent`
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
        To use code splitting with Inertia you'll need to enable{' '}
        <A href="https://github.com/tc39/proposal-dynamic-import">dynamic imports</A>. You'll need a Babel plugin to
        make this work. First, install the plugin:
      </P>
      <Code
        language="bash"
        code={dedent`
          npm install @babel/plugin-syntax-dynamic-import
          yarn add @babel/plugin-syntax-dynamic-import
        `}
      />
      <P>
        Next, create a <InlineCode>.babelrc</InlineCode> file in your project with the following:
      </P>
      <Code
        language="json"
        code={dedent`
          {
            "plugins": ["@babel/plugin-syntax-dynamic-import"]
          }
        `}
      />
      <Notice>
        If you're using Laravel Mix 4, the dynamic imports Babel plugin is already configured. However, there is a known
        issue with Laravel Mix 4 when using dynamic imports where you cannot use styles within Vue files due to a
        Webpack <a href="https://github.com/JeffreyWay/laravel-mix/issues/1856#issuecomment-448082909">limitation</a>.
        As a workaround, you need to drop Mix entirely or upgrade to Laravel Mix 6.
      </Notice>
      <P>
        Finally, update the <InlineCode>resolveComponent</InlineCode> callback in your app initialization to use{' '}
        <InlineCode>import</InlineCode> instead of <InlineCode>require</InlineCode>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              resolveComponent: name => import(\`./Pages/\${name}\`).then(module => module.default),
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              resolveComponent: name => import(\`./Pages/\${name}\`).then(module => module.default),
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              resolveComponent={name => import(\`./Pages/\${name}\`).then(module => module.default)}
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              resolveComponent: name => import(\`./Pages/\${name}.svelte\`),
            `,
          },
        ]}
      />
      <P>
        Consider using cache busting to force browsers to load the latest version of your assets. To do this, add the
        following to your webpack config:
      </P>
      <Code
        language="js"
        code={dedent`
          output: {
            chunkFilename: 'js/[name].js?id=[chunkhash]',
          }
        `}
      />
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
