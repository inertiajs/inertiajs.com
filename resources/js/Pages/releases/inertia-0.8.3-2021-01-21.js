import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Use remember history state when visiting the same component and preserving state (
        <A href="https://github.com/inertiajs/inertia/commit/395ddaa5d3953549d681206e7038f13d77a23610">commit</A>).
      </Li>
      <Li>
        Add TypeScript definition for <Code>onError</Code> (
        <A href="https://github.com/inertiajs/inertia/pull/390">#390</A>).
      </Li>
      <Li>
        Add <Code>forceFormData</Code> visit option to force <Code>FormData</Code> encoding (
        <A href="https://github.com/inertiajs/inertia/pull/407">#407</A>).
      </Li>
      <Li>
        Pass <Code>visit</Code> to <Code>onFinish()</Code> callback (
        <A href="https://github.com/inertiajs/inertia/commit/896c53bb0e80bb6ba56e588a3afe665fa8aa0498">commit</A>).
      </Li>
    </Ul>
  </>
)
