import { A, Code, H1, H2, H3, Notice, P, TabbedCode, Ul } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Upgrade guide',
  links: [
    { url: '#whats-new', name: "What's new" },
    { url: '#upgrade-dependencies', name: 'Upgrade dependencies' },
    { url: '#breaking-changes', name: 'Breaking changes' },
  ],
}

export default function () {
  return (
    <>
      <H1>Upgrade guide for v2.0</H1>
      <Notice>
        Inertia.js v2.0 is still in beta and these docs are a work-in-progress. Please report bugs on{' '}
        <A color="orange" href="https://github.com/inertiajs/inertia">
          GitHub
        </A>
        .
      </Notice>
      <H2 id="whats-new">What's new</H2>
      <P>
        Inertia.js v2.0 is a huge step forward for Inertia! The core library has been completely rewritten to
        architecturally support asynchronous requests, enabling a whole set of new features, including:
      </P>
      <Ul>
        <li>
          <A href="/polling">Polling</A>
        </li>
        <li>
          <A href="/prefetching">Prefetching</A>
        </li>
        <li>
          <A href="/deferred-props">Deferred props</A>
        </li>
        <li>
          <A href="/merging-props">Infinite scrolling</A>
        </li>
        <li>
          <A href="/load-when-visible">Lazy loading data on scroll</A>
        </li>
      </Ul>
      <P>
        Additionally, for security sensitive projects, Inertia now offers a{' '}
        <A href="/history-encryption">history encryption API</A>, allowing you to clear page data from history state
        when logging out of an application.
      </P>
      <H2>Upgrade dependencies</H2>
      <P>To upgrade to the Inertia.js v2.0 beta, first use npm to install the client-side adapter of your choice:</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/vue3@next
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/react@next
            `,
          },
          {
            name: 'Svelte',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/svelte@next
            `,
          },
        ]}
      />
      <P>
        Next, upgrade the <Code>inertiajs/inertia-laravel</Code> package to use the <Code>2.x</Code> dev branch:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'bash',
            code: dedent`
              composer require inertiajs/inertia-laravel:2.x-dev
            `,
          },
        ]}
      />
      <H2>Breaking changes</H2>
      <P>
        While a significant release, Inertia.js v2.0 doesn't introduce many breaking changes. Here's a list of all the
        breaking changes:
      </P>
      <H3>Dropped Laravel 8 and 9 support</H3>
      <P>The Laravel adapter now requires Laravel 10 and PHP 8.1 at a minimum.</P>
      <H3>Dropped Vue 2 support</H3>
      <P>
        The Vue 2 adapter has been removed. Vue 2 reached End of Life on December 3, 2023, so this felt like it was
        time.
      </P>
      <H3>Partial reloads are now async</H3>
      <P>
        Previously partial reloads in Inertia were synchronous, just like all Inertia requests. In v2.0, partial reloads
        are now asynchronous. Generally this is desireable, but if you were relying on these requests being synchronous,
        you may need to adjust your code.
      </P>
    </>
  )
}
