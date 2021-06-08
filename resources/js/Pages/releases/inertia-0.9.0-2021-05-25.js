import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, P, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Convert library to TypeScript (<A href="https://github.com/inertiajs/inertia/pull/592">#592</A>).
      </Li>
      <Li>
        Add check for <Code>FormData</Code> when determining if a visit includes files (
        <A href="https://github.com/inertiajs/inertia/pull/668">#668</A>).
      </Li>
      <Li>
        Fix <Code>mergeDataIntoQueryString</Code> method to not change the URL path (
        <A href="https://github.com/inertiajs/inertia/pull/556">#556</A>).
      </Li>
      <Li>
        Add new head manager, used by the new head components in the adapters (
        <A href="https://github.com/inertiajs/inertia/pull/652">#652</A>).
      </Li>
    </Ul>
    <P>This is a breaking change, and requires that you also update to the latest adapter version:</P>
    <Ul>
      <Li>
        <A href="/releases/inertia-vue-0.6.0-2021-05-25">inertia-vue@0.6.0</A>
      </Li>
      <Li>
        <A href="/releases/inertia-vue3-0.4.0-2021-05-25">inertia-vue3@0.4.0</A>
      </Li>
      <Li>
        <A href="/releases/inertia-react-0.6.0-2021-05-25">inertia-react@0.6.0</A>
      </Li>
      <Li>
        <A href="/releases/inertia-svelte-0.7.0-2021-05-25">inertia-svelte@0.7.0</A>
      </Li>
    </Ul>
  </>
)
