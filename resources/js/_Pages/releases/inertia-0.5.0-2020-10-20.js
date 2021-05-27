import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.5.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.5.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 20, 2020</div>
      - Update `visit()` method to merge data into the URL query string for `GET` requests ([#264](https://github.com/inertiajs/inertia/pull/264)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
