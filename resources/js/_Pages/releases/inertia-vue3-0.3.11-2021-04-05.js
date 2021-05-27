import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-vue3@v0.3.11',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.11</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 5, 2021</div>
      - Fix bug with form helper remember key ([#603](https://github.com/inertiajs/inertia/issues/603)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
