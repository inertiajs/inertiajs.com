import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-react@v0.5.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.5.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 23, 2020</div>
      - This release adds a new optional `resolveErrors` setting.
      - You can read more about this in the corresponding [Inertia release](/releases/inertia-0.8.0).
      - When upgrading to this release, be sure to also upgrade `@inertiajs/inertia` to `v0.8.0`.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
