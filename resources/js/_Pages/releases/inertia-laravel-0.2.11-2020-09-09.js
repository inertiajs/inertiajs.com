import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.11',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.11</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 9, 2020</div>
      Revert change in `v0.2.10`, which was broken ([#140](https://github.com/inertiajs/inertia-laravel/pull/140)).
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
