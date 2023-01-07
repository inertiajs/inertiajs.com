import { Code, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

const meta = {
  title: 'Partial reloads',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#making-partial-visits', name: 'Making partial visits' },
    { url: '#lazy-data-evaluation', name: 'Lazy data evaluation' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Partial reloads</H1>
      <P>
        When making visits to the same page you are already on, it's not always necessary to re-fetch all of the data
        required for that page from the server. In fact, selecting only a subset of the data can be a helpful
        performance optimization if it's acceptable that some page data becomes stale. Inertia makes this possible via
        the "partial reload" feature.
      </P>
      <P>
        As an example, consider a "user index" page that includes a list of users, as well as an option to filter the
        users by their company. On the first request to the page, both the <Code>users</Code> and <Code>companies</Code>{' '}
        props are passed to the page component. However, on subsequent visits to the same page (maybe to filter the
        users), you can request only the <Code>users</Code> data from the server without requesting the{' '}
        <Code>companies</Code> data. Inertia will then automatically merge the partial data returned from the server
        with the data it already has in memory client-side.
      </P>
      <Notice>Partial reloads only work for visits made to the same page component.</Notice>
      <H2>Making partial visits</H2>
      <P>
        To perform a partial reload, use the <Code>only</Code> property to specify which data the server should return.
        This option should be an array of keys which correspond to the keys of the props.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue2'

              router.visit(url, {
                only: ['users'],
              })
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.visit(url, {
                only: ['users'],
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.visit(url, {
                only: ['users'],
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.visit(url, {
                only: ['users'],
              })
            `,
          },
        ]}
      />
      <P>
        Since partial reloads can only be made to the same page component the user is already on, it almost always makes
        sense to just use the <Code>router.reload()</Code> method, which automatically uses the current URL.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue2'

              router.reload({ only: ['users'] })
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.reload({ only: ['users'] })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.reload({ only: ['users'] })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.reload({ only: ['users'] })
            `,
          },
        ]}
      />
      <P>
        It's also possible to perform partial reloads with Inertia links using the <Code>only</Code> property.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/vue2'

              <Link href="/users?active=true" :only="['users']">Show active</Link>
            `,
          },
          {
            name: 'Vue 3',
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

              <a href="/users?active=true" use:inertia="{{ only: ['users'] }}">Show active</a>

              <Link href="/users?active=true" only={['users']}>Show active</Link>
            `,
          },
        ]}
      />
      <H2>Lazy data evaluation</H2>
      <P>
        For partial reloads to be most effective, be sure to also use lazy data evaluation when returning props from
        your server-side routes or controllers. This can be accomplished by wrapping all optional page data in a
        closure.
      </P>
      <P>
        When Inertia performs a request, it will determine which data is required and only then will it evaluate the
        closure. This can significantly increase the performance of pages that contain a lot of optional data.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              return Inertia::render('Users/Index', [
                  // ALWAYS included on first visit...
                  // OPTIONALLY included on partial reloads...
                  // ALWAYS evaluated...
                  'users' => User::get(),

                  // ALWAYS included on first visit...
                  // OPTIONALLY included on partial reloads...
                  // ONLY evaluated when needed...
                  'users' => fn () => User::get(),

                  // NEVER included on first visit...
                  // OPTIONALLY included on partial reloads...
                  // ONLY evaluated when needed...
                  'users' => Inertia::lazy(fn () => User::get()),
              ]);
            `,
          },
        ]}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
