import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-react@v0.1.2',
}

<H1>inertia-react@v0.1.2</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 14, 2019</div>

- Update dependencies.
- Remove Inertia core export from typings.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
