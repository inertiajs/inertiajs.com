import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Fix bug with network-path reference URLs, such as <Code>{'//example.com/endpoint'}</Code> (
      <A href="https://github.com/inertiajs/inertia/commit/609d1828752e0ac031ff615d47a423be1c8cb512">commit</A>).
    </P>
  </>
)
