import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, CodeBlock, H2, P } from '@/Components'

export default release(
  <>
    <P>
      Disabled automatic remembering of form data and errors in history state (
      <A href="https://github.com/inertiajs/inertia/pull/597">#597</A>).
    </P>
    <H2>Disabled automatic remembering of form data</H2>
    <P>
      This release reverts a recent change that updated the form helper to automatically remember form data and errors
      in history state. While that behaviour was nice, it caused unexpected issues when there are multiple forms on a
      single page.
    </P>
    <P>
      The way to avoid these issues was to provide a unique form key. With this change, form data and errors are only
      remembered when a key is provided.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        // Not remembered
        this.inertia.$form(data)\n
        // Remembered
        this.inertia.$form('CreateUser', data)
      `}
    />
  </>
)
