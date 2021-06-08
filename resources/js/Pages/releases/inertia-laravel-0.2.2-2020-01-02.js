import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Added automatic binding of the <Code>ResponseFactory</Code> as a singleton (
      <A href="https://github.com/inertiajs/inertia-laravel/pull/75">#75</A>).
    </P>
  </>
)
