import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Automatically register the Inertia middleware in the <Code>web</Code> middleware group, instead of in the global
      middleware stack (<A href="https://github.com/inertiajs/inertia-laravel/pull/147">#147</A>).
    </P>
  </>
)
