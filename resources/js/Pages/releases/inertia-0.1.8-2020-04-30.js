import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Add <Code>box-sizing: border-box</Code> to modal (
        <A href="https://github.com/inertiajs/inertia/pull/104">#104</A>).
      </Li>
      <Li>
        Add support for lazy <Code>preserveState</Code> and <Code>preserveScroll</Code> evaluation (
        <A href="https://github.com/inertiajs/inertia/pull/135">#135</A>).
      </Li>
    </Ul>
  </>
)
