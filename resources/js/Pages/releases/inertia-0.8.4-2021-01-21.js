import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.8.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.8.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 21, 2021</div>
      <Ul>
        <Li>
          Force minimum axios version of <Code>0.21.1</Code> (
          <A href="https://github.com/inertiajs/inertia/pull/409">#409</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
