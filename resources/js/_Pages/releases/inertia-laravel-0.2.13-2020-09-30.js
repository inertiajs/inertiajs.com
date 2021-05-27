import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.13',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.13</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 30, 2020</div>
      Add check for `appendMiddlewareToGroup()` method when registering middleware ([#152](https://github.com/inertiajs/inertia-laravel/pull/152)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
