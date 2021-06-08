import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <H2>Changes</H2>
    <Ul>
      <Li>
        Update Inertia link <Code>preserveState</Code> default to be based on the method (
        <A href="https://github.com/inertiajs/inertia/pull/263">#263</A>).
      </Li>
      <Li>
        Update Inertia link to merge data into the URL query string (<Code>href</Code>) for <Code>GET</Code> requests (
        <A href="https://github.com/inertiajs/inertia/pull/264">#264</A>).
      </Li>
    </Ul>
    <H2>Deprecations</H2>
    <P>
      Inertia now shows a console warning if you create an Inertia link that uses a method other than <Code>GET</Code>.
      This is due to accessibility issues that come with using anchor links for non-GET requests, which you can read
      more about here: #268.
    </P>
    <P>
      To hide this console warning, use the <Code>inertia</Code> directive instead to set a more appropriate element,
      such as a <Code>{'<button>'}</Code>. For example:
    </P>
    <CodeBlock
      language="diff"
      children={dedent`
        - <InertiaLink href="/logout" method="post">Logout</InertiaLink>
        + <button use:inertia={{ method: 'post', href: '/logout' }} type="button">Logout</button>
      `}
    />
    <H2>Breaking changes</H2>
    <P>
      This release depends on changes made to the internals of Inertia, which requires updating{' '}
      <Code>@inertiajs/inertia</Code> to <Code>^0.5.0</Code>. The peer dependencies have been updated to reflect this.
    </P>
  </>
)
