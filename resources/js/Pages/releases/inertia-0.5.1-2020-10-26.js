import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Fix bug with non-string URLs, such as <Code>window.location</Code> (
      <A href="https://github.com/inertiajs/inertia/pull/289">#289</A>).
    </P>
  </>
)
