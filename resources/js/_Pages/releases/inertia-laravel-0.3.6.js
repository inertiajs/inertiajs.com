import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-laravel@v0.3.6',
}

<H1>inertia-laravel@v0.3.6</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 8, 2021</div>

This release updates the `Response` class to make it macroable ([#205](https://github.com/inertiajs/inertia-laravel/pull/205)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
