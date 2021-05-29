import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.8.7',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.8.7</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 14, 2021</div>
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
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
