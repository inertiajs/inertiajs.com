import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.3.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 30, 2020</div>
      - Add new `Inertia.get()` method ([#239](https://github.com/inertiajs/inertia/pull/239)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
