import React from 'react'
import release from '@/Utils/release'
import { A, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Fixed issue where the form helper would set state on an unmounted component (
        <A href="https://github.com/inertiajs/inertia/pull/762">#762</A>).
      </Li>
      <Li>
        Fixed issue with the form helper where resetting a single field would remove all other fields (
        <A href="https://github.com/inertiajs/inertia/pull/802">#802</A>).
      </Li>
    </Ul>
  </>
)
