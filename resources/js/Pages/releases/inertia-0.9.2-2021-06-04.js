import React from 'react'
import { A, P } from '@/Components'
import release from '@/Utils/release'

export default release(
  <>
    <P>
      Fix double render on initial page load (<A href="https://github.com/inertiajs/inertia/pull/724">#724</A>).
    </P>
  </>
)
