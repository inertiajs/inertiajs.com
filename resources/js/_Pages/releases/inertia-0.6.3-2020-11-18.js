import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.6.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.6.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on November 18, 2020</div>
      - Bring type declarations up to date.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
