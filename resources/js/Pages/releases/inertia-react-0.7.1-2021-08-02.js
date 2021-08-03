import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Fix links with <Code>null</Code> or <Code>undefined</Code> URLs (
        <A href="https://github.com/inertiajs/inertia/pull/843">#843</A>).
      </Li>
      <Li>
        Improve TypeScript types (<A href="https://github.com/inertiajs/inertia/pull/817">#817</A>,{' '}
        <A href="https://github.com/inertiajs/inertia/pull/825">#825</A>,{' '}
        <A href="https://github.com/inertiajs/inertia/pull/836">#836</A>).
      </Li>
    </Ul>
  </>
)
