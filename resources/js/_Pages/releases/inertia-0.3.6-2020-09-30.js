import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.3.6',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.6</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 30, 2020</div>
      - Update the promise deprecation warning link ([commit](https://github.com/inertiajs/inertia/commit/a0d0602e307b8d3a5c90af6676de18e44f5577a3)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
