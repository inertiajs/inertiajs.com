import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.4.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.4.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 16, 2020</div>
      - Adds url hash support ([#257](https://github.com/inertiajs/inertia/pull/257)).
      - Fixed scroll restoration for offsite back/forward visits.
      - Fixed `sessionStorage` issues for browsers that have it disabled.
      - Fixed bug where location visits did not respect the `preserveScroll` option.
      - Fixed bug where same-page location visits wouldn't cause a full page reload.
      - Fixed issue where prop transforming could happen twice on the same props.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
