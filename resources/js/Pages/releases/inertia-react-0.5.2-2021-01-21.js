import React from 'react'
import release from '@/Utils/release'
import { Code, P } from '@/Components'

export default release(
  <>
    <P>
      Rename <Code>useRememberedState</Code> hook to <Code>useRemember</Code>, and deprecate{' '}
      <Code>useRememberedState</Code>.
    </P>
  </>
)
