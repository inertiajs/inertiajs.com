import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-react@v0.4.2',
}

<H1>inertia-react@v0.4.2</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on November 13, 2020</div>

- Bring type declarations up to date.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
