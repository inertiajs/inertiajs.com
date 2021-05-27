import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia@v0.1.8',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.1.8</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 30, 2020</div>
      - Add `box-sizing: border-box` to modal ([#104](https://github.com/inertiajs/inertia/pull/104))
      - Add support for lazy `preserveState` and `preserveScroll` evaluation ([#135](https://github.com/inertiajs/inertia/pull/135))
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
