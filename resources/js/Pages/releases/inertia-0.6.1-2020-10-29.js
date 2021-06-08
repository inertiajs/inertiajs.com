import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Fixed bug where including functions or classes when transforming props would cause a history error (
        <A href="https://github.com/inertiajs/inertia/pull/297">#297</A>).
      </Li>
      <Li>
        Fixed bug where the <Code>finish</Code> event was firing twice after the first visit (
        <A href="https://github.com/inertiajs/inertia/pull/307">#307</A>).
      </Li>
    </Ul>
  </>
)
