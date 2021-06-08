import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Automatically cast asset version to a string (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/131">#131</A>).
      </Li>
      <Li>
        Added <Code>laravel/framework</Code> as a dependency (
        <A href="https://github.com/inertiajs/inertia-laravel/commit/02238454a2799b6578ed1f28a32e379bf1c3eb98">
          commit
        </A>
        ).
      </Li>
    </Ul>
  </>
)
