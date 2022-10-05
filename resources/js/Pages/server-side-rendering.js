import React from 'react'
import { A, Code, CodeBlock, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'
import dedent from "dedent-js";


const meta = {
  title: 'Server-side rendering (SSR)',
  links: [
    { url: '#how-it-works', name: 'How it works' },
    { url: '#setting-up-ssr', name: 'Setting up SSR' },
    { url: '#setting-up-mix', name: 'Setting up Mix' },
    { url: '#enabling-ssr', name: 'Enabling SSR' },
    { url: '#building-your-app', name: 'Building your app' },
    { url: '#running-the-service', name: 'Running the service' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Server-side Rendering (SSR)</H1>
      <P>
        Server-side rendering allows you to pre-render an initial page visit on the server, and to send the rendered HTML to the browser.
        This allows visitors to see and interact with your pages before they have fully loaded, and also provides other benefits such as decreasing the time
        it takes for search engines to index your site.
      </P>
      <Notice>SSR is not yet ready for the Svelte adapter. However, it's something we're actively working on adding.</Notice>
      <H2 id="how-it-works">How it works</H2>
      <P>
        When Inertia detects that it's running in a Node.js environment, it will automatically render the
        provided <A href="/the-protocol#the-page-object">page object</A> to HTML and return it.
      </P>
      <P>
        However, because most Inertia applications are built in languages such as PHP or Ruby, we'll
        need to hand the request over to a separate Node.js service so that it can render the page for us, and
        return the rendered HTML back to the browser when it's done.
      </P>
      <H2 id="setting-up-ssr">Setting up server side rendering</H2>
      <P>
        First, we'll install the necessary server-side rendering dependencies using NPM or Yarn:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'bash',
            code: dedent`
              npm install vue-server-renderer
              yarn add vue-server-renderer
            `,
          },
          {
            name: 'Vue 3',
            language: 'bash',
            code: dedent`
              npm install @vue/server-renderer
              yarn add @vue/server-renderer
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm install react-dom
              yarn add react-dom
            `,
          },
        ]}
      />
      <P>
        We'll also install the <A href="https://github.com/inertiajs/server"><Code>@inertiajs/server</Code></A> package, which provides a simple
        HTTP server. While this package isn't strictly necessary, it prevents the need to write your own HTTP service, and generally keeps things simple:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install @inertiajs/server
          yarn add @inertiajs/server
        `}
      />
      <P>
        Then, we'll create a <Code>{'resources/js/ssr.js'}</Code> file:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          touch resources/js/ssr.js
        `}
      />
      <P>
        This file is going to look very similar like your <Code>{'app.js'}</Code> file, with the exception that it's not going to run in the browser, but rather in Node.js. Here's a complete example:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import Vue from 'vue'
              import { createRenderer } from 'vue-server-renderer'
              import { createInertiaApp } from '@inertiajs/inertia-vue'
              import createServer from '@inertiajs/server'

              createServer((page) => createInertiaApp({
                page,
                render: createRenderer().renderToString,
                resolve: name => require(\`./Pages/\${name}\`),
                setup({ app, props, plugin }) {
                  Vue.use(plugin)
                  return new Vue({
                    render: h => h(app, props),
                  })
                },
              }))
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import { createSSRApp, h } from 'vue'
              import { renderToString } from '@vue/server-renderer'
              import { createInertiaApp } from '@inertiajs/inertia-vue3'
              import createServer from '@inertiajs/server'

              createServer((page) => createInertiaApp({
                page,
                render: renderToString,
                resolve: name => require(\`./Pages/\${name}\`),
                setup({ app, props, plugin }) {
                  return createSSRApp({
                    render: () => h(app, props),
                  }).use(plugin)
                },
              }))
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import React from 'react'
              import ReactDOMServer from 'react-dom/server'
              import { createInertiaApp } from '@inertiajs/inertia-react'
              import createServer from '@inertiajs/server'

              createServer((page) => createInertiaApp({
                page,
                render: ReactDOMServer.renderToString,
                resolve: name => require(\`./Pages/\${name}\`),
                setup: ({ App, props }) => <App {...props} />,
              }))
            `,
          },
        ]}
      />
      <Notice>
        Be sure to add anything that's missing from your <Code>{'app.js'}</Code> file that makes sense to run in SSR mode, such as plugins or custom mixins. However, not everything needs to be included. For example, the <Code>{'InertiaProgress'}</Code> library can be omitted from this file, as it will never be used in SSR mode.
        <br /><br />
        Furthermore, do not use code-splitting in your <Code>{'ssr.js'}</Code> file as it won't help anything, given that we want to generate just one SSR build file. You can, of course, still use code splitting for your client-side build (<Code>{'app.js'}</Code>).
      </Notice>
      <Notice>By default, Inertia's SSR server will operate on port <Code>{'13714'}</Code>. However, you can change this by providing a second argument to the <Code>{'createServer'}</Code> method.</Notice>
      <Notice>
        <strong>Vue 2</strong>: If you're using the <Code>{'PortalVue'}</Code> package, it's import line MUST come after the <Code>{'import { createRenderer } from \'vue-server-renderer\''}</Code> line.
      </Notice>
      <H2 id="setting-up-mix">
        Setting up Laravel Mix
      </H2>
      <P>
        In order for our Webpack build to run properly on Node, we'll first need to install the <Code>{'webpack-node-externals'}</Code> package:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install webpack-node-externals
        `}
      />
      <P>
        Then, we'll create a new <Code>{'webpack.ssr.mix.js'}</Code> file for SSR. This is necessary, because at the time of writing this, Laravel Mix does not support multiple webpack configurations within the same <Code>{'webpack.mix.js'}</Code> file:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          touch webpack.ssr.mix.js
        `}
      />
      <P>
        Here is an example configuration for this file. Note that it will look much like your <Code>{'webpack.mix.js'}</Code> configuration, with the exception that you only compile your JavaScript, and not your CSS.
      </P>
      <P>
        Be sure to redefine any aliases used within your application. Using <Code>{'webpackConfig()'}</Code>, be sure to set the <Code>{'target'}</Code> to <Code>{'node'}</Code>, and set <Code>{'externals'}</Code> to <Code>{'[webpackNodeExternals()]'}</Code>, which is the library we just installed.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              const path = require('path')
              const mix = require('laravel-mix')
              const webpackNodeExternals = require('webpack-node-externals')

              mix
                .options({ manifest: false })
                .js('resources/js/ssr.js', 'public/js')
                .vue({ version: 2, options: { optimizeSSR: true } })
                .alias({ '@': path.resolve('resources/js') })
                .webpackConfig({
                  target: 'node',
                  externals: [webpackNodeExternals()],
                })
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              const path = require('path')
              const mix = require('laravel-mix')
              const webpackNodeExternals = require('webpack-node-externals')

              mix
                .options({ manifest: false })
                .js('resources/js/ssr.js', 'public/js')
                .vue({ version: 3, options: { optimizeSSR: true } })
                .alias({ '@': path.resolve('resources/js') })
                .webpackConfig({
                  target: 'node',
                  externals: [webpackNodeExternals()],
                })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              const path = require('path')
              const mix = require('laravel-mix')
              const nodeExternals = require('webpack-node-externals');

              mix
                .options({ manifest: false })
                .js('resources/js/ssr.js', 'public/js')
                .react()
                .alias({ '@': path.resolve('resources/js') })
                .webpackConfig({
                  target: 'node',
                  externals: [nodeExternals()],
                })
            `,
          },
        ]}
      />
      <H2 id="enabling-ssr">
        Enabling server side rendering
      </H2>
      <Notice>Automatic SSR rendering is currently only available for the Laravel adapter. However, we're actively working on adding this to the Rails adapter as well.</Notice>
      <P>
        Next, we'll need to make sure the <Code>{'@inertiaHead'}</Code> directive is included in the <Code>{'<head>'}</Code> section of our <Code>{'app.blade.php'}</Code> file:
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
        Finally, we'll need to enable SSR in your application's <Code>{'inertia.php'}</Code> configuration file.
        If you do not yet have this file in your application's <Code>{'config'}</Code> folder, you should publish it first using the following command:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          php artisan vendor:publish --provider="Inertia\\ServiceProvider"
        `}
      />
      <P>
        Then, enable SSR by setting the <Code>{'enabled'}</Code> option under <Code>{'ssr'}</Code> to <Code>{'true'}</Code>:
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          <?php

          return [

              /*
              |--------------------------------------------------------------------------
              | Server Side Rendering
              |--------------------------------------------------------------------------
              |
              | These options configures if and how Inertia uses Server Side Rendering
              | to pre-render the initial visits made to your application's pages.
              |
              | Do note that enabling these options will NOT automatically make SSR work,
              | as a separate rendering service needs to be available. To learn more,
              | please visit https://inertiajs.com/server-side-rendering
              |
              */

              'ssr' => [

                  'enabled' => true,

                  'url' => 'http://127.0.0.1:13714/render',

              ],

          // ...
        `}
      />
      <H2 id="building-your-app">
        Building your application
      </H2>
      <P>
        You now have two build processes you need to run—one for your client-side bundle, and another for your server-side bundle:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          npx mix
          npx mix --mix-config=webpack.ssr.mix.js
        `}
      />
      <P>
        Run both of these build steps and correct any errors that are generated. Remember, you're now building an "isomorphic" app, which means your app runs both on the client (browser) and on the server (Node).
      </P>
      <Notice>
        To learn more about SSR in Vue 2, see <A href="https://ssr.vuejs.org">their guide</A>.
        To learn more about SSR in Vue 3, see <A href="https://v3.vuejs.org/guide/ssr/introduction.html">their guide</A>.
        To learn more about SSR in React, see <A href="https://reactjs.org/docs/react-dom-server.html">their guide</A>.
      </Notice>
      <H2 id="running-the-service">Running the Node.js service</H2>
      <P>
        With the builds generated, you should be able run the Node server using the following command:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          node public/js/ssr.js
        `}
      />
      <P>
        With that running, you should now be able to access your app within the browser, with server-side rendering enabled. In fact, you should be able to disable JavaScript entirely and navigate around the app.
      </P>
      <H2>
        Client side hydration (Vue-only)
      </H2>
      <P>
        With this configuration, Vue will automatically try to "hydrate" the static markup and make it interactive, instead of re-rendering all the HTML that we just generated on the server. This is called "client side hydration". However, for client side hydration to work, the HTML generated on the server must be exactly the same as on the client, otherwise you'll see this warning in your console:
      </P>
      <P>
        Of course, since you're generating the HTML from the same page components, this generally isn't an issue. However, if you do see this warning, see these caveats in the <A href="https://ssr.vuejs.org/guide/hydration.html#hydration-caveats">Vue 2</A> / <A href="https://v3.vuejs.org/guide/ssr/hydration.html#hydration-caveats">Vue 3</A> SSR documentation.
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
      <H2>Hosting setup</H2>
      <P>
        When deploying your SSR enabled app to production, you'll need to run both the client-side (<Code>{'app.js'}</Code>) and server-side (<Code>{'ssr.js'}</Code>) builds. One option here is to update the <Code>{'prod'}</Code> script in <Code>{'package.json'}</Code> to run both builds automatically:
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          "prod": "mix --production && mix --production --mix-config=webpack.ssr.mix.js",
        `}
      />
      <H2>Laravel Forge</H2>
      <P>
        To run the SSR server on Forge, create a new daemon that runs <Code>{'node public/js/ssr.js'}</Code> in the root of your app.
      </P>
      <P>
        Take note of the daemon ID that is generated, as you'll need to use this in your apps deployment script. Whenever you deploy your application, you'll need to automatically restart the SSR server. Add the following to your deployment script, updating "123456" with your daemon ID.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          # Restart SSR server
          sudo supervisorctl restart daemon-123456:daemon-123456_00
        `}
      />
      <H2>Heroku</H2>
      <P>
        To run the SSR server on Heroku, update your <Code>{'web'}</Code> configuration in your <Code>{'Procfile'}</Code> to first run the SSR server before starting your web server. Note, to do this you must have the <Code>{'heroku/nodejs'}</Code> buildpack installed in addition to the <Code>{'heroku/php'}</Code> buildpack.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          web: node public/js/ssr.js & vendor/bin/heroku-php-apache2 public/
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
