import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 2, 2020</div>
      Added automatic binding of the `ResponseFactory` as a singleton ([#75](https://github.com/inertiajs/inertia-laravel/pull/75)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
