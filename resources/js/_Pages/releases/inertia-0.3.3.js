import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.3.3',
}

<H1>inertia@v0.3.3</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 24, 2020</div>

- Added the ability to `return false` from events to prevent default ([#232](https://github.com/inertiajs/inertia/pull/232)).
- Updated the "start" event to call "finish" if cancelled ([commit](https://github.com/inertiajs/inertia/commit/dc1a958b5ceeaa1e3a5266e53d98300fd1f636b3)).
- Fixed bug with scroll region tracking when scrolling the document ([commit](https://github.com/inertiajs/inertia/commit/132399154ef4a70366de1a624f39ef44a9de3f76)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
