import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.7',
}

<H1>inertia-laravel@v0.2.7</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 21, 2020</div>

Fix regression with asset versioning ([#133](https://github.com/inertiajs/inertia-laravel/pull/133)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
