import { H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.1.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.1.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 13, 2019</div>
      <Ul>
        <Li>Early development release.</Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
