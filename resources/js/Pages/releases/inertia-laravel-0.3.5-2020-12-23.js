import React from 'react'
import release from '@/Utils/release'
import { A, Code, P, Strong } from '@/Components'

export default release(
  <>
    <P>
      This release adds support for the new error bag feature in Inertia.js (
      <A href="https://github.com/inertiajs/inertia/pull/362">#362</A>).
    </P>
    <P>
      If an <Code>errorBag</Code> is defined on an Inertia visit (and sent via the <Code>X-Inertia-Error-Bag</Code>{' '}
      header), this adapter will now automatically scope validation errors to the error bag name provided.
    </P>
    <P>
      Note, it will <Strong>only</Strong> use the visit defined error bag if an error bag isn't already been set
      server-side.
    </P>
  </>
)
