import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Update <Code>navigate</Code> event to fire after resolving the initial page component (
        <A href="https://github.com/inertiajs/inertia/pull/821">#821</A>).
      </Li>
      <Li>
        Add check to see if a scroll region is available before restoring (
        <A href="https://github.com/inertiajs/inertia/pull/831">#831</A>).
      </Li>
    </Ul>
  </>
)
