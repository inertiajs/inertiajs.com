import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.8.2',
}

<H1>inertia@v0.8.2</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 29, 2020</div>

- Fix regression caused by `Inertia.delete()` method signature change ([#378](https://github.com/inertiajs/inertia/issues/378)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
