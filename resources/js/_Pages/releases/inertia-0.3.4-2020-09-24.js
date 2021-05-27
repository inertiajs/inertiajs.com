import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.3.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 24, 2020</div>
      - Reverted `0.3.3` change that fired a `finish` event if the `start` event was cancelled ([commit](https://github.com/inertiajs/inertia/commit/dc1a958)).
      - Added the ability to cancel a visit from the `onStart()` callback ([#233](https://github.com/inertiajs/inertia/pull/233)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
