import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 2, 2020</div>
      - Added support for `Responsable` props ([#27](https://github.com/inertiajs/inertia-laravel/pull/27), [#28](https://github.com/inertiajs/inertia-laravel/pull/28), [#70](https://github.com/inertiajs/inertia-laravel/pull/70), [#82](https://github.com/inertiajs/inertia-laravel/pull/82)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
