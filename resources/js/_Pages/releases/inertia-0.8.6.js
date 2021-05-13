import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.8.6',
}

<H1>inertia@v0.8.6</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on March 26, 2021</div>

- Added `onBeforeRender()` visit callback ([#410](https://github.com/inertiajs/inertia/pull/410)).
- Add typescript definition for the `errorBag` visit option ([#541](https://github.com/inertiajs/inertia/pull/541)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
