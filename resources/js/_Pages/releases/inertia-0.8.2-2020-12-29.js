import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.8.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.8.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 29, 2020</div>
      - Fix regression caused by `Inertia.delete()` method signature change ([#378](https://github.com/inertiajs/inertia/issues/378)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
