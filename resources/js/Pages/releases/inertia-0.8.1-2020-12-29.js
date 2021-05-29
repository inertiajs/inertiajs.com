import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.8.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.8.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 29, 2020</div>
      <Ul>
        <Li>
          Add support for <Code>axios@0.21.0</Code>.
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
