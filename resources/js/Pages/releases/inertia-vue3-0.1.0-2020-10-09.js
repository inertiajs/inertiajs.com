import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue3@v0.1.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.1.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 9, 2020</div>
      <P>
        This is the initial release of the new <Code>@inertiajs/inertia-vue3</Code> adapter. 🎉
      </P>
      <H2>How to install</H2>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install @inertiajs/inertia @inertiajs/inertia-vue3
          yarn add @inertiajs/inertia @inertiajs/inertia-vue3
        `}
      />
      <P>
        This adapter requires version <Code>0.4.0</Code> of the <Code>@inertiajs/inertia</Code> package.
      </P>
      <P>
        Note, Vue 3 isn't supported in Laravel Mix 5. You'll need to use{' '}
        <A href="https://github.com/JeffreyWay/laravel-mix/releases/tag/v6.0.0-alpha.0">Laravel Mix 6</A> (currently in
        alpha).
      </P>
      <H2>How to setup</H2>
      <CodeBlock
        language="js"
        children={dedent`
          import { createApp, h } from 'vue'
          import { app, plugin } from '@inertiajs/inertia-vue3'\n
          const el = document.getElementById('app')\n
          createApp({
            render: () =>
              h(app, {
                initialPage: JSON.parse(el.dataset.page),
                resolveComponent: (name) => import(\@/Pages/\${name}\).then((module) => module.default),
              }),
          })
            .use(plugin)
            .mount(el)
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
