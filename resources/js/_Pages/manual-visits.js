import dedent from 'dedent-js'
import Layout from '../Components/Layout'
import Notice from '../Components/Notice'
import TabbedCode from '../Components/TabbedCode'

const meta = {
  title: 'Manual visits',
  links: [
    { url: '#method', name: 'Method' },
    { url: '#data', name: 'Data' },
    { url: '#browser-history', name: 'Browser history' },
    { url: '#component-state', name: 'Component state' },
    { url: '#scroll-preservation', name: 'Scroll preservation' },
    { url: '#partial-reloads', name: 'Partial reloads' },
    { url: '#error-bags', name: 'Error bags' },
    { url: '#file-uploads', name: 'File uploads' },
    { url: '#custom-headers', name: 'Custom headers' },
    { url: '#visit-cancellation', name: 'Visit cancellation' },
    { url: '#event-callbacks', name: 'Event callbacks' },
    { url: '#promise-deprecation', name: 'Promise deprecation' },
  ],
}

<H1>Manual visits</H1>

In addition to [creating links](/links), it's also possible to manually make Inertia visits. This is done using the `Inertia.visit()` method.

<TabbedCode
  examples={[
    {
      name: 'Vue 2',
      language: 'js',
      code: dedent`
        // import { Inertia } from '@inertiajs/inertia'\n
        this.$inertia.visit(url, {
          method: 'get',
          data: {},
          replace: false,
          preserveState: false,
          preserveScroll: false,
          only: [],
          headers: {},
          errorBag: null,
          forceFormData: false,
          onCancelToken: cancelToken => {},
          onCancel: () => {},
          onBefore: visit => {},
          onStart: visit => {},
          onProgress: progress => {},
          onSuccess: page => {},
          onError: errors => {},
          onFinish: visit => {},
        })
      `,
    },
    {
      name: 'Vue 3',
      language: 'js',
      code: dedent`
        // import { Inertia } from '@inertiajs/inertia'\n
        this.$inertia.visit(url, {
          method: 'get',
          data: {},
          replace: false,
          preserveState: false,
          preserveScroll: false,
          only: [],
          headers: {},
          errorBag: null,
          forceFormData: false,
          onCancelToken: cancelToken => {},
          onCancel: () => {},
          onBefore: visit => {},
          onStart: visit => {},
          onProgress: progress => {},
          onSuccess: page => {},
          onError: errors => {},
          onFinish: visit => {},
        })
      `,
    },
    {
      name: 'React',
      language: 'js',
      code: dedent`
        import { Inertia } from '@inertiajs/inertia'\n
        Inertia.visit(url, {
          method: 'get',
          data: {},
          replace: false,
          preserveState: false,
          preserveScroll: false,
          only: [],
          headers: {},
          errorBag: null,
          forceFormData: false,
          onCancelToken: cancelToken => {},
          onCancel: () => {},
          onBefore: visit => {},
          onStart: visit => {},
          onProgress: progress => {},
          onSuccess: page => {},
          onError: errors => {},
          onFinish: visit => {},
        })
      `,
    },
    {
      name: 'Svelte',
      language: 'js',
      code: dedent`
        import { Inertia } from '@inertiajs/inertia'\n
        Inertia.visit(url, {
          method: 'get',
          data: {},
          replace: false,
          preserveState: false,
          preserveScroll: false,
          only: [],
          headers: {},
          errorBag: null,
          forceFormData: false,
          onCancelToken: cancelToken => {},
          onCancel: () => {},
          onBefore: visit => {},
          onStart: visit => {},
          onProgress: progress => {},
          onSuccess: page => {},
          onError: errors => {},
          onFinish: visit => {},
        })
      `,
    },
  ]}
/>

However, generally it's preferred to use one of the shortcut methods instead. These methods share all the same options as `Inertia.visit()`.

