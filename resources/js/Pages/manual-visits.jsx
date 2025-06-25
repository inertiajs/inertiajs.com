import { A, Code, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Manual visits',
  links: [
    { url: '#method', name: 'Method' },
    { url: '#data', name: 'Data' },
    { url: '#custom-headers', name: 'Custom headers' },
    { url: '#file-uploads', name: 'File uploads' },
    { url: '#browser-history', name: 'Browser history' },
    { url: '#client-side-visits', name: 'Client side visits' },
    { url: '#state-preservation', name: 'State preservation' },
    { url: '#scroll-preservation', name: 'Scroll preservation' },
    { url: '#partial-reloads', name: 'Partial reloads' },
    { url: '#visit-cancellation', name: 'Visit cancellation' },
    { url: '#event-callbacks', name: 'Event callbacks' },
  ],
}

export default function () {
  return (
    <>
      <H1>Manual visits</H1>
      <P>
        In addition to <A href="/links">creating links</A>, it's also possible to manually make Inertia visits /
        requests programmatically via JavaScript. This is accomplished via the <Code>router.visit()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.visit(url, {
                method: 'get',
                data: {},
                replace: false,
                preserveState: false,
                preserveScroll: false,
                only: [],
                except: [],
                headers: {},
                errorBag: null,
                forceFormData: false,
                queryStringArrayFormat: 'brackets',
                async: false,
                showProgress: true,
                fresh: false,
                reset: [],
                preserveUrl: false,
                prefetch: false,
                onCancelToken: cancelToken => {},
                onCancel: () => {},
                onBefore: visit => {},
                onStart: visit => {},
                onProgress: progress => {},
                onSuccess: page => {},
                onError: errors => {},
                onFinish: visit => {},
                onPrefetching: () => {},
                onPrefetched: () => {},
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.visit(url, {
                method: 'get',
                data: {},
                replace: false,
                preserveState: false,
                preserveScroll: false,
                only: [],
                except: [],
                headers: {},
                errorBag: null,
                forceFormData: false,
                queryStringArrayFormat: 'brackets',
                async: false,
                showProgress: true,
                fresh: false,
                reset: [],
                preserveUrl: false,
                prefetch: false,
                onCancelToken: cancelToken => {},
                onCancel: () => {},
                onBefore: visit => {},
                onStart: visit => {},
                onProgress: progress => {},
                onSuccess: page => {},
                onError: errors => {},
                onFinish: visit => {},
                onPrefetching: () => {},
                onPrefetched: () => {},
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.visit(url, {
                method: 'get',
                data: {},
                replace: false,
                preserveState: false,
                preserveScroll: false,
                only: [],
                except: [],
                headers: {},
                errorBag: null,
                forceFormData: false,
                queryStringArrayFormat: 'brackets',
                async: false,
                showProgress: true,
                fresh: false,
                reset: [],
                preserveUrl: false,
                prefetch: false,
                onCancelToken: cancelToken => {},
                onCancel: () => {},
                onBefore: visit => {},
                onStart: visit => {},
                onProgress: progress => {},
                onSuccess: page => {},
                onError: errors => {},
                onFinish: visit => {},
                onPrefetching: () => {},
                onPrefetched: () => {},
              })
            `,
          },
        ]}
      />
      <P>
        However, it's generally more convenient to use one of Inertia's shortcut request methods. These methods share
        all the same options as <Code>router.visit()</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.get(url, data, options)
              router.post(url, data, options)
              router.put(url, data, options)
              router.patch(url, data, options)
              router.delete(url, options)
              router.reload(options) // Uses the current URL
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.get(url, data, options)
              router.post(url, data, options)
              router.put(url, data, options)
              router.patch(url, data, options)
              router.delete(url, options)
              router.reload(options) // Uses the current URL
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.get(url, data, options)
              router.post(url, data, options)
              router.put(url, data, options)
              router.patch(url, data, options)
              router.delete(url, options)
              router.reload(options) // Uses the current URL
            `,
          },
        ]}
      />
      <P>
        The <Code>reload()</Code> method is a convenient, shorthand method that automatically visits the current page
        with <Code>preserveState</Code> and <Code>preserveScroll</Code> both set to <Code>true</Code>, making it the
        perfect method to invoke when you just want to reload the current page's data.
      </P>
      <H2>Method</H2>
      <P>
        When making manual visits, you may use the <Code>method</Code> option to set the request's HTTP method to{' '}
        <Code>get</Code>, <Code>post</Code>, <Code>put</Code>, <Code>patch</Code> or <Code>delete</Code>. The default
        method is <Code>get</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.visit(url, { method: 'post' })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.visit(url, { method: 'post' })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.visit(url, { method: 'post' })
            `,
          },
        ]}
      />
      <Notice>
        Uploading files via <Code color="orange">put</Code> or <Code color="orange">patch</Code> is not supported in
        Laravel. Instead, make the request via <Code color="orange">post</Code>, including a{' '}
        <Code color="orange">_method</Code> field set to <Code color="orange">put</Code> or{' '}
        <Code color="orange">patch</Code>. This is called{' '}
        <A href="https://laravel.com/docs/routing#form-method-spoofing">form method spoofing</A>.
      </Notice>
      <H2>Data</H2>
      <P>
        You may use the <Code>data</Code> option to add data to the request.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.visit('/users', {
                method: 'post',
                data: {
                  name: 'John Doe',
                  email: 'john.doe@example.com',
                },
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.visit('/users', {
                method: 'post',
                data: {
                  name: 'John Doe',
                  email: 'john.doe@example.com',
                },
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.visit('/users', {
                method: 'post',
                data: {
                  name: 'John Doe',
                  email: 'john.doe@example.com',
                },
              })
            `,
          },
        ]}
      />
      <P>
        For convenience, the <Code>get()</Code>, <Code>post()</Code>, <Code>put()</Code>, and <Code>patch()</Code>{' '}
        methods all accept <Code>data</Code> as their second argument.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/users', {
                name: 'John Doe',
                email: 'john.doe@example.com',
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/users', {
                name: 'John Doe',
                email: 'john.doe@example.com',
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/users', {
                name: 'John Doe',
                email: 'john.doe@example.com',
              })
            `,
          },
        ]}
      />
      <H2>Custom headers</H2>
      <P>
        The <Code>headers</Code> option allows you to add custom headers to a request.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/users', data, {
                headers: {
                  'Custom-Header': 'value',
                },
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/users', data, {
                headers: {
                  'Custom-Header': 'value',
                },
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/users', data, {
                headers: {
                  'Custom-Header': 'value',
                },
              })
            `,
          },
        ]}
      />
      <Notice>
        The headers Inertia uses internally to communicate its state to the server take priority and therefore cannot be
        overwritten.
      </Notice>
      <H2>File uploads</H2>
      <P>
        When making visits / requests that include files, Inertia will automatically convert the request data into a{' '}
        <Code>FormData</Code> object. If you would like the request to always use a <Code>FormData</Code> object, you
        may use the <Code>forceFormData</Code> option.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/companies', data, {
                forceFormData: true,
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/companies', data, {
                forceFormData: true,
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/companies', data, {
                forceFormData: true,
              })
            `,
          },
        ]}
      />
      <P>
        For more information on uploading files, please consult the dedicated <A href="/file-uploads">file uploads</A>{' '}
        documentation.
      </P>
      <H2>Browser history</H2>
      <P>
        When making visits, Inertia automatically adds a new entry into the browser history. However, it's also possible
        to replace the current history entry by setting the <Code>replace</Code> option to <Code>true</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.get('/users', { search: 'John' }, { replace: true })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.get('/users', { search: 'John' }, { replace: true })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.get('/users', { search: 'John' }, { replace: true })
            `,
          },
        ]}
      />
      <Notice>
        Visits made to the same URL automatically set <Code color="orange">replace</Code> to{' '}
        <Code color="orange">true</Code>.
      </Notice>
      <H2>Client side visits</H2>
      <P>
        You can use the <Code>router.push</Code> and <Code>router.replace</Code> method to make client-side visits. This
        method is useful when you want to update the browser's history without making a server request.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.push({
                url: '/users',
                component: 'Users',
                props: { search: 'John' },
                clearHistory: false,
                encryptHistory: false,
                preserveScroll: false,
                preserveState: false,
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.push({
                url: '/users',
                component: 'Users',
                props: { search: 'John' },
                clearHistory: false,
                encryptHistory: false,
                preserveScroll: false,
                preserveState: false,
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.push({
                url: '/users',
                component: 'Users',
                props: { search: 'John' },
                clearHistory: false,
                encryptHistory: false,
                preserveScroll: false,
                preserveState: false,
              })
            `,
          },
        ]}
      />
      <P>
        All of the parameters are optional. By default, all passed paramaters will be merged with the current page. This
        means you are responsible for overriding the current page's URL, component, and props.
      </P>
      <P>
        If you need access to the current page's props you can pass a function to the props option. This function will
        receive the current page's props as an argument and should return the new props.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.push({ url: '/users', component: 'Users' })
              router.replace({
                props: (currentProps) => ({ ...currentProps, search: 'John' })
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.push({ url: '/users', component: 'Users' })
              router.replace({
                props: (currentProps) => ({ ...currentProps, search: 'John' })
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.push({ url: '/users', component: 'Users' })
              router.replace({
                props: (currentProps) => ({ ...currentProps, search: 'John' })
              })
            `,
          },
        ]}
      />
      <Notice>
        Make sure that any route you push on the client side is also defined on the server side. If the user refreshes
        the page, the server will need to know how to render the page.
      </Notice>
      <H2>State preservation</H2>
      <P>
        By default, page visits to the same page create a fresh page component instance. This causes any local state,
        such as form inputs, scroll positions, and focus states to be lost.
      </P>
      <P>
        However, in some situations, it's necessary to preserve the page component state. For example, when submitting a
        form, you need to preserve your form data in the event that form validation fails on the server.
      </P>
      <P>
        For this reason, the <Code>post</Code>, <Code>put</Code>, <Code>patch</Code>, <Code>delete</Code>, and{' '}
        <Code>reload</Code> methods all set the <Code>preserveState</Code> option to <Code>true</Code> by default.
      </P>
      <P>
        You can instruct Inertia to preserve the component's state when using the <Code>get</Code> method by setting the{' '}
        <Code>preserveState</Code> option to <Code>true</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.get('/users', { search: 'John' }, { preserveState: true })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.get('/users', { search: 'John' }, { preserveState: true })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.get('/users', { search: 'John' }, { preserveState: true })
            `,
          },
        ]}
      />
      <P>
        If you'd like to only preserve state if the response includes validation errors, set the{' '}
        <Code>preserveState</Code> option to "errors".
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.get('/users', { search: 'John' }, { preserveState: 'errors' })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.get('/users', { search: 'John' }, { preserveState: 'errors' })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.get('/users', { search: 'John' }, { preserveState: 'errors' })
            `,
          },
        ]}
      />
      <P>
        You can also lazily evaluate the <Code>preserveState</Code> option based on the response by providing a
        callback.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/users', data, {
                preserveState: (page) => page.props.someProp === 'value',
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/users', data, {
                preserveState: (page) => page.props.someProp === 'value',
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/users', data, {
                preserveState: (page) => page.props.someProp === 'value',
              })
            `,
          },
        ]}
      />
      <H2>Scroll preservation</H2>
      <P>
        When navigating between pages, Inertia mimics default browser behavior by automatically resetting the scroll
        position of the document body (as well as any <A href="/scroll-management#scroll-regions">scroll regions</A>{' '}
        you've defined) back to the top of the page.
      </P>
      <P>
        You can disable this behavior by setting the <Code>preserveScroll</Code> option to <Code>false</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.visit(url, { preserveScroll: false })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.visit(url, { preserveScroll: false })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.visit(url, { preserveScroll: false })
            `,
          },
        ]}
      />
      <P>
        If you'd like to only preserve the scroll position if the response includes validation errors, set the{' '}
        <Code>preserveScroll</Code> option to "errors".
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.visit(url, { preserveScroll: 'errors' })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.visit(url, { preserveScroll: 'errors' })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.visit(url, { preserveScroll: 'errors' })
            `,
          },
        ]}
      />
      <P>
        You can also lazily evaluate the <Code>preserveScroll</Code> option based on the response by providing a
        callback.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/users', data, {
                preserveScroll: (page) => page.props.someProp === 'value',
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/users', data, {
                preserveScroll: (page) => page.props.someProp === 'value',
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/users', data, {
                preserveScroll: (page) => page.props.someProp === 'value',
              })
            `,
          },
        ]}
      />
      <P>
        For more information regarding this feature, please consult the{' '}
        <A href="/scroll-management">scroll management</A> documentation.
      </P>
      <H2>Partial reloads</H2>
      <P>
        The <Code>only</Code> option allows you to request a subset of the props (data) from the server on subsequent
        visits to the same page, thus making your application more efficient since it does not need to retrieve data
        that the page is not interested in refreshing.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.get('/users', { search: 'John' }, { only: ['users'] })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.get('/users', { search: 'John' }, { only: ['users'] })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.get('/users', { search: 'John' }, { only: ['users'] })
            `,
          },
        ]}
      />
      <P>
        For more information on this feature, please consult the <A href="/partial-reloads">partial reloads</A>{' '}
        documentation.
      </P>
      <H2>Visit cancellation</H2>
      <P>
        You can cancel a visit using a cancel token, which Inertia automatically generates and provides via the{' '}
        <Code>onCancelToken()</Code> callback prior to making the visit.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/users', data, {
                onCancelToken: (cancelToken) => (this.cancelToken = cancelToken),
              })

              // Cancel the visit...
              this.cancelToken.cancel()
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/users', data, {
                onCancelToken: (cancelToken) => (this.cancelToken = cancelToken),
              })

              // Cancel the visit...
              this.cancelToken.cancel()
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/users', data, {
                onCancelToken: (cancelToken) => (this.cancelToken = cancelToken),
              })

              // Cancel the visit...
              this.cancelToken.cancel()
            `,
          },
        ]}
      />
      <P>
        The <Code>onCancel()</Code> and <Code>onFinish()</Code> event callbacks will be executed when a visit is
        cancelled.
      </P>
      <H2>Event callbacks</H2>
      <P>
        In addition to Inertia's <A href="/events">global events</A>, Inertia also provides a number of per-visit event
        callbacks.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/users', data, {
                onBefore: (visit) => {},
                onStart: (visit) => {},
                onProgress: (progress) => {},
                onSuccess: (page) => {},
                onError: (errors) => {},
                onCancel: () => {},
                onFinish: visit => {},
                onPrefetching: () => {},
                onPrefetched: () => {},
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/users', data, {
                onBefore: (visit) => {},
                onStart: (visit) => {},
                onProgress: (progress) => {},
                onSuccess: (page) => {},
                onError: (errors) => {},
                onCancel: () => {},
                onFinish: visit => {},
                onPrefetching: () => {},
                onPrefetched: () => {},
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/users', data, {
                onBefore: (visit) => {},
                onStart: (visit) => {},
                onProgress: (progress) => {},
                onSuccess: (page) => {},
                onError: (errors) => {},
                onCancel: () => {},
                onFinish: visit => {},
                onPrefetching: () => {},
                onPrefetched: () => {},
              })
            `,
          },
        ]}
      />
      <P>
        Returning <Code>false</Code> from the <Code>onBefore()</Code> callback will cause the visit to be cancelled.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.delete(\`/users/\${user.id}\`, {
                onBefore: () => confirm('Are you sure you want to delete this user?'),
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.delete(\`/users/\${user.id}\`, {
                onBefore: () => confirm('Are you sure you want to delete this user?'),
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.delete(\`/users/\${user.id}\`, {
                onBefore: () => confirm('Are you sure you want to delete this user?'),
              })
            `,
          },
        ]}
      />
      <P>
        It's also possible to return a promise from the <Code>onSuccess()</Code> and <Code>onError()</Code> callbacks.
        When doing so, the "finish" event will be delayed until the promise has resolved.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post(url, {
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
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post(url, {
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
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post(url, {
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
            `,
          },
        ]}
      />
    </>
  )
}
