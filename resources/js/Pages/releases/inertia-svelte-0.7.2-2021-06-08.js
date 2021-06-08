import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Fixed <Code>App.svelte</Code> import in <Code>createInertiaApp()</Code> setup method (
      <A href="https://github.com/inertiajs/inertia/pull/728">#728</A>).
    </P>
  </>
)
