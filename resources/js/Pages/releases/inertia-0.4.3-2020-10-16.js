import React from 'react'
import { A, P } from '@/Components'
import release from '@/Utils/release'

export default release(
  <>
    <P>
      Fix bug caused by promise deprecation warning (<A href="https://github.com/inertiajs/inertia/pull/262">#262</A>).
    </P>
  </>
)
