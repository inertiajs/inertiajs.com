import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.3.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 24, 2020</div>
      - Add support for `axios@0.20.0`.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
