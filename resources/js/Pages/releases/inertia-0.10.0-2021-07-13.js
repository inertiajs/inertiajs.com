import React from 'react'
import release from '@/Utils/release'
import { A, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Add title callback support to Inertia head manager (
        <A href="https://github.com/inertiajs/inertia/pull/753">#753</A>)
      </Li>
      <Li>
        Update types (<A href="https://github.com/inertiajs/inertia/pull/718">#718</A>,{' '}
        <A href="https://github.com/inertiajs/inertia/pull/725">#725</A>,{' '}
        <A href="https://github.com/inertiajs/inertia/pull/738">#738</A>,{' '}
        <A href="https://github.com/inertiajs/inertia/pull/752">#752</A>,{' '}
        <A href="https://github.com/inertiajs/inertia/pull/757">#757</A>).
      </Li>
    </Ul>
  </>
)
