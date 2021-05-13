import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-vue3@v0.3.10',
}

<H1>inertia-vue3@v0.3.10</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 3, 2021</div>

- Fix bug when creating a form helper without any data ([#601](https://github.com/inertiajs/inertia/pull/601)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
