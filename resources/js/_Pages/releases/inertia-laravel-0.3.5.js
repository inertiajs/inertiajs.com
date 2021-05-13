import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-laravel@v0.3.5',
}

<H1>inertia-laravel@v0.3.5</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 23, 2020</div>

This release adds support for the new error bag feature in Inertia.js ([#362](https://github.com/inertiajs/inertia/pull/362)).

If an `errorBag` is defined on an Inertia visit (and sent via the `X-Inertia-Error-Bag` header), this adapter will now automatically scope validation errors to the error bag name provided.

Note, it will **only** use the visit defined error bag if an error bag isn't already been set server-side.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
