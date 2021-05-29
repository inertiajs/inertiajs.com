import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.3.6',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.6</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 30, 2020</div>
      <Ul>
        <Li>
          Update the promise deprecation warning link (
          <A href="https://github.com/inertiajs/inertia/commit/a0d0602e307b8d3a5c90af6676de18e44f5577a3">commit</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
