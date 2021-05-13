import dedent from 'dedent-js'
import Layout from '../Components/Layout'
import TabbedCode from '../Components/TabbedCode'

const meta = {
  title: 'Scroll management',
  links: [
    { url: '#scroll-resetting', name: 'Scroll resetting' },
    { url: '#scroll-preservation', name: 'Scroll preservation' },
    { url: '#scroll-regions', name: 'Scroll regions' },
  ],
}

<H1>Scroll management</H1>

<H2>Scroll resetting</H2>

When navigating between pages, Inertia mimics default browser behaviour by automatically resetting the scroll position of the document body (as well as any [scroll regions](#scroll-regions) you've defined), back to the top. Further, Inertia keeps track of the scroll position of each page and automatically restores that scroll position as you navigate forward and back in history.

<H2>Scroll preservation</H2>

Sometimes it's desirable to prevent the default scroll resetting when making visits. You can disable this behaviour using the `preserveScroll` option when manually [making visits](/requests).

```js
Inertia.visit(url, { preserveScroll: true })
```

You can also lazily evaluate the `preserveScroll` option based on the response by providing a callback.

```js
Inertia.post('/users', data, {
  preserveScroll: (page) => Object.keys(page.props.errors).length,
})
```

You can also preserve the scroll position with [Inertia links](/links) using the `preserve-scroll` attribute.

<TabbedCode
  examples={[
    {
      name: 'Vue 2',
      language: 'jsx',
      code: dedent`
        <inertia-link href="/" preserve-scroll>Home</inertia-link>
      `,
      description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
    },
    {
      name: 'Vue 3',
      language: 'jsx',
      code: dedent`
        <inertia-link href="/" preserve-scroll>Home</inertia-link>
      `,
      description: 'The <inertia-link> component is automatically registered by the Inertia plugin.',
    },
    {
      name: 'React',
      language: 'jsx',
      code: dedent`
        import { InertiaLink } from '@inertiajs/inertia-react'\n
        <InertiaLink preserveScroll href="/">Home</InertiaLink>
      `,
    },
    {
      name: 'Svelte',
      language: 'jsx',
      code: dedent`
        import { inertia, InertiaLink } from '@inertiajs/inertia-svelte'\n
        <a href="/" use:inertia="{{ preserveScroll: true }}">Home</a>\n
        <InertiaLink href="/" preserveScroll>Home</InertiaLink>
      `,
    },
  ]}
/>

<H2>Scroll regions</H2>

If your app doesn't use document body scrolling, but instead has scrollable elements (using the `overflow` CSS property), scroll resetting will not work. In these situations you must tell Inertia which scrollable elements to manage by adding a `scroll-region` attribute.

```html
<div class="overflow-y-auto" scroll-region>
  <!-- Your page content -->
</div>
```

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
