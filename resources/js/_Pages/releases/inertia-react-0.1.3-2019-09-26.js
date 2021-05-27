import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-react@v0.1.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.1.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 26, 2019</div>
      - Modernize TypeScript typings.
      - Update `@inertiajs/inertia` dependency.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
