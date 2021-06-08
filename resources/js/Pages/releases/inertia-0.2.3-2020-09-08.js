import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, CodeBlock, P } from '@/Components'

export default release(
  <>
    <P>
      This release adds the ability to define custom headers on Inertia requests, thanks to the work of{' '}
      <A href="https://github.com/claudiodekker">@claudiodekker</A>) (
      <A href="https://github.com/inertiajs/inertia/pull/202">#202</A>).
    </P>
    <P>Here is how this is done:</P>
    <CodeBlock
      language="js"
      children={dedent`
        this.$inertia.visit('/users', {
          headers: {
            'Custom-Header': 'value',
          },
        })\n
        this.$inertia.post('/users', this.form, {
          headers: {
            'Custom-Header': 'value',
          },
        })
      `}
    />
  </>
)
