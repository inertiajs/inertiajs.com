import React from 'react'
import dedent from 'dedent-js'
import { A, Code, Notice, CodeBlock, H1, H2, Layout, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Title & meta',
  links: [
    { url: '#head-component', name: 'Head component' },
    { url: '#title-shorthand', name: 'Title shorthand' },
    { url: '#multiple-instances', name: 'Multiple instances' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Title & meta</H1>
      <P>
        Since JavaScript apps are rendered within the document <Code>{'<body>'}</Code>, they are unable to render markup
        to the document <Code>{'<head>'}</Code>, as it's outside of their scope. To help with this, Inertia ships with
        an <Code>{'<inertia-head>'}</Code> component, which can be used to set the page <Code>{'<title>'}</Code>,{' '}
        <Code>{'<meta>'}</Code> tags, and other <Code>{'<head>'}</Code> elements.
      </P>
      <Notice>
        Note, the <Code color="orange">{'<inertia-head>'}</Code> component is not available in the Svelte adapter, as
        Svelte already ships with a <Code color="orange">{'<svelte:head>'}</Code> component.
      </Notice>
      <H2>Head component</H2>
      <P>
        To add <Code>{'<head>'}</Code> elements to your page, use the <Code>{'<inertia-head>'}</Code> component:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <inertia-head>
                <title>Your page title</title>
                <meta name="description" content="Your page description">
              </inertia-head>
            `,
            description: 'The <inertia-head> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <inertia-head>
                <title>Your page title</title>
                <meta name="description" content="Your page description">
              </inertia-head>
            `,
            description: 'The <inertia-head> component is automatically registered by the Inertia plugin.',
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaHead } from '@inertiajs/inertia-react'\n
              <InertiaHead>
                <title>Your page title</title>
                <meta name="description" content="Your page description" />
              </InertiaHead>
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
        You can also pass through the page title as a prop to the <Code>{'<inertia-head>'}</Code> component:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <inertia-head title="Your page title" />
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <inertia-head title="Your page title" />
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { InertiaHead } from '@inertiajs/inertia-react'\n
              <InertiaHead title="Your page title" />
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
        It's possible to have multiple instances of the <Code>{'<inertia-head>'}</Code> component throughout your
        application. For example, your layout can set defaults, and then your pages can overide those defaults.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <!-- Layout.vue -->\n
              <inertia-head>
                <title>My app</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              </inertia-head>\n
              <!-- About.vue -->\n
              <inertia-head>
                <title>About - My app</title>
                <meta head-key="description" name="description" content="This is a page specific description" />
              </inertia-head>
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <!-- Layout.vue -->\n
              <inertia-head>
                <title>My app</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              </inertia-head>\n
              <!-- About.vue -->\n
              <inertia-head>
                <title>About - My app</title>
                <meta head-key="description" name="description" content="This is a page specific description" />
              </inertia-head>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              // Layout.js\n
              import { InertiaHead } from '@inertiajs/inertia-react'\n
              <InertiaHead>
                <title>My app</title>
                <meta head-key="description" name="description" content="This is the default description" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              </InertiaHead>\n
              // About.js\n
              import { InertiaHead } from '@inertiajs/inertia-react'\n
              <InertiaHead>
                <title>About - My app</title>
                <meta head-key="description" name="description" content="This is a page specific description" />
              </InertiaHead>
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
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
