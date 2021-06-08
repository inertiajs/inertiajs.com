import React from 'react'
import release from '@/Utils/release'
import { A, Code, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Added new <Code>app</Code> and <Code>link</Code> named exports, and have deprecated <Code>InertiaApp</Code> and{' '}
        <Code>InertiaLink</Code>.
      </Li>
      <Li>
        Updated the <Code>$page</Code> store to return the full <Code>page</Code> object, instead of just the props.
      </Li>
      <Li>
        Added auto update method to <Code>use:inertia</Code> (
        <A href="https://github.com/inertiajs/inertia/pull/230">#230</A>).
      </Li>
      <Li>
        [INTERNAL] Removed <Code>transformProps()</Code> call, since this is now now done in Inertia core.
      </Li>
    </Ul>
    <H2>Breaking changes</H2>
    <P>
      This release updates the <Code>$page</Code> store to return the full <Code>page</Code> object, instead of just the
      page <Code>props</Code>. The purpose of this change is to better reflect what the{' '}
      <A href="/the-protocol#the-page-object">page object</A> is, and to make the other properties within the page
      object available to you, such as the <Code>url</Code>, <Code>version</Code> and <Code>component</Code> name. The
      upgrade path here is straightforward—simply append <Code>.props</Code> to all instances of <Code>$page</Code>.
    </P>
    <P>
      This release also requires version <Code>0.4.0</Code> of the <Code>@inertiajs/inertia</Code> package. Please be
      sure to update your dependencies accordingly.
    </P>
  </>
)
