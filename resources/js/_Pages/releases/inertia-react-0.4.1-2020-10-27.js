import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-react@v0.4.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.4.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 27, 2020</div>
      - Add support for new `onBefore()` event callback in the Inertia link component.
      - Note, you must upgrade `@inertiajs/inertia` to `^0.6.0` to take advantage of the new `onBefore()` event callback.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
