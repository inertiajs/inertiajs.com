import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Force minimum axios version of <Code>0.21.1</Code> (
      <A href="https://github.com/inertiajs/inertia/pull/409">#409</A>).
    </P>
  </>
)
