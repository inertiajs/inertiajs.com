import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Fix issue with <Code>processing</Code> and <Code>progress</Code> form helper state (
      <A href="https://github.com/inertiajs/inertia/pull/635">#635</A>).
    </P>
  </>
)
