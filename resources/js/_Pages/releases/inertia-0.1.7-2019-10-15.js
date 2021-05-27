import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.1.7',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.1.7</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 15, 2019</div>
      - Fix bug with scroll position not resetting ([#87](https://github.com/inertiajs/inertia/pull/87)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
