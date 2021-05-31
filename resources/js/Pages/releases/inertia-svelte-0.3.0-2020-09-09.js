import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-svelte@v0.3.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.3.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 9, 2020</div>
      <P>
        This is a big release thanks to the excellent work done by{' '}
        <A href="https://github.com/pedroborges">@pedroborges</A>, the maintainer of the Svelte adapter. 👏
      </P>
      <H2>Persistent layouts</H2>
      <P>
        This release adds support for persistent layouts (#203). Page components can now declare a persistent layout
        from inside the <Code>{'<script context="module">'}</Code> block:
      </P>
      <CodeBlock
        language="svelte"
        children={dedent`
          <script context="module">
            import Layout from '@/Shared/Layout.svelte'
            export const layout = Layout
          </script>
        `}
      />
      <P>Alternatively, you can also use the short array syntax to declare nested layouts:</P>
      <CodeBlock
        language="svelte"
        children={dedent`
          <script context="module">
            import Layout from '@/Shared/Layout.svelte'
            import DashboardLayout from '@/Shared/DashboardLayout.svelte'
            export const layout = [Layout, DashboardLayout]
          </script>
        `}
      />
      <P>
        This is a breaking change (hence the <Code>0.3.0</Code> release), since it requires that the{' '}
        <Code>resolveComponent</Code> closure passed to <Code>InertiaApp</Code> return the page module and not just the
        default export.
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
          import { InertiaApp } from '@inertiajs/inertia-svelte'\n
          const app = document.getElementById('app')\n
          new InertiaApp({
            target: app,
            props: {
              initialPage: JSON.parse(app.dataset.page),
              resolveComponent: name =>
          -      import(\`@/Pages/\${name}.svelte\`).then(module => module.default),
          +      import(\`@/Pages/\${name}.svelte\`),
            },
          })
        `}
      />
      <H2>New "use:inertia" directive</H2>
      <P>
        This release also includes a new <Code>use:inertia</Code> directive (#206), which can be used instead of the{' '}
        <Code>InertiaLink</Code> component to add Inertia behaviour to any element.
      </P>
      <CodeBlock
        language="svelte"
        children={dedent`
          <script>
            import { inertia } from '@inertiajs/inertia-svelte'
          </script>\n
          <a href="/users" use:inertia>Users</a>\n
          <button
            use:inertia={{ href: '/users/100', method: 'post', data: { '_method': 'delete' }}}
            class="btn-indigo"
            on:click={() => alert('User deleted')}>
            Delete
          </button>\n
          <a
            href="/users/100"
            use:inertia={{ method: 'post', data: { '_method': 'put', 'visited': true }}}>
            Visited
          </a>
        `}
      />
      <H2>Headers prop</H2>
      <P>
        Finally, this release includes the addition of a new <Code>headers</Code> prop on the <Code>InertiaLink</Code>{' '}
        component (#204).
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          <InertiaLink href="/" headers={{ foo: bar }}>
            Home
          </InertiaLink>
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