<TabbedCode
  examples={[
    {
      name: 'Vue 2',
      language: 'js',
      code: dedent`
        // import { Inertia } from '@inertiajs/inertia'\n
        this.$inertia.get(url, data, options)
        this.$inertia.post(url, data, options)
        this.$inertia.put(url, data, options)
        this.$inertia.patch(url, data, options)
        this.$inertia.delete(url, options)
        this.$inertia.replace(url, options)
        this.$inertia.reload(options) // Uses the current URL
      `,
    },
    {
      name: 'Vue 3',
      language: 'js',
      code: dedent`
        // import { Inertia } from '@inertiajs/inertia'\n
        this.$inertia.get(url, data, options)
        this.$inertia.post(url, data, options)
        this.$inertia.put(url, data, options)
        this.$inertia.patch(url, data, options)
        this.$inertia.delete(url, options)
        this.$inertia.replace(url, options)
        this.$inertia.reload(options) // Uses the current URL
      `,
    },
    {
      name: 'React',
      language: 'js',
      code: dedent`
        import { Inertia } from '@inertiajs/inertia'\n
        Inertia.get(url, data, options)
        Inertia.post(url, data, options)
        Inertia.put(url, data, options)
        Inertia.patch(url, data, options)
        Inertia.delete(url, options)
        Inertia.replace(url, options)
        Inertia.reload(options) // Uses the current URL
      `,
    },
    {
      name: 'Svelte',
      language: 'js',
      code: dedent`
        import { Inertia } from '@inertiajs/inertia'\n
        Inertia.get(url, data, options)
        Inertia.post(url, data, options)
        Inertia.put(url, data, options)
        Inertia.patch(url, data, options)
        Inertia.delete(url, options)
        Inertia.replace(url, options)
        Inertia.reload(options) // Uses the current URL
      `,
    },
  ]}
/>

The `reload()` method is simply a shorthand that automatically visits the current page, with `preserveState` and `preserveScroll` both set to true.

<H2>Method</H2>

Use the `method` option to set the request method to `get`, `post`, `put`, `patch` or `delete`. The default is `get`.

```js
Inertia.visit(url, { method: 'post' })
```

<Notice>
  Uploading files via <inlineCode>put</inlineCode> or <inlineCode>patch</inlineCode> is not supported in Laravel.
  Instead, make the request via <inlineCode>post</inlineCode>, including a <inlineCode>_method</inlineCode> field set to{' '}
  <inlineCode>put</inlineCode> or <inlineCode>patch</inlineCode>. This is called{' '}
  <a href="https://laravel.com/docs/8.x/routing#form-method-spoofing">form method spoofing</a>.
</Notice>

<H2>Data</H2>

Use the `data` option to add data to the request.

```js
Inertia.visit('/users', {
  method: 'post',
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
})
```

As a convenience, the `get()`, `post()`, `put()` and `patch()` methods all include `data` as the second argument.

```js
Inertia.post('/users', {
  name: 'John Doe',
  email: 'john.doe@example.com',
})
```

<H2>Browser history</H2>

When making visits, Inertia automatically adds a new entry into the browser history. However, it's also possible to replace the current history entry using by setting the `replace` option to `true`.

```js
Inertia.get('/users', { search: 'John' }, { replace: true })
```

<Notice>
  Visits made to the same URL automatically set <inlineCode>replace</inlineCode> to <inlineCode>true</inlineCode>.
</Notice>

<H2>Component state</H2>

By default page visits to the same page force a fresh page component instance, which clears out any local state, such as form inputs, scroll positions and focus states.

In certain situations it's necessary to preserve the page component state. For example, when submitting a form, you need to preserve your form data in the event that validation errors come back.

This can be done by setting the `preserveState` option to `true`.

```js
Inertia.get('/users', { search: 'John' }, { preserveState: true })
```

You can also lazily evaluate the `preserveState` option based on the response by providing a callback.

```js
Inertia.post('/users', data, {
  preserveState: (page) => Object.keys(page.props.errors).length,
})
```

For convenience, the `post`, `put`, `patch`, `delete` and `reload` methods all default `preserveState` to `true`.

<H2>Scroll preservation</H2>

