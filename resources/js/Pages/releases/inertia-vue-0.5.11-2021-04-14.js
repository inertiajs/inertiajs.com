import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Remove dependency on deprecated <Code>onBeforeRender</Code> event (
      <A href="https://github.com/inertiajs/inertia/pull/628">#628</A>).
    </P>
  </>
)
