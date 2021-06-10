import React from 'react'
import { A, P } from '@/Components'
import release from '@/Utils/release'

export default release(
  <>
    <P>
      Fixed bug with props that was introduced by disabling layout attribute inheritance (
      <A href="https://github.com/inertiajs/inertia/commit/8ee916703b408db1ff0d4dc318a79a12af566bb4">commit</A>).
    </P>
  </>
)
