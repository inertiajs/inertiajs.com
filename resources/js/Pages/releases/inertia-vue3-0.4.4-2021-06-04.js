import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Fix rendering of fragments in <Code>{'<inertia-head>'}</Code> component (
      <A href="https://github.com/inertiajs/inertia/pull/723">#723</A>).
    </P>
  </>
)
