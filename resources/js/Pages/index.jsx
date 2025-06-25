import { A, H1, H2, P } from '@/Components'

export const meta = {
  description:
    'Inertia.js lets you quickly build modern single-page React, Vue and Svelte apps using classic server-side routing and controllers.',
  hero: true,
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#not-a-framework', name: 'Not a framework' },
    { url: '#next-steps', name: 'Next steps' },
  ],
}

export default function () {
  return (
    <>
      <H1>JavaScript apps the monolith way</H1>
      <P>Inertia is a new approach to building classic server-driven web apps. We call it the modern monolith.</P>
      <P>
        Inertia allows you to create fully client-side rendered, single-page apps, without the complexity that comes
        with modern SPAs. It does this by leveraging existing server-side patterns that you already love.
      </P>
      <P>
        Inertia has no client-side routing, nor does it require an API. Simply build controllers and page views like
        you've always done! Inertia works great with any backend framework, but it's fine-tuned for{' '}
        <A href="https://laravel.com">Laravel</A>.
      </P>
      <H2>Not a framework</H2>
      <P>
        Inertia isn't a framework, nor is it a replacement for your existing server-side or client-side frameworks.
        Rather, it's designed to work with them. Think of Inertia as glue that connects the two. Inertia does this via
        adapters. We currently have three official client-side adapters (React, Vue, and Svelte) and three server-side
        adapters (Laravel, Rails, and Phoenix).
      </P>
      <H2>Next steps</H2>
      <P>
        Want to learn a bit more before diving in? Check out the <A href="/who-is-it-for">who is it for</A> and{' '}
        <A href="/how-it-works">how it works</A> pages. Or, if you're ready to get started, jump right into the{' '}
        <A href="/server-side-setup">installation instructions</A>.
      </P>
    </>
  )
}
