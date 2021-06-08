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
        import { createApp, h } from 'vue'
        import { App, plugin } from '@inertiajs/inertia-vue3'\n
        const el = document.getElementById('app')\n
        createApp({
          render: () => h(App, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: name => require(\`./Pages/\${name}\`).default,
          })
        }).use(plugin).mount(el)
      `}
    />
    <P>After:</P>
    <CodeBlock
      language="js"
      children={dedent`
        import { createApp, h } from 'vue'
        import { createInertiaApp } from '@inertiajs/inertia-vue3'\n
        createInertiaApp({
          resolve: (name) => import(\`./Pages/\${name}\`),
          setup({ el, app, props, plugin }) {
            createApp({ render: () => h(app, props) })
              .use(plugin)
              .mount(el)
          },
        })
      `}
    />
    <P>
      Note that you no longer need to manually return the <Code>default</Code> export, as Inertia now handles this
      automatically.
    </P>
    <CodeBlock
      language="diff"
      children={dedent`
        createInertiaApp({
        - resolve: name => require(\`./Pages/\${name}\`).default,
        + resolve: name => require(\`./Pages/\${name}\`),
        })
      `}
    />
    <P>Same goes for if you're using code splitting:</P>
    <CodeBlock
      language="diff"
      children={dedent`
        createInertiaApp({
        - resolve: name => import(\`./Pages/\${name}\`).then(module => module.default),
        + resolve: name => import(\`./Pages/\${name}\`),
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
