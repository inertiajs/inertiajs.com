import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Added new form helper options (<A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
      </Li>
      <Li>
        Updated typescript definition (<A href="https://github.com/inertiajs/inertia/pull/526">#526</A>),{' '}
        <A href="https://github.com/inertiajs/inertia/pull/555">#555</A>).
      </Li>
    </Ul>
    <H2>Form helper options</H2>
    <P>
      The form helper now accepts a second "options" argument. This lets you set a form <Code>key</Code>, needed if
      there are multiple forms on the page. You can also disable the automatic remember behaviour by setting the{' '}
      <Code>remember</Code> option to <Code>false</Code>.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        const form = useForm({
          email: null,
          password: null,
        }, {
          key: 'login',
          remember: false,
        })
      `}
    />
  </>
)
