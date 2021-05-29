import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Strong, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.6.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.6.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on November 18, 2020</div>
      <Ul>
        <Li>Bring type declarations up to date.</Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
