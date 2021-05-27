import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-svelte@v0.3.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.3.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 24, 2020</div>
      - Update `@inertiajs/inertia` peer dependency to include `v0.3.0`.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
