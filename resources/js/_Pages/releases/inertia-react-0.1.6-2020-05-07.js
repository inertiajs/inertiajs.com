import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-react@v0.1.6',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.1.6</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 7, 2020</div>
      - Added support for an `only` prop on `InertiaLink`.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
