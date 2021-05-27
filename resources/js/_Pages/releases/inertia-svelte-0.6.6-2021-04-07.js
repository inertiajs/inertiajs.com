import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-svelte@v0.6.6',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.6.6</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 7, 2021</div>
      - Add cancel support to form helper ([#612](https://github.com/inertiajs/inertia/pull/612)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
