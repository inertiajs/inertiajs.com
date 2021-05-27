import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-svelte@v0.6.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.6.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on February 26, 2021</div>
      - Fix `preserveState` option and `$page` store ([#522](https://github.com/inertiajs/inertia/pull/522)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
