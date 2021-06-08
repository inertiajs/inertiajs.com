import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Add the ability to customize the root <Code>div</Code> <Code>id</Code> when using the <Code>@inertia</Code>{' '}
      directive (<A href="https://github.com/inertiajs/inertia-laravel/pull/139">#139</A>).
    </P>
  </>
)
