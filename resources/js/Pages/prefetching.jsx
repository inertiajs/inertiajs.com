import { Code, H1, H2, H3, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Prefetching',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#link-prefetching', name: 'Link prefetching' },
    { url: '#stale-while-revalidate', name: 'Stale while revalidate' },
  ],
}

export default function () {
  return (
    <>
      <H1>Prefetching</H1>
      <P>
        Inertia supports prefetching data for pages that are likely to be visited next. This can be useful for improving
        the perceived performance of your app by allowing the data to be fetched in the background while the user is
        still interacting with the current page.
      </P>
      <H2>Link prefetching</H2>
      <P>
        To prefetch data for a page, you can use the <Code>prefetch</Code> method on the Inertia link component. By
        default, Inertia will prefetch the data for the page when the user hovers over the link after more than 75ms.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            import { Link } from '@inertiajs/vue3'

            <Link href="/users" prefetch>Users</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/react'

            <Link href="/users" prefetch>Users</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/svelte'

            // TODO: Svelte example
            <Link href="/users" prefetch>Users</Link>
            `,
          },
        ]}
      />
      <P>
        By default, data is cached for 30 seconds before being evicted. You can customize this behavior by passing a{' '}
        <Code>cacheFor</Code> prop to the <Code>Link</Code> component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            import { Link } from '@inertiajs/vue3'

            <Link href="/users" prefetch cache-for="1m">Users</Link>
            <Link href="/users" prefetch cache-for="10s">Users</Link>
            <Link href="/users" prefetch :cache-for="5000">Users</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/react'

            <Link href="/users" prefetch cacheFor="1m">Users</Link>
            <Link href="/users" prefetch cacheFor="10s">Users</Link>
            <Link href="/users" prefetch cacheFor={5000}>Users</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/svelte'

            // TODO: Svelte example
            <Link href="/users" prefetch cache-for="1m">Users</Link>
            <Link href="/users" prefetch cache-for="10s">Users</Link>
            <Link href="/users" prefetch :cache-for="5000">Users</Link>
            `,
          },
        ]}
      />
      <P>
        You can also start prefetching on <Code>mousedown</Code> by passing the <Code>click</Code> value to the{' '}
        <Code>prefetch</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            import { Link } from '@inertiajs/vue3'

            <Link href="/users" prefetch="click">Users</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/react'

            <Link href="/users" prefetch="click">Users</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/svelte'

            // TODO: Svelte example
            <Link href="/users" prefetch="click">Users</Link>
            `,
          },
        ]}
      />
      <P>If you're confident that the user will visit a page next, you can prefetch the data on mount as well.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            import { Link } from '@inertiajs/vue3'

            <Link href="/users" prefetch="mount">Users</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/react'

            <Link href="/users" prefetch="mount">Users</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/svelte'

            // TODO: Svelte example
            <Link href="/users" prefetch="mount">Users</Link>
            `,
          },
        ]}
      />
      <P>
        You can also combine strategies by passing an array of values to the <Code>prefetch</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            import { Link } from '@inertiajs/vue3'

            <Link href="/users" :prefetch="['mount', 'hover']">Users</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/react'

            <Link href="/users" prefetch={['mount', 'hover']}>Users</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/svelte'

            // TODO: Svelte example
            <Link href="/users" :prefetch="['mount', 'hover']">Users</Link>
            `,
          },
        ]}
      />
      {/* TODO: Programattic prefetching */}
      {/* TODO: usePrefetch */}
      {/* TODO: Flushing prefetch cache */}
      <H2>Stale while revalidate</H2>
      <P>
        By default, Inertia will fetch a fresh copy of the data when the user visits the page if the cached data is
        older than the cache duration. You can customize this behavior by passing a tuple to the <Code>cacheFor</Code>{' '}
        prop.
      </P>
      <P>
        The first value in the array represents the number of seconds the cache is considered fresh, while the second
        value defines how long it can be served as stale data before fetching data from the server is necessary.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            import { Link } from '@inertiajs/vue3'

            <Link href="/users" prefetch :cacheFor="['30s', '1m']">Users</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/react'

            <Link href="/users" prefetch cacheFor={['30s', '1m']}>Users</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/svelte'

            // TODO: Svelte example
            <Link href="/users" prefetch :cacheFor="['30s', '1m']">Users</Link>
            `,
          },
        ]}
      />
      <H3>How it works</H3>
      <P>
        If a request is made within the fresh period (before the first value), the cache is returned immediately without
        making a request to the server.
      </P>
      <P>
        If a request is made during the stale period (between the two values), the stale value is served to the user,
        and a request is made in the background to refresh the cached value. Once the value is returned, the data is
        merged into the page so the user has the most recent data.
      </P>
      <P>
        If a request is made after the second value, the cache is considered expired, and the value is fetched from the
        sever as a regular request.
      </P>
    </>
  )
}
