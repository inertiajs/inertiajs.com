import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Added <Code>onBeforeRender()</Code> visit callback (
        <A href="https://github.com/inertiajs/inertia/pull/410">#410</A>).
      </Li>
      <Li>
        Add typescript definition for the <Code>errorBag</Code> visit option (
        <A href="https://github.com/inertiajs/inertia/pull/541">#541</A>).
      </Li>
    </Ul>
  </>
)
