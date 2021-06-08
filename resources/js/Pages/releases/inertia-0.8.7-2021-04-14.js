import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Remove internal <Code>onBeforeRender</Code> event (
        <A href="https://github.com/inertiajs/inertia/pull/628">#628</A>).
      </Li>
      <Li>
        Add "errors" option to <Code>preserveScroll</Code> and <Code>preserveState</Code> (
        <A href="https://github.com/inertiajs/inertia/pull/628">#628</A>).
      </Li>
    </Ul>
    <H2>New "errors" preserve option</H2>
    <P>
      It's very common to want to preserve scrolling or state only in the event that there are validation errors.
      Previously you had to use a callback to do this:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        preserveScroll: (page) => Object.keys(page.props.errors).length > 0,
        preserveState: (page) => Object.keys(page.props.errors).length > 0,
      `}
    />
    <P>
      However, both of these options now support a new <Code>"errors"</Code> option, which does this automatically:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        preserveScroll: "errors",
        preserveState: "errors",
      `}
    />
  </>
)
