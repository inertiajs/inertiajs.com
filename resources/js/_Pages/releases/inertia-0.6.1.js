import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.6.1',
}

<H1>inertia@v0.6.1</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 29, 2020</div>

- Fixed bug where including functions or classes when transforming props would cause a history error ([#297](https://github.com/inertiajs/inertia/pull/297)).
- Fixed bug where the `finish` event was firing twice after the first visit ([#307](https://github.com/inertiajs/inertia/pull/307)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
