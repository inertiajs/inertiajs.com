import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Rename <Code>InertiaHead</Code> key from <Code>inertia</Code> to <Code>head-key</Code> (
      <A href="https://github.com/inertiajs/inertia/pull/704">#704</A>).
    </P>
  </>
)
