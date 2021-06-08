import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Update <Code>visit()</Code> method to merge data into the URL query string for <Code>GET</Code> requests (
      <A href="https://github.com/inertiajs/inertia/pull/264">#264</A>).
    </P>
  </>
)
