import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-vue3@v0.3.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 29, 2020</div>
      - Add `wasSuccessful` property to form helper ([#380](https://github.com/inertiajs/inertia/pull/380)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
