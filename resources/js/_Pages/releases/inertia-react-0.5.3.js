import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-react@v0.5.3',
}

<H1>inertia-react@v0.5.3</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on February 25, 2021</div>

- Update the TypeScript definitions ([#457](https://github.com/inertiajs/inertia/pull/457)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page