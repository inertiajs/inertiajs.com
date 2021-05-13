import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.6',
}

<H1>inertia-laravel@v0.2.6</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 20, 2020</div>

Automatically cast asset version to a string ([#131](https://github.com/inertiajs/inertia-laravel/pull/131)).

Added `laravel/framework` as a dependency ([commit](https://github.com/inertiajs/inertia-laravel/commit/02238454a2799b6578ed1f28a32e379bf1c3eb98)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
