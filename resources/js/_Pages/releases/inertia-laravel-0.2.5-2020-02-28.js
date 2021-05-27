import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on February 28, 2020</div>
      Added `Arrayable` support for nested props ([#102](https://github.com/inertiajs/inertia-laravel/pull/102)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
