import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.3.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 24, 2020</div>
      <Ul>
        <Li>
          Added the ability to <Code>return false</Code> from events to prevent default (
          <A href="https://github.com/inertiajs/inertia/pull/232">#232</A>).
        </Li>
        <Li>
          Updated the "start" event to call "finish" if cancelled (
          <A href="https://github.com/inertiajs/inertia/commit/dc1a958b5ceeaa1e3a5266e53d98300fd1f636b3">commit</A>).
        </Li>
        <Li>
          Fixed bug with scroll region tracking when scrolling the document (
          <A href="https://github.com/inertiajs/inertia/commit/132399154ef4a70366de1a624f39ef44a9de3f76">commit</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
