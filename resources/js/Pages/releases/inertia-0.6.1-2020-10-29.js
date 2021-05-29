import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.6.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.6.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 29, 2020</div>
      <Ul>
        <Li>
          Fixed bug where including functions or classes when transforming props would cause a history error (
          <A href="https://github.com/inertiajs/inertia/pull/297">#297</A>).
        </Li>
        <Li>
          Fixed bug where the <Code>finish</Code> event was firing twice after the first visit (
          <A href="https://github.com/inertiajs/inertia/pull/307">#307</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
