import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.3.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 30, 2020</div>
      <Ul>
        <Li>
          Add new <Code>Inertia.get()</Code> method (<A href="https://github.com/inertiajs/inertia/pull/239">#239</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
