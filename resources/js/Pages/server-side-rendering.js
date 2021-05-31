import React from 'react'
import { A, Code, H1, H2, Layout, Ol, P } from '@/Components'

const meta = {
  title: 'Server-side rendering (SSR)',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#how-it-works', name: 'How it works' },
    { url: '#requirements', name: 'Requirements' },
    { url: '#demo-app', name: 'Demo app' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Server-side rendering (SSR)</H1>
      <P>
        Server-side rendering (SSR) an Inertia app can improve search engine optimization (SEO), and can also reduce the
        time to <A href="https://web.dev/fcp/">first contentful paint</A> (FCP). To this point, Inertia has not offered
        server-side rendering. However, official support{' '}
        <A href="https://twitter.com/reinink/status/1374373761147760654">is coming</A>! This feature will be made
        available to <A href="/sponsors">our sponsors</A> first. Please consider supporting this project! 💜
      </P>
      <H2>How it works</H2>
      <P>
        The challenge with server-side rendering JavaScript frameworks like Vue, React and Svelte is that they were
        designed to render in the browser, not on a server. Fortunately, thanks to{' '}
        <A href="https://nodejs.org/">Node.js</A>, it's now possible to also render these frameworks server-side!
      </P>
      <P>Vue, React and Svelte all offer SSR tooling, which Inertia can take advantage of. Here's how it works:</P>
      <Ol>
        <li className="my-6 font-bold text-gray-700">
          <div>A request comes into your server-side framework</div>
          <div className="mt-1 text-base font-medium text-gray-600">
            Your requests and responses are still <em>fully managed</em> by your server-side framework of choice. Your
            routes, middleware, and controllers prepare the Inertia response, just like a normal Inertia app.
          </div>
        </li>
        <li className="my-6 font-bold text-gray-700">
          <div>Inertia makes a request to a local Node SSR server</div>
          <div className="mt-1 text-base font-medium text-gray-600">
            Right before your app sends the full page response to the browser, Inertia takes the{' '}
            <A href="/the-protocol#the-page-object">page object</A> for that response and sends it via HTTP to a local
            Node SSR server.
          </div>
        </li>
        <li className="my-6 font-bold text-gray-700">
          <div>The Node SSR server renders the page component as HTML</div>
          <div className="mt-1 text-base font-medium text-gray-600">
            Using the page object that was provided, the Node server knows what Vue/React/Svelte page component to
            render, and which props to pass it. It then returns the rendered HTML back to your app.
          </div>
        </li>
        <li className="font-bold text-gray-700">
          <div>Your app inserts the pre-rendered HTML in the response</div>
          <div className="mt-1 text-base font-medium text-gray-600">
            Now that your app has the pre-rendered HTML for the page, it can include it in the HTML response sent to the
            browser. When the client-side framework boots, it is able to "hydrate" the server-side rendered HTML,
            instead of re-rendering the whole page.
          </div>
        </li>
      </Ol>
      <P>
        What's awesome here is that, because of Inertia's architecture, the <Code>page</Code> object sent to the Node
        SSR server always includes all the necessary data (props) needed for the page component to render.
      </P>
      <P>
        Meaning, you don't run into any asynchronous data loading issues when doing server-side rendering with Inertia.
        It's very fast. Our tests show that it takes between <Code>2ms-50ms</Code> to render a page, depending on its
        complexity.
      </P>
      <P>
        Also, keep in mind that Inertia only needs to do server-side rendering for the _first page load_. From that
        point on, you're in "SPA mode", and you just get normal Inertia XHR responses back.
      </P>
      <H2>Requirements</H2>
      <P>Okay, what are the gotchas? There are a few technical requirements to be aware of.</P>
      <P>
        First, since we're using Node to do the server-side rendering, you'll need Node installed on your server.
        Fortunately, since Node is often used for build steps, it's very common for it to be installed.
      </P>
      <P>
        Second, you need to run a small background Node process. If you're using a modern hosting platform like{' '}
        <A href="https://dashboard.heroku.com/">Heroku</A> or <A href="https://forge.laravel.com/">Laravel Forge</A>,
        it's quite straightforward to setup. _(Technically you could avoid running the background Node process, and just
        shell out to Node directly. However, since Node takes about <Code>250ms</Code> to boot up, this approach comes
        at a pretty significant performance penalty.)_
      </P>
      <P>
        Third, you are now building an app that must be able to run in both the browser and in Node. These are sometimes
        called "universal" or "isomorphic" apps. Generally speaking this is quite manageable. You just need to be aware
        of this when reaching for <Code>window</Code> or <Code>document</Code>, as these don't exist in Node.
      </P>
      <H2>Demo app</H2>
      <P>
        Wondering what a server-side rendered Inertia app feels like? We've setup the Ping CRM demo app in "SSR mode" so
        you can find out.
      </P>
      <P>
        You can find it at <A href="https://ssr-demo.inertiajs.com">ssr-demo.inertiajs.com</A>.
      </P>
      <P>
        Be sure to view the source to see the HTML coming back from the server. Or, even better, login, disable
        JavaScript, and then click around the app. The pages load, even though JavaScript is disabled! 🤩
      </P>
      <P>This demo app is running on a small Digital Ocean droplet, managed by Laravel Forge.</P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
