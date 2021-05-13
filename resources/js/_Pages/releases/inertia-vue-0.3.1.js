import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-vue@v0.3.1',
}

<H1>inertia-vue@v0.3.1</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 9, 2020</div>

- Add deprecation notice when registering the Inertia Vue plugin via the `app` component ([commit](https://github.com/inertiajs/inertia/commit/1764fd50f46f092e41012bb9846daa07b8a62b15)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
