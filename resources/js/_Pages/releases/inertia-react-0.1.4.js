import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-react@v0.1.4',
}

<H1>inertia-react@v0.1.4</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 16, 2019</div>

- Add support for persistent layouts.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
