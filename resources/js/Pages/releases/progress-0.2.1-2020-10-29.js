import React from 'react'
import { A, P } from '@/Components'
import release from '@/Utils/release'

export default release(
  <>
    <P>
      Fixed issue where slow file uploads could cause the progress bar to jump backwards (
      <A href="https://github.com/inertiajs/progress/commit/b8643ba8733d8b08db31bb3ea358880054337b80">commit</A>).
    </P>
  </>
)
