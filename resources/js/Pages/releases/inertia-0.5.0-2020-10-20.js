import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.5.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.5.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 20, 2020</div>
      <Ul>
        <Li>
          Update <Code>visit()</Code> method to merge data into the URL query string for <Code>GET</Code> requests (
          <A href="https://github.com/inertiajs/inertia/pull/264">#264</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
