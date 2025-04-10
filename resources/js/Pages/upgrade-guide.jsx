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
        You can find the legacy docs for Inertia.js v1.0 at <A href="https://v1.inertiajs.com">v1.inertiajs.com</A>.
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
      <P>To upgrade to the Inertia.js v2.0, first use npm to install the client-side adapter of your choice:</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/vue3@^2.0
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/react@^2.0
            `,
          },
          {
            name: 'Svelte',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/svelte@^2.0
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
              composer require inertiajs/inertia-laravel:^2.0
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
      <H3>Router `replace` method</H3>
      <P>
        The previously deprecated <Code>router.replace</Code> method has been re-instated, but its functionality has
        changed. It is now used to make <A href="/manual-visits#client-side-visits">Client Side</A> page visits. To make
        server-side visits that replace the current history entry in the browser, use the <Code>replace</Code> option:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'javascript',
            code: dedent`
              router.get('/users', { search: 'John' }, { replace: true })
            `,
          },
        ]}
      />
      <H3>Svelte adapter</H3>
      <Ul>
        <li>Dropped support for Svelte 3 as it reached End of Life on June 20, 2023.</li>
        <li>
          The <Code>remember</Code> helper has been rename to <Code>useRemember</Code> to be consistent with other
          helpers.
        </li>
        <li>
          Updated <Code>setup</Code> callback in <Code>app.js</Code>. You need to pass <Code>props</Code> when
          initializing the <Code>App</Code> component.{' '}
          <A href="/client-side-setup#initialize-the-inertia-app">See setup in app.js</A>
        </li>
        <li>
          <Code>setup</Code> callback is now required in <Code>ssr.js</Code>.{' '}
          <A href="/server-side-rendering#add-server-entry-point">See setup in ssr.js</A>
        </li>
      </Ul>
      <H3>Partial reloads are now async</H3>
      <P>
        Previously partial reloads in Inertia were synchronous, just like all Inertia requests. In v2.0, partial reloads
        are now asynchronous. Generally this is desirable, but if you were relying on these requests being synchronous,
        you may need to adjust your code.
      </P>
    </>
  )
}
