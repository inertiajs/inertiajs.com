import { A, Code, CodeBlock, H1, H2, H3, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Server-side rendering (SSR)',
  links: [
    { url: '#how-it-works', name: 'How it works' },
    { url: '#laravel-starter-kits', name: 'Laravel starter kits' },
    { url: '#install-dependencies', name: 'Install dependencies' },
    { url: '#add-server-entry-point', name: 'Add server entry-point' },
    { url: '#setup-vite-js', name: 'Setup Vite.js' },
    { url: '#update-npm-scripts', name: 'Update npm scripts' },
    { url: '#building-your-app', name: 'Building your app' },
    { url: '#hosting-setup', name: 'Hosting setup' },
    { url: '#common-gotchas', name: 'Common gotchas' },
  ],
}

export default function () {
  return (
    <>
      <H1>Server-side Rendering (SSR)</H1>
      <P>
        Server-side rendering allows you to pre-render an initial page visit on the server and to send the rendered HTML
        to the browser. This allows visitors to see and interact with your pages before they have fully loaded, and also
        provides other benefits such as decreasing the time it takes for search engines to index your site.
      </P>
      <H2>How it works</H2>
      <P>
        When Inertia detects that it's running in a Node.js environment, it will automatically render the provided{' '}
        <A href="/the-protocol#the-page-object">page object</A> to HTML and return it.
      </P>
      <P>
        However, because most Inertia applications are built in languages such as PHP or Ruby, we'll need to hand the
        request over to a separate Node.js service so that it can render the page for us. Then, the Node.js service will
        return the rendered HTML back to the browser when it's done rendering the page.
      </P>
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
        First, we'll install the additional dependencies required for server-side rendering. This is only necessary for
        the Vue adapters, so if you're using React or Svelte you can skip this step.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'bash',
            code: dedent`
              npm install vue-server-renderer
            `,
          },
          {
            name: 'Vue 3',
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
      <H2>Create server entry-point</H2>
      <P>
        Next, we'll create a <Code>resources/js/ssr.js</Code> file within our Laravel project that will serve as our SSR
        entry point:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          touch resources/js/ssr.js
        `}
      />
      <P>
        This file is going to look very similar to your <Code>resources/js/app.js</Code> file, except it's not going to
        run in the browser, but rather in Node.js. Here's a complete example:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import { createInertiaApp } from '@inertiajs/vue2'
              import createServer from '@inertiajs/vue2/server'
              import Vue from 'vue'
              import { createRenderer } from 'vue-server-renderer'

              createServer(page =>
                createInertiaApp({
                  page,
                  render: createRenderer().renderToString,
                  resolve: name => {
                    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
                    return pages[\`./Pages/\${name}.vue\`]
                  },
                  setup({ app, props, plugin }) {
                    Vue.use(plugin)
                    return new Vue({
                      render: h => h(app, props),
                    })
                  },
                }),
              )
            `,
          },
          {
            name: 'Vue 3',
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
                  setup({ app, props, plugin }) {
                    return createSSRApp({
                      render: () => h(app, props),
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
            name: 'Svelte',
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
                }),
              )
            `,
          },
        ]}
      />
      <P>
        Be sure to add anything that's missing from your <Code>app.js</Code> file that makes sense to run in SSR mode,
        such as plugins or custom mixins.
      </P>
      <H2>Setup Vite.js</H2>
      <P>
        Next, we need to update our Vite.js configuration to build our new <Code>ssr.js</Code> file. We can do this by
        adding a <Code>ssr</Code> property to the Laravel plugin configuration in our <Code>vite.config.js</Code> file:
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
      <H2>Update npm scripts</H2>
      <P>
        Next, let's update our <Code>package.json</Code> scripts to build our new <Code>ssr.js</Code> file. We'll add
        this to our existing <Code>build</Code> script:
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
      <P>Now you can build both your client-side and server-side bundles by running:</P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm run build
        `}
      />
      <P>
        While we have the <Code>package.json</Code> file open, let's also add
      </P>
      <H2>Enabling server side rendering</H2>
      <P>
        Next, we'll need to make sure the <Code>@inertiaHead</Code> directive is included in the <Code>{'<head>'}</Code>{' '}
        section of our application's <Code>app.blade.php</Code> file:
      </P>
      <CodeBlock
        language="html"
        children={dedent`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
              <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
              <script src="{{ mix('/js/app.js') }}" defer></script>
              @inertiaHead
            </head>
            <body>
              @inertia
            </body>
          </html>
        `}
      />
      <P>
        Finally, we'll need to enable SSR in your application's <Code>inertia.php</Code> configuration file. If you do
        not yet have this file in your application's <Code>config</Code> folder, you should publish it first using the
        following command.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          php artisan vendor:publish --provider="Inertia\\ServiceProvider"
        `}
      />
      <P>
        Then, enable SSR by setting the <Code>enabled</Code> option under <Code>ssr</Code> to <Code>true</Code>.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          <?php

          return [

              'ssr' => [
                  'enabled' => true,
                  'url' => 'http://127.0.0.1:13714',
                  'bundle' => base_path('bootstrap/ssr/ssr.mjs'),
              ],

          // ...
        `}
      />
      <H2>Running the Node.js service</H2>
      <P>
        After running both of your application builds, you should be able run the Node-based Inertia SSR server using
        the following command.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          node public/js/ssr.js
        `}
      />
      <P>
        With the server running, you should now be able to access your app within the browser with server-side rendering
        enabled. In fact, you should be able to disable JavaScript entirely and still navigate around your application.
      </P>
      <H2>Client side hydration (Vue-only)</H2>
      <P>
        With this configuration, Vue will automatically try to "hydrate" the static markup and make it interactive
        instead of re-rendering all the HTML that we just generated on the server. This is called "client side
        hydration". However, for client side hydration to work, the HTML generated on the server must be exactly the
        same as on the client, otherwise you'll see the following warning in your console.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            code: dedent`
              [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.
            `,
          },
          {
            name: 'Vue 3',
            code: dedent`
              [Vue warn]: Hydration children mismatch...
            `,
          },
        ]}
      />
      <P>
        Of course, since you're generating the HTML from the same page components, this generally isn't an issue.
        However, if you do see this warning, see the following caveats in the{' '}
        <A href="https://ssr.vuejs.org/guide/hydration.html#hydration-caveats">Vue 2</A> /{' '}
        <A href="https://v3.vuejs.org/guide/ssr/hydration.html#hydration-caveats">Vue 3</A> SSR documentation.
      </P>
      <H2>Hosting setup</H2>
      <P>
        When deploying your SSR enabled app to production, you'll need to run both the client-side (<Code>app.js</Code>)
        and server-side (<Code>ssr.js</Code>) builds. One option is to update the <Code>prod</Code> script in your
        application's <Code>package.json</Code> file to run both builds automatically.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          "prod": "mix --production && mix --production --mix-config=webpack.ssr.mix.js",
        `}
      />
      <H2>Laravel Forge</H2>
      <P>
        To run the SSR server on Forge, you should create a new daemon that runs <Code>node public/js/ssr.js</Code> from
        the root of your app. Take note of the daemon ID that is generated by Forge, as you'll need to use this in your
        app's deployment script.
      </P>
      <P>
        Next, whenever you deploy your application, you'll need to automatically restart the SSR server. You can
        accomplish this by adding the following command to your deployment script, updating "123456" with your daemon
        ID.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          # Restart the SSR server...
          sudo supervisorctl restart daemon-123456:daemon-123456_00
        `}
      />
      <H2>Heroku</H2>
      <P>
        To run the SSR server on Heroku, update the <Code>web</Code> configuration in your <Code>Procfile</Code> to
        first run the SSR server before starting your web server. To do this successfully, you must have the{' '}
        <Code>heroku/nodejs</Code> buildpack installed in addition to the <Code>heroku/php</Code> buildback.
        <CodeBlock
          language="bash"
          children={dedent`
        web: node public/js/ssr.js & vendor/bin/heroku-php-apache2 public/
        `}
        />
      </P>
      <H2>Common gotchas</H2>
      <H3>Don't use code-splitting in SSR</H3>
      <P>
        Do not use code-splitting in your <Code>ssr.js</Code> file as it will not provide any benefit given that we want
        to generate just one SSR build file. You can, of course, still use code splitting for your client-side build (
        <Code>app.js</Code>).
      </P>
      <H3>Port</H3>
      <P>
        By default, Inertia's SSR server will operate on port <Code>13714</Code>. However, you can change this by
        providing a second argument to the <Code>createServer</Code> method.
      </P>
      <H3>PortalVue</H3>
      <P>
        If you're using the <Code>PortalVue</Code> package, it's import line must come after the{' '}
        <Code>{"import { createRenderer } from 'vue-server-renderer'"}</Code> line.
      </P>
    </>
  )
}
