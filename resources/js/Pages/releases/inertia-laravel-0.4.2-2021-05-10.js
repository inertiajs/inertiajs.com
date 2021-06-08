import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Register macros on <Code>register</Code> to avoid race condition (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/262">#262</A>).
      </Li>
    </Ul>
  </>
)
