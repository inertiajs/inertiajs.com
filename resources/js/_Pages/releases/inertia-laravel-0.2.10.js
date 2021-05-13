import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.10',
}

<H1>inertia-laravel@v0.2.10</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 9, 2020</div>

Add the ability to customize the root `div` `id` when using the `@inertia` directive ([#139](https://github.com/inertiajs/inertia-laravel/pull/139)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
