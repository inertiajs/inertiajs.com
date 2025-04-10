import { A, Code, CodeBlock, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Client-side setup',
  links: [
    { url: '#laravel-starter-kits', name: 'Laravel starter kits' },
    { url: '#install-dependencies', name: 'Install dependencies' },
    { url: '#initialize-the-inertia-app', name: 'Initialize the Inertia app' },
    { url: '#resolving-components', name: 'Resolving components' },
    { url: '#defining-a-root-element', name: 'Defining a root element' },
  ],
}

export default function () {
  return (
    <>
      <H1>Client-side setup</H1>
      <P>
        Once you have your <A href="/server-side-setup">server-side framework configured</A>, you then need to setup
        your client-side framework. Inertia currently provides support for React, Vue, and Svelte.
      </P>
      <H2>Laravel starter kits</H2>
      <P>
        Laravel's <A href="https://laravel.com/starter-kits">starter kits</A> provide
        out-of-the-box scaffolding for new Inertia applications. These starter kits are the absolute fastest way to
        start building a new Inertia project using Laravel and Vue or React. However, if you would like to manually
        install Inertia into your application, please consult the documentation below.
      </P>
      <H2>Install dependencies</H2>
      <P>First, install the Inertia client-side adapter corresponding to your framework of choice.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
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
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { createApp, h } from 'vue'
              import { createInertiaApp } from '@inertiajs/vue3'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
                  return pages[\`./Pages/\${name}.vue\`]
                },
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
              import { createInertiaApp } from '@inertiajs/react'
              import { createRoot } from 'react-dom/client'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
                  return pages[\`./Pages/\${name}.jsx\`]
                },
                setup({ el, App, props }) {
                  createRoot(el).render(<App {...props} />)
                },
              })
            `,
          },
          {
            name: 'Svelte 4',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/svelte'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                  return pages[\`./Pages/\${name}.svelte\`]
                },
                setup({ el, App, props }) {
                  new App({ target: el, props })
                },
              })
            `,
          },
          {
            name: 'Svelte 5',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/svelte'
              import { mount } from 'svelte'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                  return pages[\`./Pages/\${name}.svelte\`]
                },
                setup({ el, App, props }) {
                  mount(App, { target: el, props })
                },
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>setup</Code> callback receives everything necessary to initialize the client-side framework, including
        the root Inertia <Code>App</Code> component.
      </P>
      <H2>Resolving components</H2>
      <P>
        The <Code>resolve</Code> callback tells Inertia how to load a page component. It receives a page name (string),
        and returns a page component module. How you implement this callback depends on which bundler (Vite or Webpack)
        you're using.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              // Vite
              resolve: name => {
                const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
                return pages[\`./Pages/\${name}.vue\`]
              },

              // Webpack
              resolve: name => require(\`./Pages/\${name}\`),
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              // Vite
              resolve: name => {
                const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
                return pages[\`./Pages/\${name}.jsx\`]
              },

              // Webpack
              resolve: name => require(\`./Pages/\${name}\`),
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Vite
              resolve: name => {
                const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                return pages[\`./Pages/\${name}.svelte\`]
              },

              // Webpack
              resolve: name => require(\`./Pages/\${name}.svelte\`),
            `,
          },
        ]}
      />
      <P>
        By default we recommend eager loading your components, which will result in a single JavaScript bundle. However,
        if you'd like to lazy-load your components, see our <A href="/code-splitting">code splitting</A> documentation.
      </P>
      <H2>Defining a root element</H2>
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
    </>
  )
}
