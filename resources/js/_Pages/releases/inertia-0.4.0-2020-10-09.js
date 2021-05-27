import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.4.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.4.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 9, 2020</div>
      - Updated plain JSON response message in modal.
      - [INTERNAL] Updated to now call `transformProps()`, since this behaviour has been removed from the adapters.
      - [INTERNAL] Updated the `updatePage()` callback be called `swapComponent()`, and changed arguments order.
      - Fixed the TypeScript definitions.
      - Fixed bug where partial reload props would get merged when the page component changed.
      <H2>Breaking change</H2>
      Note, this release makes changes to the internals of Inertia.js, which requires that you also update your respective adapters. The peer dependencies have been updated to reflect this.
      - `@inertiajs/inertia-vue@0.3.0`
      - `@inertiajs/inertia-react@0.3.0`
      - `@inertiajs/inertia-svelte@0.4.0`
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
