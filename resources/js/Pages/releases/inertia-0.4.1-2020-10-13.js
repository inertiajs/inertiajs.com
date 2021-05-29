import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.4.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.4.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 13, 2020</div>
      <Ul>
        <Li>
          Update <Code>delete()</Code> method to automatically set <Code>preserveState</Code> to <Code>true</Code> by
          default.
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
