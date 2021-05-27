import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.2.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.2.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 20, 2020</div>
      - Fixed regression with document scroll resetting ([commit](https://github.com/inertiajs/inertia/commit/65d60deb5b3ea3f73dfd912e9aa53ae82f5a989a)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
