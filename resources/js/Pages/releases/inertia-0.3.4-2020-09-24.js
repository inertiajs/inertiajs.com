import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Reverted <Code>0.3.3</Code> change that fired a <Code>finish</Code> event if the <Code>start</Code> event was
        cancelled (<A href="https://github.com/inertiajs/inertia/commit/dc1a958">commit</A>).
      </Li>
      <Li>
        Added the ability to cancel a visit from the <Code>onStart()</Code> callback (
        <A href="https://github.com/inertiajs/inertia/pull/233">#233</A>).
      </Li>
    </Ul>
  </>
)
