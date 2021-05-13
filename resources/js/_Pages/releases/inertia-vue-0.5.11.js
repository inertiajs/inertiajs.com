import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-vue@v0.5.11',
}

<H1>inertia-vue@v0.5.11</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 14, 2021</div>

- Remove dependency on deprecated `onBeforeRender` event ([#628](https://github.com/inertiajs/inertia/pull/628)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
