import React from 'react'
import dedent from 'dedent-js'
import { Code, Notice, CodeBlock, H1, H2, Layout, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Title & meta',
  links: [
    { url: '#head-component', name: 'Head component' },
    { url: '#title-shorthand', name: 'Title shorthand' },
    { url: '#multiple-instances', name: 'Multiple instances' },
    { url: '#extending', name: 'Extending' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Title & meta</H1>
      <P>
        Since JavaScript apps are rendered within the document <Code>{'<body>'}</Code>, they are unable to render markup
        to the document <Code>{'<head>'}</Code>, as it's outside of their scope. To help with this, Inertia ships with
        an <Code>{'<Head>'}</Code> component, which can be used to set the page <Code>{'<title>'}</Code>,{' '}
        <Code>{'<meta>'}</Code> tags, and other <Code>{'<head>'}</Code> elements.
      </P>
      <Notice>
        Note, the <Code color="orange">{'<Head>'}</Code> component is not available in the Svelte adapter, as Svelte
        already ships with a <Code color="orange">{'<svelte:head>'}</Code> component.
      </Notice>
      <H2>Head component</H2>
      <P>
        To add <Code>{'<head>'}</Code> elements to your page, use the <Code>{'<Head>'}</Code> component:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/inertia-vue'\n
              <Head>
                <title>Your page title</title>
                <meta name="description" content="Your page description">
              </Head>
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/inertia-vue3'\n
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
              import { Head } from '@inertiajs/inertia-react'\n
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
        You can also pass through the page title as a prop to the <Code>{'<Head>'}</Code> component:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/inertia-vue'\n
              <Head title="Your page title" />
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/inertia-vue3'\n
              <Head title="Your page title" />
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Head } from '@inertiajs/inertia-react'\n
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
      <H2>Multiple instances</H2>
      <P>
        It's possible to have multiple instances of the <Code>{'<Head>'}</Code> component throughout your application.
        For example, your layout can set defaults, and then your pages can overide those defaults.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              // Layout.vue\n
              import { Head } from '@inertiajs/inertia-vue'\n
              <Head>
                <title>My app</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              </Head>\n
              // About.vue\n
              import { Head } from '@inertiajs/inertia-vue'\n
              <Head>
                <title>About - My app</title>
                <meta head-key="description" name="description" content="This is a page specific description" />
              </Head>
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              // Layout.vue\n
              import { Head } from '@inertiajs/inertia-vue3'\n
              <Head>
                <title>My app</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              </Head>\n
              // About.vue\n
              import { Head } from '@inertiajs/inertia-vue3'\n
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
              // Layout.js\n
              import { Head } from '@inertiajs/inertia-react'\n
              <Head>
                <title>My app</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              </Head>\n
              // About.js\n
              import { Head } from '@inertiajs/inertia-react'\n
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
        Inertia will only ever render one <Code>{'<title>'}</Code> tag, however all other tags will be stacked, since
        it's possible to have multiple instances of them. To avoid duplicate tags in your <Code>{'<head>'}</Code>, you
        can use the <Code>head-key</Code> property, which will make sure the tag is only rendered once. This is
        illustrated in the above example for the <Code>{'<meta name="description">'}</Code> tag.
      </P>
      <P>Here is the resulting HTML for this example:</P>
      <CodeBlock
        language="html"
        children={dedent`
          <head>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <title>About - My app</title>
            <meta name="description" content="This is my about page description" />
          </head>
        `}
      />
      <H2>Extending</H2>
      <P>
        In a real app, it can be helpful to create a custom head component that uses the <Code>{'<Head>'}</Code>{' '}
        component. This gives you a place to set app-wide defaults, such as appending the app name to the page title.
        Here's a simple example of what this could look like.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <!-- AppHead.vue -->\n
              <template>
                <Head :title="title ? \`\${title} - My App\` : 'My App'">
                  <slot />
                </Head>
              </template>\n
              <script>
              import { Head } from '@inertiajs/inertia-vue'\n
              export default {
                components: {
                  Head,
                },
                props: {
                  title: String,
                },
              }
              </script>
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <!-- AppHead.vue -->\n
              <template>
                <Head :title="title ? \`\${title} - My App\` : 'My App'">
                  <slot />
                </Head>
              </template>\n
              <script>
              import { Head } from '@inertiajs/inertia-vue3'\n
              export default {
                components: {
                  Head,
                },
                props: {
                  title: String,
                },
              }
              </script>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              // AppHead.js\n
              import React from 'react'
              import { Head } from '@inertiajs/inertia-react'\n
              const Site = ({ title, children }) => {
                return (
                  <Head>
                    <title>{title ? \`\${title} - My App\` : 'My App'}</title>
                    {children}
                  </Head>
                )
              }\n
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
      <P>And then use this custom component in your pages:</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <AppHead title="About" />
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <AppHead title="About" />
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
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

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
