import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-laravel@v0.4.2',
}

<H1>inertia-laravel@v0.4.2</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 10, 2021</div>

- Register macros on `register` to avoid race condition ([#262](https://github.com/inertiajs/inertia-laravel/pull/262)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
