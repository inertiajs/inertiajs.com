import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Removed global component registration - BREAKING CHANGE (
        <A href="https://github.com/inertiajs/inertia/pull/765">#765</A>).
      </Li>
      <Li>
        Added title callback support (<A href="https://github.com/inertiajs/inertia/pull/753">#753</A>).
      </Li>
      <Li>
        Updated types (<A href="https://github.com/inertiajs/inertia/pull/742">#742</A>).
      </Li>
    </Ul>
    <H2>Removed global component registration - BREAKING CHANGE ⚠️</H2>
    <P>
      This release removes the global component registration for the <Code>{'<inertia-link>'}</Code> and{' '}
      <Code>{'<inertia-head>'}</Code> components. To use these components moving forward, you'll have to manually import
      them:
    </P>
    <CodeBlock
      language="html"
      children={dedent`
        <template>
          <Head title="Home" />
          <Link href="/about">About</Link>
        </template>\n
        <script>
        import { Head, Link } from '@inertiajs/inertia-vue3'\n
        export default {
          components: {
            Head,
            Link,
          }
        }
        </script>
      `}
    />
    <P>
      Alternatively, you can globally register them in your <Code>app.js</Code> file:
    </P>
    <CodeBlock
      language="diff"
      children={dedent`
        import { Head, Link } from '@inertiajs/inertia-vue3'\n
        createInertiaApp({
          // ...
          setup({ el, App, props, plugin }) {
            createApp({
              render: () => h(App, props),
            })
              .use(plugin)
        +     .component('InertiaHead', Head)
        +     .component('InertiaLink', Link)
              .mount(el)
          },
        })
      `}
    />
    <H2>Added title callback support</H2>
    <P>
      This release adds the ability to globally modify the page <Code>{'<title>'}</Code> when set via the{' '}
      <Code>{'<Head>'}</Code> component. A common use case for this is automatically adding an app name before or after
      each page title.
    </P>
    <P>
      To use this feature, first set the <Code>title</Code> callback in your <Code>createInertiaApp</Code>{' '}
      configuration:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        createInertiaApp({
          title: title => \`\${title} - My App\`,
          // ...
        })
      `}
    />
    <P>
      And then set a title using the <Code>{'<Head>'}</Code> component in your pages:
    </P>
    <CodeBlock
      language="html"
      children={dedent`
        <Head title="Home">
      `}
    />
    <P>
      This will result in the following <Code>{'<title>'}</Code> tag:
    </P>
    <CodeBlock
      language="html"
      children={dedent`
        <title>Home - My App</title>
      `}
    />
    <P>
      This also works if you set the title using a <Code>{'<title>'}</Code> tag:
    </P>
    <CodeBlock
      language="html"
      children={dedent`
        <Head>
          <title>Home</title>
        </Head>
      `}
    />
  </>
)
