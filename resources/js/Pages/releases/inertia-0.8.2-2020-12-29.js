import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Fix regression caused by <Code>Inertia.delete()</Code> method signature change (
      <A href="https://github.com/inertiajs/inertia/issues/378">#378</A>).
    </P>
  </>
)
