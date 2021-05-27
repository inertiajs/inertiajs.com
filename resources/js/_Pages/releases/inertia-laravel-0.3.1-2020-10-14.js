import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.3.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.3.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 14, 2020</div>
      Add `--force` option to `php artisan inertia:middleware` command.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
