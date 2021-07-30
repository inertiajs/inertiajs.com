import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Add <Code>jsx</Code> as a default page extension (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/229">#229</A>).
      </Li>
      <Li>
        Add the ability to chain the root view (<A href="https://github.com/inertiajs/inertia-laravel/pull/280">#280</A>
        ).
      </Li>
    </Ul>
  </>
)
