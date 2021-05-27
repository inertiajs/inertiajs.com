import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-vue3@v0.3.8',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.8</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 1, 2021</div>
      - Fixed bugs with the remember functionality ([#591](https://github.com/inertiajs/inertia/pull/591), [#593](https://github.com/inertiajs/inertia/pull/593), [c6f2f74](https://github.com/inertiajs/inertia/commit/c6f2f74c8e6f3bae7eda8b39d6812f1cf447f3e8)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
