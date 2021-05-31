import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Li, P, Ul } from '@/Components'

const meta = {
  title: 'inertia-react@v0.5.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.5.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on March 26, 2021</div>
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
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
