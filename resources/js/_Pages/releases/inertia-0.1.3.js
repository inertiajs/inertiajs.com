import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.1.3',
}

<H1>inertia@v0.1.3</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 14, 2019</div>

- Early development release.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
