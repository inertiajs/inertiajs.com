import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-vue3@v0.3.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 21, 2021</div>
      - Add `useRemember` hook.
      - Fix `remember` serialization.
      - Add `GET` support to the form helper.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
