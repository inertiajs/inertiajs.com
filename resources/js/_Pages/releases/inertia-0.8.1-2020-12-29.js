import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.8.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.8.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 29, 2020</div>
      - Add support for `axios@0.21.0`.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
