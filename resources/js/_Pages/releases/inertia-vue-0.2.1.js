import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-vue@v0.2.1',
}

<H1>inertia-vue@v0.2.1</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 1, 2020</div>

- Add the ability to pass root template slots to Vue ([#198](https://github.com/inertiajs/inertia/pull/198)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
