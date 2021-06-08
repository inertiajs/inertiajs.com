import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Add default option to <Code>Inertia::getShared()</Code> method (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/117">#117</A>).
      </Li>
      <Li>
        Add <Code>Inertia::flushShared()</Code> method for clearing all shared data (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/244">#244</A>).
      </Li>
    </Ul>
  </>
)
