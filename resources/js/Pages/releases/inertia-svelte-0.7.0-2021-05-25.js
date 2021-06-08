import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, P, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Fix <Code>InertiaLink</Code> component to not change the URL path (
        <A href="https://github.com/inertiajs/inertia/pull/556">#556</A>).
      </Li>
      <Li>
        Add <Code>isDirty</Code> property to the form helper (
        <A href="https://github.com/inertiajs/inertia/pull/660">#660</A>).
      </Li>
      <Li>
        Reset form helper on visit exception (<A href="https://github.com/inertiajs/inertia/pull/682">#682</A>).
      </Li>
      <Li>
        Fix bug with using custom <Code>onCancelToken</Code> callbacks in form helper (
        <A href="https://github.com/inertiajs/inertia/pull/645">#645</A>).
      </Li>
      <Li>Update adapter to be SSR compatible.</Li>
      <Li>
        Make page props available to persistent layouts as props (
        <A href="https://github.com/inertiajs/inertia/pull/602">#602</A>).
      </Li>
      <Li>
        Remove <Code>transformProps()</Code> and <Code>resolveErrors()</Code> (
        <A href="https://github.com/inertiajs/inertia/pull/693">#693</A>).
      </Li>
    </Ul>
    <P>
      This is a breaking change that requires also updating to{' '}
      <A href="/releases/inertia-0.9.0-2021-05-25">inertia@0.9.0</A>.
    </P>
  </>
)
