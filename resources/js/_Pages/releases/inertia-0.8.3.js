import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.8.3',
}

<H1>inertia@v0.8.3</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 21, 2021</div>

- Use remember history state when visiting the same component and preserving state ([commit](https://github.com/inertiajs/inertia/commit/395ddaa5d3953549d681206e7038f13d77a23610)).
- Add TypeScript definition for `onError` ([#390](https://github.com/inertiajs/inertia/pull/390)).
- Add `forceFormData` visit option to force `FormData` encoding ([#407](https://github.com/inertiajs/inertia/pull/407)).
- Pass `visit` to `onFinish()` callback ([commit](https://github.com/inertiajs/inertia/commit/896c53bb0e80bb6ba56e588a3afe665fa8aa0498)).

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
