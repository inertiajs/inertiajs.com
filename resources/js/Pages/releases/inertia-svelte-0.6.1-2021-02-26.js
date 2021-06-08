import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Fix <Code>preserveState</Code> option and <Code>$page</Code> store (
      <A href="https://github.com/inertiajs/inertia/pull/522">#522</A>).
    </P>
  </>
)
