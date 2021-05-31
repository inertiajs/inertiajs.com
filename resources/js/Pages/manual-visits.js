import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'

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
  ],
}

const Page = () => {
  return (
    <>
      <H1>Manual visits</H1>
      <P>
        In addition to <A href="/links">creating links</A>, it's also possible to manually make Inertia visits. This is
        done using the <Code>Inertia.visit()</Code> method.
      </P>
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
      <P>
        However, generally it's preferred to use one of the shortcut methods instead. These methods share all the same
        options as <Code>Inertia.visit()</Code>.
      </P>
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
      <P>
        The <Code>reload()</Code> method is simply a shorthand that automatically visits the current page, with{' '}
        <Code>preserveState</Code> and <Code>preserveScroll</Code> both set to true.
      </P>
      <H2>Method</H2>
      <P>
        Use the <Code>method</Code> option to set the request method to <Code>get</Code>, <Code>post</Code>,{' '}
        <Code>put</Code>, <Code>patch</Code> or <Code>delete</Code>. The default is <Code>get</Code>.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.visit(url, { method: 'post' })
        `}
      />
      <Notice>
        Uploading files via <Code color="orange">put</Code> or <Code color="orange">patch</Code> is not supported in
        Laravel. Instead, make the request via <Code color="orange">post</Code>, including a{' '}
        <Code color="orange">_method</Code> field set to <Code color="orange">put</Code> or{' '}
        <Code color="orange">patch</Code>. This is called{' '}
        <A href="https://laravel.com/docs/8.x/routing#form-method-spoofing">form method spoofing</A>.
      </Notice>
      <H2>Data</H2>
      <P>
        Use the <Code>data</Code> option to add data to the request.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.visit('/users', {
            method: 'post',
            data: {
              name: 'John Doe',
              email: 'john.doe@example.com',
            },
          })
        `}
      />
      <P>
        As a convenience, the <Code>get()</Code>, <Code>post()</Code>, <Code>put()</Code> and <Code>patch()</Code>{' '}
        methods all include <Code>data</Code> as the second argument.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/users', {
            name: 'John Doe',
            email: 'john.doe@example.com',
          })
        `}
      />
      <H2>Browser history</H2>
      <P>
        When making visits, Inertia automatically adds a new entry into the browser history. However, it's also possible
        to replace the current history entry using by setting the <Code>replace</Code> option to <Code>true</Code>.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.get('/users', { search: 'John' }, { replace: true })
        `}
      />
      <Notice>
        Visits made to the same URL automatically set <Code color="orange">replace</Code> to{' '}
        <Code color="orange">true</Code>.
      </Notice>
      <H2>Component state</H2>
      <P>
        By default page visits to the same page force a fresh page component instance, which clears out any local state,
        such as form inputs, scroll positions and focus states.
      </P>
      <P>
        In certain situations it's necessary to preserve the page component state. For example, when submitting a form,
        you need to preserve your form data in the event that validation errors come back.
      </P>
      <P>
        This can be done by setting the <Code>preserveState</Code> option to <Code>true</Code>.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.get('/users', { search: 'John' }, { preserveState: true })
        `}
      />
      <P>
        You can also lazily evaluate the <Code>preserveState</Code> option based on the response by providing a
        callback.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/users', data, {
            preserveState: (page) => Object.keys(page.props.errors).length,
          })
        `}
      />
      <P>
        For convenience, the <Code>post</Code>, <Code>put</Code>, <Code>patch</Code>, <Code>delete</Code> and{' '}
        <Code>reload</Code> methods all default <Code>preserveState</Code> to <Code>true</Code>.
      </P>
      <H2>Scroll preservation</H2>
      <P>
        When navigating between pages, Inertia mimics default browser behaviour by automatically resetting the scroll
        position of the document body (as well as any <A href="/scroll-management#scroll-regions">scroll regions</A>{' '}
        you've defined), back to the top. Use the <Code>preserveScroll</Code> option to disable this behaviour.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.visit(url, { preserveScroll: true })
        `}
      />
      <P>
        You can also lazily evaluate the <Code>preserveScroll</Code> option based on the response by providing a
        callback.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/users', data, {
            preserveScroll: (page) => Object.keys(page.props.errors).length,
          })
        `}
      />
      <P>
        For more information, see the <A href="/scroll-management">scroll management</A> page.
      </P>
      <H2>Partial reloads</H2>
      <P>
        The <Code>only</Code> option allows you to request a subset of the props (data) from the server on subsequent
        visits to the same page.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.visit('/users', { search: 'John' }, { only: ['users'] })
        `}
      />
      <P>
        For more information, see the <A href="/partial-reloads">partial reloads</A> page.
      </P>
      <H2>Error bags</H2>
      <P>
        For pages that have more than one form, it's possible to run into conflicts when displaying validation errors if
        two forms share the same field names. To get around this, you can use error bags. Error bags scope the
        validation errors returned from the server within a unique key specific to that form.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/companies', data, {
            errorBag: 'createCompany',
          })
        `}
      />
      <P>
        For more information, see the <A href="/validation#error-bags">validation</A> page.
      </P>
      <H2>File uploads</H2>
      <P>
        When making visits that include files, Inertia will automatically convert the request data into a{' '}
        <Code>FormData</Code> object. If you'd like the visit to always use a <Code>FormData</Code> object, you can
        force this using the <Code>forceFormData</Code> option.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/companies', data, {
            forceFormData: true,
          })
        `}
      />
      <P>
        See the <A href="/file-uploads">file uploads</A> page for more information.
      </P>
      <H2>Custom headers</H2>
      <P>
        The <Code>headers</Code> option allows you to add custom headers to a request.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/users', data, {
            headers: {
              'Custom-Header': 'value',
            },
          })
        `}
      />
      <Notice>The Inertia headers take priority and therefore cannot be overwritten.</Notice>
      <H2>Visit cancellation</H2>
      <P>
        You can cancel a visit using a cancel token, which Inertia automatically generates and provides via the{' '}
        <Code>onCancelToken()</Code> callback prior to making the visit.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/users', data, {
            onCancelToken: (cancelToken) => (this.cancelToken = cancelToken),
          })\n
          // Cancel the visit
          this.cancelToken.cancel()
        `}
      />
      <P>
        When a visit is cancelled, both the <Code>onCancel()</Code> and <Code>onFinish()</Code> event callbacks will be
        called.
      </P>
      <H2>Event callbacks</H2>
      <P>
        In addition to the <A href="/events">global events</A>, Inertia also provides a number of per-visit event
        callbacks.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/users', data, {
            onBefore: (visit) => {},
            onStart: (visit) => {},
            onProgress: (progress) => {},
            onSuccess: (page) => {},
            onError: (errors) => {},
            onCancel: () => {},
            onFinish: visit => {},
          })
        `}
      />
      <P>
        Returning <Code>false</Code> from the <Code>onBefore()</Code> callback will cause the visit to be cancelled.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.delete(\`/users/\${user.id}\`, {
            onBefore: () => confirm('Are you sure you want to delete this user?'),
          })
        `}
      />
      <P>
        It's also possible to return a promise from the <Code>onSuccess()</Code> and <Code>onError()</Code> callbacks.
        This will delay the "finish" event until the promise has resolved.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
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
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
