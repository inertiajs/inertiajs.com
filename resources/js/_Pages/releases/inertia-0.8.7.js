import Layout from '../../components/Layout'

const meta = {
  title: 'inertia@v0.8.7',
}

<H1>inertia@v0.8.7</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 14, 2021</div>

- Remove internal `onBeforeRender` event ([#628](https://github.com/inertiajs/inertia/pull/628)).
- Add "errors" option to `preserveScroll` and `preserveState` ([#628](https://github.com/inertiajs/inertia/pull/628)).

<H2>New "errors" preserve option</H2>

It's very common to want to preserve scrolling or state only in the event that there are validation errors. Previously you had to use a callback to do this:

```js
preserveScroll: (page) => Object.keys(page.props.errors).length > 0,
preserveState: (page) => Object.keys(page.props.errors).length > 0,
```

However, both of these options now support a new `"errors"` option, which does this automatically:

```js
preserveScroll: "errors",
preserveState: "errors",
```

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
