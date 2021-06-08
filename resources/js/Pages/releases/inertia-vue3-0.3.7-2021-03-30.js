import React from 'react'
import release from '@/Utils/release'
import { A, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Fixed bug with form helper remember functionality when working with array and object props (
        <A href="https://github.com/inertiajs/inertia/pull/587">#587</A>).
      </Li>
      <Li>
        Fixed bug causing Vue to throw a warning when using nested layouts (
        <A href="https://github.com/inertiajs/inertia/pull/588">#588</A>).
      </Li>
    </Ul>
  </>
)
