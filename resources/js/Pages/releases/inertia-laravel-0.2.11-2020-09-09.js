import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Revert change in <Code>v0.2.10</Code>, which was broken (
      <A href="https://github.com/inertiajs/inertia-laravel/pull/140">#140</A>).
    </P>
  </>
)
