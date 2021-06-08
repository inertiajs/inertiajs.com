import React from 'react'
import release from '@/Utils/release'
import { Code, P } from '@/Components'

export default release(
  <>
    <P>
      Update <Code>delete()</Code> method to automatically set <Code>preserveState</Code> to <Code>true</Code> by
      default.
    </P>
  </>
)
