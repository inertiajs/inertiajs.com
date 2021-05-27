import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.5.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.5.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 26, 2020</div>
      - Fix bug with non-string URLs, such as `window.location` ([#289](https://github.com/inertiajs/inertia/pull/289)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
