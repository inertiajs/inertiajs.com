import React from 'react'
import { A, P } from '@/Components'
import release from '@/Utils/release'

export default release(
  <>
    <P>
      Fix bug when creating a form helper without any data (
      <A href="https://github.com/inertiajs/inertia/pull/601">#601</A>).
    </P>
  </>
)
