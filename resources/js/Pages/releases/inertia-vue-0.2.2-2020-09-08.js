import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, CodeBlock, P } from '@/Components'

export default release(
  <>
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
            return h(Site[h(Nested[page])])
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
          layout: [SiteNestedLayout],
        }
        </script>
      `}
    />
  </>
)
