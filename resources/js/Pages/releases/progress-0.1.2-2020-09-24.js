import React from 'react'
import { A, P } from '@/Components'
import release from '@/Utils/release'

export default release(
  <>
    <P>
      Prevent progress from starting if the "start" event was cancelled (
      <A href="https://github.com/inertiajs/progress/commit/1acfcc87c619120bc2c3ad6782c4881faa09ddb7">commit</A>).
    </P>
  </>
)
