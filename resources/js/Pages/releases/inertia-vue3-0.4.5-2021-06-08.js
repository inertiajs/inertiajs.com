import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Fix issue with <Code>{'<inertia-head>'}</Code> component in production (
      <A href="https://github.com/inertiajs/inertia/pull/732">#732</A>).
    </P>
  </>
)
