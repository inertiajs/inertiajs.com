import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-progress@v0.2.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-progress@v0.2.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on November 3, 2020</div>
      - Add TypeScript typings ([#7](https://github.com/inertiajs/progress/pull/7)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
