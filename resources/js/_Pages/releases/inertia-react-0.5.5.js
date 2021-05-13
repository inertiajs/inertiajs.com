import Layout from '../../components/Layout'

const meta = {
  title: 'inertia-react@v0.5.5',
}

<H1>inertia-react@v0.5.5</H1>

<div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on March 26, 2021</div>

- Added new form helper options ([#575](https://github.com/inertiajs/inertia/pull/575)).
- Updated typescript definition ([#526](https://github.com/inertiajs/inertia/pull/526), [#555](https://github.com/inertiajs/inertia/pull/555)).

<H2>Form helper options</H2>

The form helper now accepts a second "options" argument. This lets you set a form `key`, needed if there are multiple forms on the page. You can also disable the automatic remember behaviour by setting the `remember` option to `false`.

```js
const form = useForm({
  email: null,
  password: null,
}, {
  key: 'login',
  remember: false,
})
```

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
