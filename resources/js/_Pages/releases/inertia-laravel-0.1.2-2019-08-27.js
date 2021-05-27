import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.1.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.1.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 27, 2019</div>
      Added auto registering of middleware ([#61](https://github.com/inertiajs/inertia-laravel/pull/61)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
