import { A, Code, CodeBlock, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Scroll management',
  links: [
    { url: '#scroll-resetting', name: 'Scroll resetting' },
    { url: '#scroll-preservation', name: 'Scroll preservation' },
    { url: '#scroll-regions', name: 'Scroll regions' },
  ],
}

export default function () {
  return (
    <>
      <H1>Scroll management</H1>
      <H2>Scroll resetting</H2>
      <P>
        When navigating between pages, Inertia mimics default browser behavior by automatically resetting the scroll
        position of the document body (as well as any <A href="#scroll-regions">scroll regions</A> you've defined) back
        to the top.
      </P>
      <P>
        In addition, Inertia keeps track of the scroll position of each page and automatically restores that scroll
        position as you navigate forward and back in history.
      </P>
      <H2>Scroll preservation</H2>
      <P>
        Sometimes it's desirable to prevent the default scroll resetting when making visits. You can disable this
        behavior by setting the <Code>preserveScroll</Code> option to <Code>false</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.visit(url, { preserveScroll: false })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.visit(url, { preserveScroll: false })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.visit(url, { preserveScroll: false })
            `,
          },
        ]}
      />
      <P>
        If you'd like to only preserve the scroll position if the response includes validation errors, set the{' '}
        <Code>preserveScroll</Code> option to "errors".
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.visit(url, { preserveScroll: 'errors' })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.visit(url, { preserveScroll: 'errors' })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.visit(url, { preserveScroll: 'errors' })
            `,
          },
        ]}
      />
      <P>
        You can also lazily evaluate the <Code>preserveScroll</Code> option based on the response by providing a
        callback.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/users', data, {
                preserveScroll: (page) => page.props.someProp === 'value',
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/users', data, {
                preserveScroll: (page) => page.props.someProp === 'value',
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/users', data, {
                preserveScroll: (page) => page.props.someProp === 'value',
              })
            `,
          },
        ]}
      />
      <P>
        When using an <A href="/links">Inertia link</A>, you can preserve the scroll position using the{' '}
        <Code>preserveScroll</Code> prop.
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
      <H2>Scroll regions</H2>
      <P>
        If your app doesn't use document body scrolling, but instead has scrollable elements (using the{' '}
        <Code>overflow</Code> CSS property), scroll resetting will not work.
      </P>
      <P>
        In these situations, you must tell Inertia which scrollable elements to manage by adding the{' '}
        <Code>scroll-region</Code> attribute to the element.
      </P>
      <CodeBlock
        language="html"
        children={dedent`
          <div class="overflow-y-auto" scroll-region="">
            <!-- Your page content -->
          </div>
        `}
      />
    </>
  )
}
