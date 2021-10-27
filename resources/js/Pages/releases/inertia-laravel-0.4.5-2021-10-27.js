import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Fixes PHP 8.1 <Code>explode</Code> deprecation error (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/311">#311</A>).
      </Li>
    </Ul>
  </>
)
