import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-vue@v0.1.2',
}

<H1>inertia-vue@v0.1.2</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 28, 2019</div>

- Add support for persistent, nested layouts.
- Add TypeScript typings.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
