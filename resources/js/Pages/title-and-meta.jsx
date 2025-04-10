import { Code, CodeBlock, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Title & meta',
  links: [
    { url: '#head-component', name: 'Head component' },
    { url: '#title-shorthand', name: 'Title shorthand' },
    { url: '#title-callback', name: 'Title callback' },
    { url: '#multiple-head-instances', name: 'Multiple Head instances' },
    { url: '#head-extension', name: 'Head extension' },
  ],
}

export default function () {
  return (
    <>
      <H1>Title & meta</H1>
      <P>
        Since Inertia powered JavaScript apps are rendered within the document <Code>{'<body>'}</Code>, they are unable
        to render markup to the document <Code>{'<head>'}</Code>, as it's outside of their scope. To help with this,
        Inertia ships with a <Code>{'<Head>'}</Code> component which can be used to set the page{' '}
        <Code>{'<title>'}</Code>, <Code>{'<meta>'}</Code> tags, and other <Code>{'<head>'}</Code> elements.
      </P>
      <Notice>
        The <Code color="orange">{'<Head>'}</Code> component will only replace <Code color="orange">{'<head>'}</Code>{' '}
        elements that are not in your server-side root template.
      </Notice>
      <Notice>
        The <Code color="orange">{'<Head>'}</Code> component is not available in the Svelte adapter, as Svelte already
        ships with its own <Code color="orange">{'<svelte:head>'}</Code> component.
      </Notice>
      <H2>Head component</H2>
      <P>
        To add <Code>{'<head>'}</Code> elements to your page, use the <Code>{'<Head>'}</Code> component. Within this
        component, you can include the elements that you wish to add to the document <Code>{'<head>'}</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/vue3'

              <Head>
                <title>Your page title</title>
                <meta name="description" content="Your page description">
              </Head>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/react'

              <Head>
                <title>Your page title</title>
                <meta name="description" content="Your page description" />
              </Head>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <svelte:head>
                <title>Your page title</title>
                <meta name="description" content="Your page description" />
              </svelte:head>
            `,
            description: 'The <svelte:head> component is provided by Svelte.',
          },
        ]}
      />
      <H2>Title shorthand</H2>
      <P>
        If you only need to add a <Code>{'<title>'}</Code> to the document <Code>{'<head>'}</Code>, you may simply pass
        the title as a prop to the <Code>{'<Head>'}</Code> component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/vue3'

              <Head title="Your page title" />
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/react'

              <Head title="Your page title" />
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Not supported
            `,
          },
        ]}
      />
      <H2>Title callback</H2>
      <P>
        You can globally modify the page <Code>{'<title>'}</Code> using the <Code>title</Code> callback in the{' '}
        <Code>createInertiaApp</Code> setup method. Typically, this method is invoked in your application's main
        JavaScript file. A common use case for the title callback is automatically adding an app name before or after
        each page title.
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
        After defining the <Code>title</Code> callback, the callback will automatically be invoked when you set a title
        using the <Code>{'<Head>'}</Code> component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/vue3'

              <Head title="Home">
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/react'

              <Head title="Home">
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Not supported
            `,
          },
        ]}
      />
      <P>
        Which, in this example, will result in the following <Code>{'<title>'}</Code> tag.
      </P>
      <CodeBlock
        language="html"
        children={dedent`
          <title>Home - My App</title>
        `}
      />
      <P>
        The <Code>title</Code> callback will also be invoked when you set the title using a <Code>{'<title>'}</Code> tag
        within your <Code>{'<Head>'}</Code> component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/vue3'

              <Head>
                <title>Home</title>
              </Head>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/react'

              <Head>
                <title>Home</title>
              </Head>
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Not supported
            `,
          },
        ]}
      />
      <H2>Multiple Head instances</H2>
      <P>
        It's possible to have multiple instances of the <Code>{'<Head>'}</Code> component throughout your application.
        For example, your layout can set some default <Code>{'<Head>'}</Code> elements, and then your individual pages
        can override those defaults.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              // Layout.vue

              import { Head } from '@inertiajs/vue3'

              <Head>
                <title>My app</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              </Head>

              // About.vue

              import { Head } from '@inertiajs/vue3'

              <Head>
                <title>About - My app</title>
                <meta head-key="description" name="description" content="This is a page specific description" />
              </Head>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              // Layout.js

              import { Head } from '@inertiajs/react'

              <Head>
                <title>My app</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              </Head>

              // About.js

              import { Head } from '@inertiajs/react'

              <Head>
                <title>About - My app</title>
                <meta head-key="description" name="description" content="This is a page specific description" />
              </Head>
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Not supported
            `,
          },
        ]}
      />
      <P>
        Inertia will only ever render one <Code>{'<title>'}</Code> tag; however, all other tags will be stacked since
        it's valid to have multiple instances of them. To avoid duplicate tags in your <Code>{'<head>'}</Code>, you can
        use the <Code>head-key</Code> property, which will make sure the tag is only rendered once. This is illustrated
        in the example above for the <Code>{'<meta name="description">'}</Code> tag.
      </P>
      <P>The code example above will render the following HTML.</P>
      <CodeBlock
        language="html"
        children={dedent`
          <head>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <title>About - My app</title>
            <meta name="description" content="This is a page specific description" />
          </head>
        `}
      />
      <H2>Head extension</H2>
      <P>
        When building a real application, it can sometimes be helpful to create a custom head component that extends
        Inertia's <Code>{'<Head>'}</Code> component. This gives you a place to set app-wide defaults, such as appending
        the app name to the page title.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <!-- AppHead.vue -->

              <script setup>
              import { Head } from '@inertiajs/vue3'

              defineProps({ title: String })
              </script>

              <template>
                <Head :title="title ? \`\${title} - My App\` : 'My App'">
                  <slot />
                </Head>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              // AppHead.js

              import { Head } from '@inertiajs/react'

              const Site = ({ title, children }) => {
                return (
                  <Head>
                    <title>{title ? \`\${title} - My App\` : 'My App'}</title>
                    {children}
                  </Head>
                )
              }

              export default Site
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Not supported
            `,
          },
        ]}
      />
      <P>Once you have created the custom component, you may simply start using the custom component in your pages.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import AppHead from './AppHead'

              <AppHead title="About" />
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import AppHead from './AppHead'

              <AppHead title="About">
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Not supported
            `,
          },
        ]}
      />
    </>
  )
}
