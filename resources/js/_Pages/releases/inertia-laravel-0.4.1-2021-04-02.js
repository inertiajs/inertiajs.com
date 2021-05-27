import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.4.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.4.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 2, 2021</div>
      - Add default option to `Inertia::getShared()` method ([#117](https://github.com/inertiajs/inertia-laravel/pull/117)).
      - Add `Inertia::flushShared()` method for clearing all shared data ([#244](https://github.com/inertiajs/inertia-laravel/pull/244)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
