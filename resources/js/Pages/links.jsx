import { A, Code, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Links',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#creating-links', name: 'Creating links' },
    { url: '#method', name: 'Method' },
    { url: '#data', name: 'Data' },
    { url: '#custom-headers', name: 'Custom headers' },
    { url: '#browser-history', name: 'Browser history' },
    { url: '#state-preservation', name: 'State preservation' },
    { url: '#scroll-preservation', name: 'Scroll preservation' },
    { url: '#partial-reloads', name: 'Partial reloads' },
    { url: '#active-states', name: 'Active states' },
    { url: '#data-loading-attribute', name: 'Data loading attribute' },
  ],
}

export default function () {
  return (
    <>
      <H1>Links</H1>
      <P>
        To create links to other pages within an Inertia app, you will typically use the Inertia <Code>{'<Link>'}</Code>{' '}
        component. This component is a light wrapper around a standard anchor <Code>{'<a>'}</Code> link that intercepts
        click events and prevents full page reloads. This is{' '}
        <A href="/how-it-works">how Inertia provides a single-page app experience</A> once your application has been
        loaded.
      </P>
      <H2>Creating links</H2>
      <P>
        To create an Inertia link, use the Inertia <Code>{'<Link>'}</Code> component. Any attributes you provide to this
        component will be proxied to the underlying HTML tag.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <Link href="/">Home</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <Link href="/">Home</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'

              <a href="/" use:inertia>Home</a>

              <Link href="/">Home</Link>
            `,
            description: 'The use:inertia action can be applied to any HTML element.',
          },
        ]}
      />
      <P>
        By default, Inertia renders links as anchor <Code>{'<a>'}</Code> elements. However, you can change the tag using
        the <Code>as</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <Link href="/logout" method="post" as="button">Logout</Link>

              // Renders as...
              <button type="button">Logout</button>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <Link href="/logout" method="post" as="button">Logout</Link>

              // Renders as...
              <button type="button">Logout</button>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/svelte'

              <Link href="/logout" method="post" as="button">Logout</Link>

              // Renders as...
              <button type="button">Logout</button>
            `,
          },
        ]}
      />
      <Notice>
        Creating <Code color="orange">POST</Code>/<Code color="orange">PUT</Code>/<Code color="orange">PATCH</Code>/
        <Code color="orange">DELETE</Code> anchor <Code color="orange">{'<a>'}</Code> links is discouraged as it causes
        "Open Link in New Tab / Window" accessibility issues. The component automatically renders a{` `}
        <Code color="orange">{'<button>'}</Code> element when using these methods.
      </Notice>
      <H2>Method</H2>
      <P>
        You can specify the HTTP request method for an Inertia link request using the <Code>method</Code> prop. The
        default method used by links is <Code>GET</Code>, but you can use the <Code>method</Code> prop to make{' '}
        <Code>POST</Code>, <Code>PUT</Code>, <Code>PATCH</Code>, and <Code>DELETE</Code> requests via links.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <Link href="/logout" method="post" as="button">Logout</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <Link href="/logout" method="post" as="button">Logout</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'

              <button use:inertia={{ href: '/logout', method: 'post' }} type="button">Logout</button>

              <Link href="/logout" method="post">Logout</button>
            `,
          },
        ]}
      />

      <H2>Wayfinder</H2>
      <P>
        <strong>Requires Inertia &gt;= v2.0.6</strong>
      </P>
      <P>
        When using <A href="https://github.com/laravel/wayfinder">Wayfinder</A> in conjunction with the{' '}
        <Code>Link</Code>
        component, you can simply pass the resulting object directly to the <Code>href</Code> prop. The{' '}
        <Code>Link</Code> will infer the HTTP method and URL directly from the Wayfinder object:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'
              import { show } from 'App/Http/Controllers/UserController'

              <Link :href="show(1)">John Doe</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'
              import { show } from 'App/Http/Controllers/UserController'

              <Link href={show(1)}>John Doe</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'
              import { show } from 'App/Http/Controllers/UserController'

              <button use:inertia={{ href: show(1) }} type="button">John Doe</button>

              <Link href={show(1)}>John Doe</button>
            `,
          },
        ]}
      />
      <H2>Data</H2>
      <P>
        When making <Code>POST</Code> or <Code>PUT</Code> requests, you may wish to add additional data to the request.
        You can accomplish this using the <Code>data</Code> prop. The provided data can be an <Code>object</Code> or{' '}
        <Code>FormData</Code> instance.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <Link href="/endpoint" method="post" :data="{ foo: bar }">Save</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <Link href="/endpoint" method="post" data={{ foo: bar }}>Save</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'

              <button use:inertia={{ href: '/endpoint', method: 'post', data: { foo: bar } }} type="button">Save</button>

              <Link href="/endpoint" method="post" data={{ foo: bar }}>Save</Link>
            `,
          },
        ]}
      />
      <H2>Custom headers</H2>
      <P>
        The <Code>headers</Code> prop allows you to add custom headers to an Inertia link. However, the headers Inertia
        uses internally to communicate its state to the server take priority and therefore cannot be overwritten.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <Link href="/endpoint" :headers="{ foo: bar }">Save</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <Link href="/endpoint" headers={{ foo: bar }}>Save</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'

              <button use:inertia={{ href: '/endpoint', headers: { foo: bar } }}>Save</button>

              <Link href="/endpoint" headers={{ foo: bar }}>Save</Link>
            `,
          },
        ]}
      />
      <H2>Browser history</H2>
      <P>
        The <Code>replace</Code> prop allows you to specify the browser's history behavior. By default, page visits push
        (new) state (<Code>window.history.pushState</Code>) into the history; however, it's also possible to replace
        state (<Code>window.history.replaceState</Code>) by setting the <Code>replace</Code> prop to <Code>true</Code>.
        This will cause the visit to replace the current history state instead of adding a new history state to the
        stack.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <Link href="/" replace>Home</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <Link replace href="/">Home</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'

              <a href="/" use:inertia={{ replace: true }}>Home</a>

              <Link href="/" replace>Home</Link>
            `,
          },
        ]}
      />
      <H2>State preservation</H2>
      <P>
        You can preserve a page component's local state using the <Code>preserve-state</Code> prop. This will prevent a
        page component from fully re-rendering. The <Code>preserve-state</Code> prop is especially helpful on pages that
        contain forms, since you can avoid manually repopulating input fields and can also maintain a focused input.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <input v-model="query" type="text" />

              <Link href="/search" :data="{ query }" preserve-state>Search</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <input onChange={this.handleChange} value={query} type="text" />

              <Link href="/search" data={query} preserveState>Search</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'

              <input bind:value={query} type="text" />

              <button use:inertia={{ href: '/search', data: { query }, preserveState: true }}>Search</button>

              <Link href="/search" data={{ query }} preserveState>Search</Link>
            `,
          },
        ]}
      />
      <H2>Scroll preservation</H2>
      <P>
        You can use the <Code>preserveScroll</Code> prop to prevent Inertia from automatically resetting the scroll
        position when making a page visit.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <Link href="/" preserve-scroll>Home</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <Link preserveScroll href="/">Home</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'

              <a href="/" use:inertia={{ preserveScroll: true }}>Home</a>

              <Link href="/" preserveScroll>Home</Link>
            `,
          },
        ]}
      />
      <P>
        For more information on managing scroll position, please consult the documentation on{' '}
        <A href="/scroll-management">scroll management</A>.
      </P>
      <H2>Partial reloads</H2>
      <P>
        The <Code>only</Code> prop allows you to specify that only a subset of a page's props (data) should be retrieved
        from the server on subsequent visits to that page.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              <Link href="/users?active=true" :only="['users']">Show active</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/react'

              <Link href="/users?active=true" only={['users']}>Show active</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/svelte'

              <a href="/users?active=true" use:inertia={{ only: ['users'] }}>Show active</a>

              <Link href="/users?active=true" only={['users']}>Show active</Link>
            `,
          },
        ]}
      />
      <P>
        For more information on this topic, please consult the complete documentation on{' '}
        <A href="/partial-reloads">partial reloads</A>.
      </P>
      <H2>Active states</H2>
      <P>
        It's often desirable to set an active state for navigation links based on the current page. This can be
        accomplished when using Inertia by inspecting the <Code>page</Code> object and doing string comparisons against
        the <Code>page.url</Code> and <Code>page.component</Code> properties.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue3'

              // URL exact match...
              <Link href="/users" :class="{ 'active': $page.url === '/users' }">Users</Link>

              // Component exact match...
              <Link href="/users" :class="{ 'active': $page.component === 'Users/Index' }">Users</Link>

              // URL starts with (/users, /users/create, /users/1, etc.)...
              <Link href="/users" :class="{ 'active': $page.url.startsWith('/users') }">Users</Link>

              // Component starts with (Users/Index, Users/Create, Users/Show, etc.)...
              <Link href="/users" :class="{ 'active': $page.component.startsWith('Users') }">Users</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { usePage } from '@inertiajs/react'

              const { url, component } = usePage()

              // URL exact match...
              <Link href="/users" className={url === '/users' ? 'active' : ''}>Users</Link>

              // Component exact match...
              <Link href="/users" className={component === 'Users/Index' ? 'active' : ''}>Users</Link>

              // URL starts with (/users, /users/create, /users/1, etc.)...
              <Link href="/users" className={url.startsWith('/users') ? 'active' : ''}>Users</Link>

              // Component starts with (Users/Index, Users/Create, Users/Show, etc.)...
              <Link href="/users" className={component.startsWith('Users') ? 'active' : ''}>Users</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link, page } from '@inertiajs/svelte'

              // URL exact match...
              <a href="/users" use:inertia class:active={$page.url === '/users'}>Users</a>

              // Component exact match...
              <a href="/users" use:inertia class:active={$page.component === 'Users/Index'}>Users</a>

              // URL starts with (/users, /users/create, /users/1, etc.)...
              <Link href="/users" class={$page.url.startsWith('/users') ? 'active' : ''}>Users</Link>

              // Component starts with (Users/Index, Users/Create, Users/Show, etc.)...
              <Link href="/users" class={$page.component.startsWith('Users') ? 'active' : ''}>Users</Link>
            `,
          },
        ]}
      />
      <P>
        You can perform exact match comparisons (<Code>===</Code>), <Code>startsWith()</Code> comparisons (useful for
        matching a subset of pages), or even more complex comparisons using regular expressions.
      </P>
      <P>
        Using this approach, you're not limited to just setting class names. You can use this technique to conditionally
        render any markup on active state, such as different link text or even an SVG icon that represents the link is
        active.
      </P>
      <H2>Data loading attribute</H2>
      <P>
        While a link is making an active request, a <Code>data-loading</Code> attribute is added to the link element.
        This allows you to style the link while it's in a loading state. The attribute is removed once the request is
        complete.
      </P>
    </>
  )
}
