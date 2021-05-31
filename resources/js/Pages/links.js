import React from 'react'
import dedent from 'dedent-js'
import { A, Code, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Links',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#creating-links', name: 'Creating links' },
    { url: '#method', name: 'Method' },
    { url: '#data', name: 'Data' },
    { url: '#headers', name: 'Headers' },
    { url: '#replace', name: 'Replace' },
    { url: '#preserve-state', name: 'Preserve state' },
    { url: '#preserve-scroll', name: 'Preserve scroll' },
    { url: '#partial-reloads', name: 'Partial reloads' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Links</H1>
      <P>
        To create links within an Inertia app you'll need to use the Inertia link component. This is a light wrapper
        around a standard anchor <Code>{'<a>'}</Code> link that intercepts click events and prevents full page reloads
        from occurring. This is how Inertia provides a single-page app experience.
      </P>
      <H2>Creating links</H2>
      <P>
        To create an Inertia link, use the Inertia link component. Note, any attributes you provide will be proxied to
        the underlying tag.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/">Home</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/">Home</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <InertiaLink href="/">Home</InertiaLink>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, InertiaLink } from '@inertiajs/inertia-svelte'\n
              <a href="/" use:inertia>Home</a>\n
              <InertiaLink href="/">Home</InertiaLink>
            `,
            description: 'The use:inertia directive can be applied to any HTML element.',
          },
        ]}
      />
      <P>
        By default Inertia renders links as anchor <Code>{'<a>'}</Code> elements. However, you can change the tag using
        the <Code>as</Code> attribute.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/logout" method="post" as="button" type="button">Logout</inertia-link>\n
              // Renders as:
              <button type="button">Logout</button>
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/logout" method="post" as="button" type="button">Logout</inertia-link>\n
              // Renders as:
              <button type="button">Logout</button>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <InertiaLink href="/logout" method="post" as="button" type="button">Logout</InertiaLink>\n
              // Renders as:
              <button type="button">Logout</button>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia } from '@inertiajs/inertia-svelte'\n
              <button href="/logout" use:inertia="{{ method: 'post' }}" type="button">Logout</button>\n
              // Renders as:
              <button type="button">Logout</button>
            `,
            description:
              'Svelte does not support dynamic elements yet, but you can use the inertia directive to achieve the same results.',
          },
        ]}
      />
      <Notice>
        Creating <Code color="orange">POST</Code>/<Code color="orange">PUT</Code>/<Code color="orange">PATCH</Code>/
        <Code color="orange">DELETE</Code> anchor <Code color="orange">{'<a>'}</Code> links is discouraged as it causes
        "Open Link in New Tab/Window" accessibility issues. Instead, consider using a more appropriate element, such as
        a <Code color="orange">{'<button>'}</Code>.
      </Notice>
      <H2>Method</H2>
      <P>
        You can specify the method for an Inertia link request. The default is <Code>GET</Code>, but you can also use{' '}
        <Code>POST</Code>, <Code>PUT</Code>, <Code>PATCH</Code>, and <Code>DELETE</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/logout" method="post">Logout</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/logout" method="post">Logout</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <InertiaLink href="/logout" method="post">Logout</InertiaLink>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, InertiaLink } from '@inertiajs/inertia-svelte'\n
              <a href="/logout" use:inertia="{{ method: 'post' }}">Logout</a>\n
              <InertiaLink href="/logout" method="post">Logout</InertiaLink>
            `,
          },
        ]}
      />
      <H2>Data</H2>
      <P>
        You can add data using the <Code>data</Code> attribute. This can be an <Code>object</Code>, or a{' '}
        <Code>FormData</Code> instance.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/endpoint" method="post" :data="{ foo: bar }">Save</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/endpoint" method="post" :data="{ foo: bar }">Save</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <InertiaLink href="/endpoint" method="post" data={{ foo: bar }}>Save</InertiaLink>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-svelte'\n
              <InertiaLink href="/endpoint" method="post" data={{ foo: bar }}>Save</InertiaLink>
            `,
          },
        ]}
      />
      <H2>Headers</H2>
      <P>
        The <Code>headers</Code> option allows you to add custom headers to an Inertia link. Do note that Inertia's
        headers take priority and therefore cannot be overwritten.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/endpoint" :headers="{ foo: bar }">Save</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/endpoint" :headers="{ foo: bar }">Save</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <InertiaLink href="/endpoint" headers={{ foo: bar }}>Save</InertiaLink>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, InertiaLink } from '@inertiajs/inertia-svelte'\n
              <button use:inertia="{{ href: '/endpoint', headers: { foo: bar } }}">Save</button>\n
              <InertiaLink href="/endpoint" headers={{ foo: bar}}>Save</InertiaLink>
            `,
          },
        ]}
      />
      <H2>Replace</H2>
      <P>
        You can specify the browser history behaviour. By default page visits push (new) state (
        <Code>window.history.pushState</Code>) into the history, however it's also possible to replace state (
        <Code>window.history.replaceState</Code>) by setting the <Code>replace</Code> attribute to true. This will cause
        the visit to replace the current history state, instead of adding a new history state to the stack.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/" replace>Home</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/" replace>Home</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <InertiaLink replace href="/">Home</InertiaLink>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, InertiaLink } from '@inertiajs/inertia-svelte'\n
              <a href="/" use:inertia="{{ replace: true }}">Home</a>\n
              <InertiaLink href="/" replace>Home</InertiaLink>
            `,
          },
        ]}
      />
      <H2>Preserve state</H2>
      <P>
        You can preserve a page component's local state using the <Code>preserve-state</Code> attribute. This will
        prevent a page component from fully re-rendering. This is especially helpful with forms, since you can avoid
        manually repopulating input fields, and can also maintain a focused input.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <input v-model="query" type="text" />\n
              <inertia-link href="/search" :data="{ query }" preserve-state>Search</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <input v-model="query" type="text" />\n
              <inertia-link href="/search" :data="{ query }" preserve-state>Search</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <input onChange={this.handleChange} value={query} />\n
              <InertiaLink href="/search" data={query} preserveState>Search</InertiaLink>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, InertiaLink } from '@inertiajs/inertia-svelte'\n
              <input on:change={handleChange} value={query} />\n
              <button use:inertia="{{ href: '/search', data: query, preserveState: true }}">Search</button>\n
              <InertiaLink href="/search" data={query} preserveState>Search</InertiaLink>
            `,
          },
        ]}
      />
      <H2>Preserve scroll</H2>
      <P>
        You can use the <Code>preserve-scroll</Code> attribute to prevent Inertia from automatically resetting the
        scroll position when making the visit.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/" preserve-scroll>Home</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/" preserve-scroll>Home</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <InertiaLink preserveScroll href="/">Home</InertiaLink>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, InertiaLink } from '@inertiajs/inertia-svelte'\n
              <a href="/" use:inertia="{{ preserveScroll: true }}">Home</a>\n
              <InertiaLink href="/" preserveScroll>Home</InertiaLink>
            `,
          },
        ]}
      />
      <P>
        For more information, see the <A href="/scroll-management">scroll management</A> page.
      </P>
      <H2>Partial reloads</H2>
      <P>
        The <Code>only</Code> option allows you to request a subset of the props (data) from the server on subsequent
        visits to the same page.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/users?active=true" :only="['users']">Show active</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <inertia-link href="/users?active=true" :only="['users']">Show active</inertia-link>
            `,
            description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaLink } from '@inertiajs/inertia-react'\n
              <InertiaLink href="/users?active=true" only={['users']}>Show active</InertiaLink>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, InertiaLink } from '@inertiajs/inertia-svelte'\n
              <a href="/users?active=true" use:inertia="{{ only: ['users'] }}">Show active</a>\n
              <InertiaLink href="/users?active=true" only={['users']}>Show active</InertiaLink>
            `,
          },
        ]}
      />
      <P>
        For more information, see the <A href="/partial-reloads">partial reloads</A> page.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
