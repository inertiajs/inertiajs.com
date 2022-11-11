import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Scroll management',
  links: [
    { url: '#scroll-resetting', name: 'Scroll resetting' },
    { url: '#scroll-preservation', name: 'Scroll preservation' },
    { url: '#scroll-regions', name: 'Scroll regions' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Scroll management</H1>
      <H2>Scroll resetting</H2>
      <P>
        When navigating between pages, Inertia mimics default browser behaviour by automatically resetting the scroll
        position of the document body (as well as any <A href="#scroll-regions">scroll regions</A> you've defined) back
        to the top. In addition, Inertia keeps track of the scroll position of each page and automatically restores that
        scroll position as you navigate forward and back in history.
      </P>
      <H2>Scroll preservation</H2>
      <P>
        Sometimes it's desirable to prevent the default scroll resetting behavior when making visits. You can disable
        this behaviour using the <Code>preserveScroll</Code> option when <A href="/requests">manually making visits</A>.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.visit(url, { preserveScroll: true })
        `}
      />
      <P>
        You can also lazily evaluate the <Code>preserveScroll</Code> option based on the server's response by providing
        a callback to the option.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/users', data, {
            preserveScroll: (page) => Object.keys(page.props.errors).length,
          })
        `}
      />
      <P>
        You can also preserve the scroll position when using <A href="/links">Inertia links</A> using the{' '}
        <Code>preserve-scroll</Code> attribute.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/inertia-vue'\n
              <Link href="/" preserve-scroll>Home</Link>
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/inertia-vue3'\n
              <Link href="/" preserve-scroll>Home</Link>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Link } from '@inertiajs/inertia-react'\n
              <Link preserveScroll href="/">Home</Link>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { inertia, Link } from '@inertiajs/inertia-svelte'\n
              <a href="/" use:inertia="{{ preserveScroll: true }}">Home</a>\n
              <Link href="/" preserveScroll>Home</Link>
            `,
          },
        ]}
      />
      <H2>Scroll regions</H2>
      <P>
        If your app doesn't use document body scrolling, but instead has scrollable elements (using the{' '}
        <Code>overflow</Code> CSS property), scroll resetting will not work. In these situations, you must tell Inertia
        which scrollable elements to manage by adding a <Code>scroll-region</Code> attribute to the element.
      </P>
      <CodeBlock
        language="html"
        children={dedent`
          <div class="overflow-y-auto" scroll-region>
            <!-- Your page content -->
          </div>
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
