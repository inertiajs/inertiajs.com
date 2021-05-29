import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.4.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.4.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 16, 2020</div>
      <Ul>
        <Li>
          Adds url hash support (<A href="https://github.com/inertiajs/inertia/pull/257">#257</A>).
        </Li>
        <Li>Fixed scroll restoration for offsite back/forward visits.</Li>
        <Li>
          Fixed <Code>sessionStorage</Code> issues for browsers that have it disabled.
        </Li>
        <Li>
          Fixed bug where location visits did not respect the <Code>preserveScroll</Code> option.
        </Li>
        <Li>Fixed bug where same-page location visits wouldn't cause a full page reload.</Li>
        <Li>Fixed issue where prop transforming could happen twice on the same props.</Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
