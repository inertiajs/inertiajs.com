import React from 'react'
import dedent from 'dedent-js'
import { A, CodeBlock, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.2.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.2.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 8, 2020</div>
      <P>
        This release adds a new array shorthand for nested layouts, thanks to{' '}
        <A href="https://github.com/claudiodekker">@claudiodekker</A> (
        <A href="https://github.com/inertiajs/inertia/pull/201">#201</A>).
      </P>
      <P>Previously, if you wanted nested layouts, you had to use a callback like this:</P>
      <CodeBlock
        language="twig"
        children={dedent`
          <script>
          import SiteLayout from './SiteLayout'
          import NestedLayout from './NestedLayout'\n
          export default {
            layout: (h, page) => {
              return h(SiteLayout, [h(NestedLayout, [page])])
            },
          }
          </script>
        `}
      />
      <P>Using this new array shorthand, you can now do it like this:</P>
      <CodeBlock
        language="twig"
        children={dedent`
          <script>
          import SiteLayout from './SiteLayout'
          import NestedLayout from './NestedLayout'\n
          export default {
            layout: [SiteLayout, NestedLayout],
          }
          </script>
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
