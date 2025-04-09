import {
  A,
  Code,
  CodeBlock,
  H1,
  H2,
  H3,
  Notice,
  P,
  React,
  Svelte,
  Svelte4,
  Svelte5,
  TabbedCode,
  Vue,
} from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Server-side rendering (SSR)',
  links: [
    { url: '#laravel-starter-kits', name: 'Laravel starter kits' },
    { url: '#install-dependencies', name: 'Install dependencies' },
    { url: '#add-server-entry-point', name: 'Add server entry-point' },
    { url: '#setup-vite-js', name: 'Setup Vite' },
    { url: '#update-npm-script', name: 'Update npm script' },
    { url: '#running-the-ssr-server', name: 'Running the SSR server' },
    { url: '#client-side-hydration', name: 'Client side hydration' },
    { url: '#deployment', name: 'Deployment' },
  ],
}

export default function () {
  return (
    <>
      <H1>Server-side Rendering (SSR)</H1>
      <P>
        Server-side rendering pre-renders your JavaScript pages on the server, allowing your visitors to receive fully
        rendered HTML when they visit your application. Since fully rendered HTML is served by your application, it's
        also easier for search engines to index your site.
      </P>
      <Notice>
        Server-side rendering uses Node.js to render your pages in a background process; therefore, Node must be
        available on your server for server-side rendering to function properly.
      </Notice>
      <H2>Laravel starter kits</H2>
      <P>
        If you are using <A href="https://laravel.com/docs/starter-kits">Laravel Breeze or Jetstream</A>, you may
        install the starter kit's scaffolding with Inertia SSR support pre-configured using the <Code>--ssr</Code> flag.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'bash',
            code: dedent`
              php artisan breeze:install react --ssr
              php artisan breeze:install vue --ssr
            `,
          },
        ]}
      />
      <H2>Install dependencies</H2>
      <P>
        If you are not using a Laravel starter kit and would like to manually configure SSR, we'll first install the
        additional dependencies required for server-side rendering. This is only necessary for the Vue adapters, so you
        can skip this step if you're using React or Svelte.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'bash',
            code: dedent`
              npm install @vue/server-renderer
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              // No additional dependencies required
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // No additional dependencies required
            `,
          },
        ]}
      />
      <P>Then, make sure you have the latest version of the Inertia Laravel adapter installed.</P>
      <CodeBlock
        language="bash"
        children={dedent`
          composer require inertiajs/inertia-laravel
        `}
      />
      <H2>Add server entry-point</H2>
      <P>
        Next, we'll create a <Code>resources/js/ssr.js</Code> file within our Laravel project that will serve as our SSR
        entry point.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          touch resources/js/ssr.js
        `}
      />
      <P>
        This file is going to look very similar to your <Code>resources/js/app.js</Code> file, except it's not going to
        run in the browser, but rather in Node.js. Here's a complete example.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/vue3'
              import createServer from '@inertiajs/vue3/server'
              import { renderToString } from '@vue/server-renderer'
              import { createSSRApp, h } from 'vue'

              createServer(page =>
                createInertiaApp({
                  page,
                  render: renderToString,
                  resolve: name => {
                    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
                    return pages[\`./Pages/\${name}.vue\`]
                  },
                  setup({ App, props, plugin }) {
                    return createSSRApp({
                      render: () => h(App, props),
                    }).use(plugin)
                  },
                }),
              )
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/react'
              import createServer from '@inertiajs/react/server'
              import ReactDOMServer from 'react-dom/server'

              createServer(page =>
                createInertiaApp({
                  page,
                  render: ReactDOMServer.renderToString,
                  resolve: name => {
                    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
                    return pages[\`./Pages/\${name}.jsx\`]
                  },
                  setup: ({ App, props }) => <App {...props} />,
                }),
              )
            `,
          },
          {
            name: 'Svelte 4',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/svelte'
              import createServer from '@inertiajs/svelte/server'

              createServer(page =>
                createInertiaApp({
                  page,
                  resolve: name => {
                    const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                    return pages[\`./Pages/\${name}.svelte\`]
                  },
                  setup({ App, props }) {
                    return App.render(props)
                  },
                }),
              )
            `,
          },
          {
            name: 'Svelte 5',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/svelte'
              import createServer from '@inertiajs/svelte/server'
              import { render } from 'svelte/server'

              createServer(page =>
                createInertiaApp({
                  page,
                  resolve: name => {
                    const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                    return pages[\`./Pages/\${name}.svelte\`]
                  },
                  setup({ App, props }) {
                    return render(App, { props })
                  },
                }),
              )
            `,
          },
        ]}
      />
      <P>
        When creating this file, be sure to add anything that's missing from your <Code>app.js</Code> file that makes
        sense to run in SSR mode, such as plugins or custom mixins.
      </P>
      <H3>Clustering</H3>
      <P>
        By default, the SSR server will run on a single thread. Clustering starts multiple Node servers on the same
        port, requests are then handled by each thread in a round-robin way.
      </P>
      <P>
        You can enable clustering by passing a second argument to <Code>createServer</Code>:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/vue3'
              import createServer from '@inertiajs/vue3/server'
              import { renderToString } from '@vue/server-renderer'
              import { createSSRApp, h } from 'vue'

              createServer(page =>
                createInertiaApp({
                  // ...
                }),
                { cluster: true },
              )
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/react'
              import createServer from '@inertiajs/react/server'
              import ReactDOMServer from 'react-dom/server'

              createServer(page =>
                createInertiaApp({
                  // ...
                }),
                { cluster: true },
              )
            `,
          },
          {
            name: 'Svelte 4',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/svelte'
              import createServer from '@inertiajs/svelte/server'

              createServer(page =>
                createInertiaApp({
                  // ...
                }),
                { cluster: true },
              )
            `,
          },
          {
            name: 'Svelte 5',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/svelte'
              import createServer from '@inertiajs/svelte/server'
              import { render } from 'svelte/server'

              createServer(page =>
                createInertiaApp({
                  // ...
                }),
                { cluster: true },
              )
            `,
          },
        ]}
      />
      <H2>Setup Vite</H2>
      <P>
        Next, we need to update our Vite configuration to build our new <Code>ssr.js</Code> file. We can do this by
        adding a <Code>ssr</Code> property to Laravel's Vite plugin configuration in our <Code>vite.config.js</Code>{' '}
        file.
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
          export default defineConfig({
            plugins: [
              laravel({
                input: ['resources/css/app.css', 'resources/js/app.js'],
          +     ssr: 'resources/js/ssr.js',
                refresh: true,
              }),
              // ...
            ],
          })
        `}
      />
      <H2>Update npm script</H2>
      <P>
        Next, let's update the <Code>build</Code> script in our <Code>package.json</Code> file to also build our new{' '}
        <Code>ssr.js</Code> file.
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
           "scripts": {
             "dev": "vite",
         -   "build": "vite build"
         +   "build": "vite build && vite build --ssr"
           },
        `}
      />
      <P>Now you can build both your client-side and server-side bundles.</P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm run build
        `}
      />
      <H2>Running the SSR server</H2>
      <P>
        Now that you have built both your client-side and server-side bundles, you should be able run the Node-based
        Inertia SSR server using the following command.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          php artisan inertia:start-ssr
        `}
      />
      <P>
        With the server running, you should be able to access your app within the browser with server-side rendering
        enabled. In fact, you should be able to disable JavaScript entirely and still navigate around your application.
      </P>
      <H2>Client side hydration</H2>
      <P>
        Since your website is now being server-side rendered, you can instruct <Vue>Vue</Vue>
        <React>React</React>
        <Svelte>Svelte</Svelte> to "hydrate" the static markup and make it interactive instead of re-rendering all the
        HTML that we just generated.
      </P>
      <Vue>
        <P>
          To enable client-side hydration in a Vue app, update your <Code>app.js</Code> file to use{' '}
          <Code>createSSRApp</Code> instead of <Code>createApp</Code>:
        </P>
      </Vue>
      <React>
        <P>
          To enable client-side hydration in a React app, update your <Code>app.js</Code> file to use{' '}
          <Code>hydrateRoot</Code> instead of <Code>createRoot</Code>:
        </P>
      </React>
      <Svelte4>
        <P>
          To enable client-side hydration in a Svelte 4 app, set the <Code>hydrate</Code> option to <Code>true</Code> in
          your <Code>app.js</Code> file:
        </P>
      </Svelte4>
      <Svelte5>
        <P>
          To enable client-side hydration in a Svelte 5 app, update your <Code>app.js</Code> file to use{' '}
          <Code>hydrate</Code> instead of <Code>mount</Code> when server rendering:
        </P>
      </Svelte5>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'diff',
            code: dedent`
            - import { createApp, h } from 'vue'
            + import { createSSRApp, h } from 'vue'
              import { createInertiaApp } from '@inertiajs/vue3'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
                  return pages[\`./Pages/\${name}.vue\`]
                },
                setup({ el, App, props, plugin }) {
            -     createApp({ render: () => h(App, props) })
            +     createSSRApp({ render: () => h(App, props) })
                    .use(plugin)
                    .mount(el)
                },
              })
            `,
          },
          {
            name: 'React',
            language: 'diff',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/react'
            - import { createRoot } from 'react-dom/client'
            + import { hydrateRoot } from 'react-dom/client'

              createInertiaApp({
                resolve: name => {
                  const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
                  return pages[\`./Pages/\${name}.jsx\`]
                },
                setup({ el, App, props }) {
            -     createRoot(el).render(<App {...props} />)
            +     hydrateRoot(el, <App {...props} />)
                },
              })
            `,
          },
          {
            name: 'Svelte 4',
            language: 'diff',
            code: dedent`
                import { createInertiaApp } from '@inertiajs/svelte'

                createInertiaApp({
                  resolve: name => {
                    const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                    return pages[\`./Pages/${name}.svelte\`]
                  },
                 setup({ el, App, props }) {
             -     new App({ target: el, props })
             +     new App({ target: el, props, hydrate: true })
                 },
                })
            `,
          },
          {
            name: 'Svelte 5',
            language: 'diff',
            code: dedent`
                import { createInertiaApp } from '@inertiajs/svelte'
             -  import { mount } from 'svelte'
             +  import { hydrate, mount } from 'svelte'

                createInertiaApp({
                  resolve: name => {
                    const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
                    return pages[\`./Pages/${name}.svelte\`]
                  },
                  setup({ el, App, props }) {
             -      mount(App, { target: el, props })
             +      if (el.dataset.serverRendered === 'true') {
             +        hydrate(App, { target: el, props })
             +      } else {
             +        mount(App, { target: el, props })
             +      }
                  },
                })
            `,
          },
        ]}
      />
      <Svelte4>
        <P>
          You will also need to set the <Code>hydratable</Code> compiler option to <Code>true</Code> in your{' '}
          <Code>vite.config.js</Code> file:
        </P>
        <TabbedCode
          examples={[
            {
              name: 'Svelte 4',
              language: 'diff',
              code: dedent`
              import { svelte } from '@sveltejs/vite-plugin-svelte'
              import laravel from 'laravel-vite-plugin'
              import { defineConfig } from 'vite'

              export default defineConfig({
                plugins: [
                  laravel.default({
                    input: ['resources/css/app.css', 'resources/js/app.js'],
                    ssr: 'resources/js/ssr.js',
                    refresh: true,
                  }),
            -     svelte(),
            +     svelte({
            +       compilerOptions: {
            +         hydratable: true,
            +       },
            +     }),
                ],
              })
            `,
            },
          ]}
        />
      </Svelte4>
      <H2>Deployment</H2>
      <P>
        When deploying your SSR enabled app to production, you'll need to build both the client-side (
        <Code>app.js</Code>) and server-side bundles (<Code>ssr.js</Code>), and then run the SSR server as a background
        process, typically using a process monitoring tool such as Supervisor.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          php artisan inertia:start-ssr
        `}
      />
      <P>
        To stop the SSR server, for instance when you deploy a new version of your website, you may utilize the{' '}
        <Code>inertia:stop-ssr</Code> Artisan command. Your process monitor (such as Supervisor) should be responsible
        for automatically restarting the SSR server after it has stopped.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          php artisan inertia:stop-ssr
        `}
      />
      <H2>Laravel Forge</H2>
      <P>
        To run the SSR server on Forge, you should create a new daemon that runs{' '}
        <Code>php artisan inertia:start-ssr</Code> from the root of your app. Or, you may utilize the built-in Inertia
        integration from your Forge application's management dashboard.
      </P>
      <P>
        Next, whenever you deploy your application, you can automatically restart the SSR server by calling the{' '}
        <Code>php artisan inertia:stop-ssr</Code> command. This will stop the existing SSR server, forcing a new one to
        be started by your process monitor.
      </P>
      <H2>Heroku</H2>
      <P>
        To run the SSR server on Heroku, update the <Code>web</Code> configuration in your <Code>Procfile</Code> to run
        the SSR server before starting your web server.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
        web: php artisan inertia:start-ssr & vendor/bin/heroku-php-apache2 public/
      `}
      />
      <P>
        Note, you must have the <Code>heroku/nodejs</Code> buildpack installed in addition to the{' '}
        <Code>heroku/php</Code> buildback for the SSR server to run.
      </P>
    </>
  )
}
