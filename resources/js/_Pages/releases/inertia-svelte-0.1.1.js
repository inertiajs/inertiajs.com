import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-svelte@v0.1.1',
}

<H1>inertia-svelte@v0.1.1</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 7, 2020</div>

- Added support for an `only` prop on `InertiaLink`.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
