import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.5.2',
}

<H1>inertia@v0.5.2</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 27, 2020</div>

- Fix bug with network-path reference URLs, such as `//example.com/endpoint` ([commit](https://github.com/inertiajs/inertia/commit/609d1828752e0ac031ff615d47a423be1c8cb512)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
