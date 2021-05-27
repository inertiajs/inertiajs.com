import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-svelte@v0.1.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.1.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 8, 2020</div>
      - Fix regression related to `only` props.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
