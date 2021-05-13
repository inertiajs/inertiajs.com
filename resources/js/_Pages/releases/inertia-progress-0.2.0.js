import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-progress@v0.2.0',
}

<H1>inertia-progress@v0.2.0</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 27, 2020</div>

<H2>Changes</H2>

- Updates the library to use the improved `finish` event handling in `@inertiajs/inertia` version [0.6.0](/releases/inertia-0.6.0).
- Made all internal methods private, leaving only `InertiaProgress.init()` public.

<H2>Upgrade instructions</H2>

Note, you must upgrade `@inertiajs/inertia` to `^0.6.0` to use this version.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
