import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.1.5',
}

<H1>inertia@v0.1.5</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 28, 2019</div>

- Add scroll regions to allow scroll resetting of custom scroll containers.
- Fix remember bug caused by missing cache property.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
