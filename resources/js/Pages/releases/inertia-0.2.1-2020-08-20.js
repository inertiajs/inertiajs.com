import React from 'react'
import { A, P } from '@/Components'
import release from '@/Utils/release'

export default release(
  <>
    <P>
      Fixed regression with document scroll resetting (
      <A href="https://github.com/inertiajs/inertia/commit/65d60deb5b3ea3f73dfd912e9aa53ae82f5a989a">commit</A>).
    </P>
  </>
)