When navigating between pages, Inertia mimics default browser behaviour by automatically resetting the scroll position of the document body (as well as any [scroll regions](/scroll-management#scroll-regions) you've defined), back to the top. Use the `preserveScroll` option to disable this behaviour.

```js
Inertia.visit(url, { preserveScroll: true })
```

You can also lazily evaluate the `preserveScroll` option based on the response by providing a callback.

```js
Inertia.post('/users', data, {
  preserveScroll: (page) => Object.keys(page.props.errors).length,
})
```

For more information, see the [scroll management](/scroll-management) page.

<H2>Partial reloads</H2>

The `only` option allows you to request a subset of the props (data) from the server on subsequent visits to the same page.

```js
Inertia.visit('/users', { search: 'John' }, { only: ['users'] })
```

For more information, see the [partial reloads](/partial-reloads) page.

<H2>Error bags</H2>

For pages that have more than one form, it's possible to run into conflicts when displaying validation errors if two forms share the same field names. To get around this, you can use error bags. Error bags scope the validation errors returned from the server within a unique key specific to that form.

```js
Inertia.post('/companies', data, {
  errorBag: 'createCompany',
})
```

For more information, see the [validation](/validation#error-bags) page.

<H2>File uploads</H2>

When making visits that include files, Inertia will automatically convert the request data into a `FormData` object. If you'd like the visit to always use a `FormData` object, you can force this using the `forceFormData` option.

```js
Inertia.post('/companies', data, {
  forceFormData: true,
})
```

See the [file uploads](/file-uploads) page for more information.

<H2>Custom headers</H2>

The `headers` option allows you to add custom headers to a request.

```js
Inertia.post('/users', data, {
  headers: {
    'Custom-Header': 'value',
  },
})
```

<Notice>The Inertia headers take priority and therefore cannot be overwritten.</Notice>

<H2>Visit cancellation</H2>

You can cancel a visit using a cancel token, which Inertia automatically generates and provides via the `onCancelToken()` callback prior to making the visit.

```js
Inertia.post('/users', data, {
  onCancelToken: (cancelToken) => (this.cancelToken = cancelToken),
})

// Cancel the visit
this.cancelToken.cancel()
```

When a visit is cancelled, both the `onCancel()` and `onFinish()` event callbacks will be called.

<H2>Event callbacks</H2>

In addition to the [global events](/events), Inertia also provides a number of per-visit event callbacks.

```js
Inertia.post('/users', data, {
  onBefore: (visit) => {},
  onStart: (visit) => {},
  onProgress: (progress) => {},
  onSuccess: (page) => {},
  onError: (errors) => {},
  onCancel: () => {},
  onFinish: visit => {},
})
```

Returning `false` from the `onBefore()` callback will cause the visit to be cancelled.

```js
Inertia.delete(`/users/${user.id}`, {
  onBefore: () => confirm('Are you sure you want to delete this user?'),
})
```

It's also possible to return a promise from the `onSuccess()` and `onError()` callbacks. This will delay the "finish" event until the promise has resolved.

```js
Inertia.post(url, {
  onSuccess: () => {
    return Promise.all([
      this.doThing(),
      this.doAnotherThing()
    ])
  }
  onFinish: visit => {
    // This won't be called until doThing()
    // and doAnotherThing() have finished.
  },
})
```

<H2>Promise deprecation</H2>

As of `v0.3.0`, Inertia deprecated the promise that is returned from `Inertia.visit()`. If you call `then()`, `catch()` or `finally()` on an Inertia visit, you will now get the following console warning:

<div class="py-4 px-6 border-l-4 border-orange-300 bg-orange-100 text-orange-900 text-sm font-mono">
  <div>
    Inertia.js visit promises have been deprecated and will be removed in a future release. Please use the new visit
    event callbacks instead.
  </div>
  <div class="mt-4">Learn more at https://inertiajs.com/manual-visits#promise-deprecation</div>
</div>

The preferred approach is to use the new [event callbacks](#event-callbacks) instead. For example, instead of using `then()`, use the `onSuccess()` callback.

```js
Inertia.post('/profile', data, {
  onSuccess: () => {
    // Handle success event
  },
  onError: (errors) => {
    // Handle validation errors
  },
})
```

Instead of using `finally()`, use the `onFinish()` callback.

```js
Inertia.post('/profile', data, {
  onFinish: visit => {
    // Handle finish event
  },
})
```

And instead of using `catch()`, it's better to handle these unexpected errors using a global error event handler.

```js
Inertia.on('exception', (event) => {
  event.preventDefault()
  // Handle the error yourself
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