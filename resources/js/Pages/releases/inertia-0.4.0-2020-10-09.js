import React from 'react'
import release from '@/Utils/release'
import { Code, H2, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>Updated plain JSON response message in modal.</Li>
      <Li>
        [INTERNAL] Updated to now call <Code>transformProps()</Code>, since this behaviour has been removed from the
        adapters.
      </Li>
      <Li>
        [INTERNAL] Updated the <Code>updatePage()</Code> callback be called <Code>swapComponent()</Code>, and changed
        arguments order.
      </Li>
      <Li>Fixed the TypeScript definitions.</Li>
      <Li>Fixed bug where partial reload props would get merged when the page component changed.</Li>
    </Ul>
    <H2>Breaking change</H2>
    Note, this release makes changes to the internals of Inertia.js, which requires that you also update your respective
    adapters. The peer dependencies have been updated to reflect this.
    <Ul>
      <Li>
        <Code>@inertiajs/inertia-vue@0.3.0</Code>
      </Li>
      <Li>
        <Code>@inertiajs/inertia-react@0.3.0</Code>
      </Li>
      <Li>
        <Code>@inertiajs/inertia-svelte@0.4.0</Code>
      </Li>
    </Ul>
  </>
)
