import { Code, H1, H2, H3, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Prefetching',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#link-prefetching', name: 'Link prefetching' },
    { url: '#programmatic-prefetching', name: 'Programmatic prefetching' },
    { url: '#cache-tags', name: 'Cache tags' },
    { url: '#cache-invalidation', name: 'Cache invalidation' },
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
        To prefetch data for a page, you can add the <Code>prefetch</Code> prop to the Inertia link component. By
        default, Inertia will prefetch the data for the page when the user hovers over the link for more than 75ms.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
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
            import { inerta } from '@inertiajs/svelte'

            <a href="/users" use:inertia={{ prefetch: true }}>Users</a>
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
            name: 'Vue',
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
            import { inertia } from '@inertiajs/svelte'

            <a href="/users" use:inertia={{ prefetch: true, cacheFor: '1m' }}>Users</a>
            <a href="/users" use:inertia={{ prefetch: true, cacheFor: '10s' }}>Users</a>
            <a href="/users" use:inertia={{ prefetch: true, cacheFor: 5000 }}>Users</a>
            `,
          },
        ]}
      />
      <P>
        Instead of prefetching on hover, you can also start prefetching on <Code>mousedown</Code> by passing the <Code>click</Code> value to the{' '}
        <Code>prefetch</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
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
            import { inertia } from '@inertiajs/svelte'

            <a href="/users" use:inertia={{ prefetch: 'click' }}>Users</a>
            `,
          },
        ]}
      />
      <P>If you're confident that the user will visit a page next, you can prefetch the data on mount as well.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
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
            import { inerta } from '@inertiajs/svelte'

            <a href="/users" use:inertia={{ prefetch: 'mount' }}>Users</a>
            `,
          },
        ]}
      />
      <P>
        You can also combine prefetch strategies by passing an array of values to the <Code>prefetch</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
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
            import { inertia } from '@inertiajs/svelte'

            <a href="/users" use:inertia={{ prefetch: ['mount', 'hover'] }}>Users</a>
            `,
          },
        ]}
      />
      <H2>Programmatic prefetching</H2>
      <P>
        You can prefetch data programmatically using <Code>router.prefetch</Code>. This method's signature is identical to{' '}
        <Code>router.visit</Code> with the exception of a third argument that allows you to specify prefetch options.
      </P>
      <P>
        When the <Code>cacheFor</Code> option is not specified, it defaults to 30 seconds.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            router.prefetch(
                '/users',
                { method: 'get', data: { page: 2 } },
            )

            router.prefetch(
                '/users',
                { method: 'get', data: { page: 2 } },
                { cacheFor: '1m' },
            )
            `,
          },
        ]}
      />

      <P>
        Inertia also provides a <Code>usePrefetch</Code> hook that allows you to track the prefetch state for the
        current page. It returns information about whether the page is currently prefetching, has been prefetched,
        when it was last updated, and a <Code>flush</Code> method that flushes the cache for the current page only.
      </P>

      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            import { usePrefetch } from '@inertiajs/vue3'

            const { lastUpdatedAt, isPrefetching, isPrefetched, flush } = usePrefetch()
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
            import { usePrefetch } from '@inertiajs/react'

            const { lastUpdatedAt, isPrefetching, isPrefetched, flush } = usePrefetch()
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
            import { usePrefetch } from '@inertiajs/svelte'

            const { lastUpdatedAt, isPrefetching, isPrefetched, flush } = usePrefetch()
            `,
          },
        ]}
      />
      <P>
        You can also pass visit options when you need to differentiate between different request configurations for the same URL.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            import { usePrefetch } from '@inertiajs/vue3'

            const { lastUpdatedAt, isPrefetching, isPrefetched, flush } = usePrefetch({
                headers: { 'X-Custom-Header': 'value' }
            })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
            import { usePrefetch } from '@inertiajs/react'

            const { lastUpdatedAt, isPrefetching, isPrefetched, flush } = usePrefetch({
                headers: { 'X-Custom-Header': 'value' }
            })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
            import { usePrefetch } from '@inertiajs/svelte'

            const { lastUpdatedAt, isPrefetching, isPrefetched, flush } = usePrefetch({
                headers: { 'X-Custom-Header': 'value' }
            })
            `,
          },
        ]}
      />
      <H2>Cache tags</H2>
      <P>
        Cache tags allow you to group related prefetched data and invalidate all cached data with that tag when specific events occur.
      </P>
      <P>
        To tag cached data, pass a <Code>cacheTags</Code> prop to your <Code>Link</Code> component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
            <script setup>
            import { Link } from '@inertiajs/vue3'
            </script>

            <template>
              <Link href="/users" prefetch cache-tags="users">Users</Link>
              <Link href="/dashboard" prefetch :cache-tags="['dashboard', 'stats']">Dashboard</Link>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Link } from '@inertiajs/react'

            <Link href="/users" prefetch cacheTags="users">Users</Link>
            <Link href="/dashboard" prefetch cacheTags={['dashboard', 'stats']}>Dashboard</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            import { inertia } from '@inertiajs/svelte'

            <a href="/users" use:inertia={{ prefetch: true, cacheTags: 'users' }}>Users</a>
            <a href="/dashboard" use:inertia={{ prefetch: true, cacheTags: ['dashboard', 'stats'] }}>Dashboard</a>
            `,
          },
        ]}
      />
      <P>
        When prefetching programmatically, pass <Code>cacheTags</Code> in the third argument to <Code>router.prefetch</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            router.prefetch('/users', {}, { cacheTags: 'users' })
            router.prefetch('/dashboard', {}, { cacheTags: ['dashboard', 'stats'] })
            `,
          },
        ]}
      />
      <H2>Cache invalidation</H2>
      <P>
        You can manually flush the prefetch cache by calling <Code>router.flushAll</Code> to remove all cached data,
        or <Code>router.flush</Code> to remove cache for a specific page.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            // Flush all prefetch cache
            router.flushAll()

            // Flush cache for a specific page
            router.flush('/users', { method: 'get', data: { page: 2 } })

            // Using the usePrefetch hook
            const { flush } = usePrefetch()

            // Flush cache for the current page
            flush()
            `,
          },
        ]}
      />
      <P>
        For more granular control, you can flush cached data by their tags using <Code>router.flushByCacheTags</Code>.
        This removes any cached response that contains <em>any</em> of the specified tags.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            // Flush all responses tagged with 'users'
            router.flushByCacheTags('users')

            // Flush all responses tagged with 'dashboard' OR 'stats'
            router.flushByCacheTags(['dashboard', 'stats'])
            `,
          },
        ]}
      />
      <H3>Invalidate on requests</H3>
      <P>
        To automatically invalidate caches when making requests, pass an <Code>invalidateCacheTags</Code> prop to the{' '}
        <Code>Form</Code> component. The specified tags will be flushed when the form submission succeeds.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
            <script setup>
            import { Form } from '@inertiajs/vue3'
            </script>

            <template>
              <Form action="/users" method="post" :invalidate-cache-tags="['users', 'dashboard']">
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Create User</button>
              </Form>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Form } from '@inertiajs/react'

            export default () => (
              <Form action="/users" method="post" invalidateCacheTags={['users', 'dashboard']}>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Create User</button>
              </Form>
            )
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
            <script>
              import { Form } from '@inertiajs/svelte'
            </script>

            <Form action="/users" method="post" invalidateCacheTags={['users', 'dashboard']}>
              <input type="text" name="name" />
              <input type="email" name="email" />
              <button type="submit">Create User</button>
            </Form>
            `,
          },
        ]}
      />
      <P>
        When using the <Code>useForm</Code> helper, you can include <Code>invalidateCacheTags</Code> in the visit options.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            import { useForm } from '@inertiajs/vue3'

            const form = useForm({
              name: '',
              email: '',
            })

            const submit = () => {
              form.post('/users', {
                invalidateCacheTags: ['users', 'dashboard']
              })
            }
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
            import { useForm } from '@inertiajs/react'

            const { data, setData, post } = useForm({
              name: '',
              email: '',
            })

            function submit(e) {
              e.preventDefault()
              post('/users', {
                invalidateCacheTags: ['users', 'dashboard']
              })
            }
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
            import { useForm } from '@inertiajs/svelte'

            const form = useForm({
              name: '',
              email: '',
            })

            function submit() {
              $form.post('/users', {
                invalidateCacheTags: ['users', 'dashboard']
              })
            }
            `,
          },
        ]}
      />
      <P>
        You can also invalidate cache tags with programmatic visits by including <Code>invalidateCacheTags</Code> in the options.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            router.delete(\`/users/\${userId}\`, {}, {
              invalidateCacheTags: ['users', 'dashboard']
            })

            router.post('/posts', postData, {
              invalidateCacheTags: ['posts', 'recent-posts']
            })
            `,
          },
        ]}
      />
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
            name: 'Vue',
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
            import { inertia } from '@inertiajs/svelte'

            <a href="/users" use:inertia={{ prefetch: true, cacheFor: ['30s', '1m'] }}>Users</a>
            `,
          },
        ]}
      />
      <P>
        If a request is made within the fresh period (before the first value), the cache is returned immediately without
        making a request to the server.
      </P>
      <P>
        If a request is made during the stale period (between the two values), the stale value is served to the user,
        and a request is made in the background to refresh the cached data. Once the fresh data is returned, it is
        merged into the page so the user has the most recent data.
      </P>
      <P>
        If a request is made after the second value, the cache is considered expired, and the page and data is fetched from the
        sever as a regular request.
      </P>
    </>
  )
}
