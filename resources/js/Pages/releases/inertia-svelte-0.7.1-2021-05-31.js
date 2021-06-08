import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, P } from '@/Components'

export default release(
  <>
    <P>
      This release adds a new <Code>createInertiaApp()</Code> setup method to make configuring Inertia easier (
      <A href="https://github.com/inertiajs/inertia/pull/698">#698</A>). Here's how to use it:
    </P>
    <P>Before:</P>
    <CodeBlock
      language="js"
      children={dedent`
        import { App } from '@inertiajs/inertia-svelte'\n
        const el = document.getElementById('app')\n
        new App({
          target: el,
          props: {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: name => require(\`./Pages/\${name}.svelte\`),
          },
        })
      `}
    />
    <P>After:</P>
    <CodeBlock
      language="js"
      children={dedent`
        import { createInertiaApp } from '@inertiajs/inertia-svelte'\n
        createInertiaApp({
          resolve: (name) => import(\`@/Pages/\${name}.svelte\`),
          setup({ el, App, props }) {
            new App({ target: el, props })
          },
        })
      `}
    />
    <P>
      By default Inertia uses <Code>app</Code> as the root element that your app will boot in. However, you can change
      this using the <Code>id</Code> property:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        createInertiaApp({
          id: 'my-custom-div',
        })
      `}
    />
  </>
)
