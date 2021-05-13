import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-react@v0.1.3',
}

<H1>inertia-react@v0.1.3</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 26, 2019</div>

- Modernize TypeScript typings.
- Update `@inertiajs/inertia` dependency.

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
