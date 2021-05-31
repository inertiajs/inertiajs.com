import React from 'react'
import { A, Code, H1, Layout, P, Strong } from '@/Components'

const meta = {
  title: 'How it works',
}

const Page = () => {
  return (
    <>
      <H1>How it works</H1>
      <P>
        With Inertia you build apps just like you've always done with your server-side web framework of choice. You use
        your framework's existing functionality for routing, controllers, middleware, authentication, authorization,
        data fetching, and more.
      </P>
      <P>
        The only thing that's different is your view layer. Instead of using server-side rendering (eg. Blade or ERB
        templates), the views are JavaScript page components. This allows you to build your entire front-end using
        React, Vue or Svelte.
      </P>
      <P>
        But simply creating your front-end in JavaScript doesn't give you a single-page app experience. If you were to
        click a link, your browser would make a full page visit, which would then cause your client-side framework to
        reboot on the subsequent page load. This is where Inertia comes in.
      </P>
      <P>
        At its core Inertia is essentially a client-side routing library. It allows you to make page visits without
        forcing a full page reload. This is done using the <Code>{`<inertia-link>`}</Code> component, a light wrapper
        around a normal anchor link. When you click an Inertia link, Inertia intercepts the click and makes the visit
        via XHR instead. Worth noting, you can also make these visits programmatically in JavaScript using{' '}
        <Code>Inertia.visit()</Code>.
      </P>
      <P>
        When Inertia makes an XHR visit, the server detects that it's an Inertia visit, and instead of returning a full
        HTML response, it returns a JSON response with the JavaScript page component name and data (props). Inertia then
        dynamically swaps out the previous page component with the new page component, and updates the history state.
      </P>
      <P>
        <Strong>The end result is a silky smooth single-page experience.</Strong> 🎉
      </P>
      <P>
        To learn more about how this is technically done, see <A href="/the-protocol">the protocol</A> page.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
