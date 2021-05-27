import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.4.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.4.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 16, 2020</div>
      - Fix bug caused by promise deprecation warning ([#262](https://github.com/inertiajs/inertia/pull/262)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
