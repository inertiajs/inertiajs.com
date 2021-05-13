import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-vue@v0.3.2',
}

<H1>inertia-vue@v0.3.2</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 13, 2020</div>

- Add new `App` and `Link` named exports.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
