import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-svelte@v0.1.0',
}

<H1>inertia-svelte@v0.1.0</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 15, 2019</div>

- Initial release.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
