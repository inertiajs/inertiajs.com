import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-vue3@v0.3.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 28, 2020</div>
      - Prevent errors from being cleared on form helper reset ([#375](https://github.com/inertiajs/inertia/pull/375)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
