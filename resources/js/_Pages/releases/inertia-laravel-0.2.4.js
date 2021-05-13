import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-laravel@v0.2.4',
}

<H1>inertia-laravel@v0.2.4</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 4, 2020</div>

Improve handling of lazily evaluated `Responsable` props ([#95](https://github.com/inertiajs/inertia-laravel/pull/95)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
