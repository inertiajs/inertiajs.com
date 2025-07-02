import { A, Code, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Validation',
  links: [
    { url: '#how-it-works', name: 'How it works' },
    { url: '#sharing-errors', name: 'Sharing errors' },
    { url: '#displaying-errors', name: 'Displaying errors' },
    { url: '#repopulating-input', name: 'Repopulating input' },
    { url: '#error-bags', name: 'Error bags' },
  ],
}

export default function () {
  return (
    <>
      <H1>Validation</H1>
      <H2>How it works</H2>
      <P>
        Handling server-side validation errors in Inertia works differently than a classic XHR-driven form that requires
        you to catch the validation errors from <Code>422</Code> responses and manually update the form's error state -
        because Inertia never receives <Code>422</Code> responses. Instead, Inertia operates much more like a standard
        full page form submission. Here's how:
      </P>
      <P>
        First, you <A href="/forms">submit your form using Inertia</A>. If there are server-side validation errors, you
        don't return those errors as a <Code>422</Code> JSON response. Instead, you redirect (server-side) the user back
        to the form page they were previously on, flashing the validation errors in the session. Some frameworks, such
        as Laravel, do this automatically.
      </P>
      <P>
        Next, any time these validation errors are present in the session, they automatically get shared with Inertia,
        making them available client-side as page props which you can display in your form. Since props are reactive,
        they are automatically shown when the form submission completes.
      </P>
      <P>
        Finally, since Inertia apps never generate <Code>422</Code> responses, Inertia needs another way to determine if
        a response includes validation errors. To do this, Inertia checks the <Code>page.props.errors</Code> object for
        the existence of any errors. In the event that errors are present, the request's <Code>onError()</Code> callback
        will be called instead of the <Code>onSuccess()</Code> callback.
      </P>
      <H2>Sharing errors</H2>
      <P>
        In order for your server-side validation errors to be available client-side, your server-side framework must
        share them via the <Code>errors</Code> prop. Inertia's first-party adapters, such as the Laravel adapter, do
        this automatically. For other frameworks, you may need to do this manually. Please refer to your specific
        server-side adapter documentation for more information.
      </P>
      <H2>Displaying errors</H2>
      <P>
        Since validation errors are made available client-side as page component props, you can conditionally display
        them based on their existence. Remember, when using our first-party server adapters (such as the Laravel
        adapter), the <Code>errors</Code> prop will automatically be available to your page.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { reactive } from 'vue'
              import { router } from '@inertiajs/vue3'

              defineProps({ errors: Object })

              const form = reactive({
                first_name: null,
                last_name: null,
                email: null,
              })

              function submit() {
                router.post('/users', form)
              }
              </script>

              <template>
                <form @submit.prevent="submit">
                  <label for="first_name">First name:</label>
                  <input id="first_name" v-model="form.first_name" />
                  <div v-if="errors.first_name">{{ errors.first_name }}</div>
                  <label for="last_name">Last name:</label>
                  <input id="last_name" v-model="form.last_name" />
                  <div v-if="errors.last_name">{{ errors.last_name }}</div>
                  <label for="email">Email:</label>
                  <input id="email" v-model="form.email" />
                  <div v-if="errors.email">{{ errors.email }}</div>
                  <button type="submit">Submit</button>
                </form>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { useState } from 'react'
              import { router, usePage } from '@inertiajs/react'

              export default function Edit() {
                const { errors } = usePage().props

                const [values, setValues] = useState({
                  first_name: null,
                  last_name: null,
                  email: null,
                })

                function handleChange(e) {
                  setValues(values => ({
                    ...values,
                    [e.target.id]: e.target.value,
                  }))
                }

                function handleSubmit(e) {
                  e.preventDefault()
                  router.post('/users', values)
                }

                return (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First name:</label>
                    <input id="first_name" value={values.first_name} onChange={handleChange} />
                    {errors.first_name && <div>{errors.first_name}</div>}
                    <label htmlFor="last_name">Last name:</label>
                    <input id="last_name" value={values.last_name} onChange={handleChange} />
                    {errors.last_name && <div>{errors.last_name}</div>}
                    <label htmlFor="email">Email:</label>
                    <input id="email" value={values.email} onChange={handleChange} />
                    {errors.email && <div>{errors.email}</div>}
                    <button type="submit">Submit</button>
                  </form>
                )
              }
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script>
                import { router } from '@inertiajs/svelte'

                export let errors = {}

                let values = {
                  first_name: null,
                  last_name: null,
                  email: null,
                }

                function handleSubmit() {
                  router.post('/users', values)
                }
              </script>

              <form on:submit|preventDefault={handleSubmit}>
                <label for="first_name">First name:</label>
                <input id="first_name" bind:value={values.first_name}>
                {#if errors.first_name}<div>{errors.first_name}</div>{/if}

                <label for="last_name">Last name:</label>
                <input id="last_name" bind:value={values.last_name}>
                {#if errors.last_name}<div>{errors.last_name}</div>{/if}

                <label for="email">Email:</label>
                <input id="email" bind:value={values.email}>
                {#if errors.email}<div>{errors.email}</div>{/if}

                <button type="submit">Submit</button>
              </form>
            `,
          },
        ]}
      />
      <Notice>
        When using the Vue adapters, you may also access the errors via the <Code>$page.props.errors</Code> object.
      </Notice>
      <H2>Repopulating input</H2>
      <P>
        While handling errors in Inertia is similar to full page form submissions, Inertia offers even more benefits. In
        fact, you don't even need to manually repopulate old form input data.
      </P>
      <P>
        When validation errors occur, the user is typically redirected back to the form page they were previously on.
        And, by default, Inertia automatically preserves the{' '}
        <A href="/manual-visits#state-preservation">component state</A> for <Code>post</Code>, <Code>put</Code>,{' '}
        <Code>patch</Code>, and <Code>delete</Code> requests. Therefore, all the old form input data remains exactly as
        it was when the user submitted the form.
      </P>
      <P>
        So, the only work remaining is to display any validation errors using the <Code>errors</Code> prop.
      </P>
      <H2>Error bags</H2>
      <Notice>
        If you're using the <A href="/forms#form-helper">form helper</A>, it's not necessary to use error bags since
        validation errors are automatically scoped to the form object making the request.
      </Notice>
      <P>
        For pages that have more than one form, it's possible to encounter conflicts when displaying validation errors
        if two forms share the same field names. For example, imagine a "create company" form and a "create user" form
        that both have a <Code>name</Code> field. Since both forms will be displaying the{' '}
        <Code>page.props.errors.name</Code> validation error, generating a validation error for the <Code>name</Code>{' '}
        field in either form will cause the error to appear in both forms.
      </P>
      <P>
        To solve this issue, you can use "error bags". Error bags scope the validation errors returned from the server
        within a unique key specific to that form. Continuing with our example above, you might have a{' '}
        <Code>createCompany</Code> error bag for the first form and a <Code>createUser</Code> error bag for the second
        form.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/companies', data, {
                errorBag: 'createCompany',
              })

              router.post('/users', data, {
                errorBag: 'createUser',
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/companies', data, {
                errorBag: 'createCompany',
              })

              router.post('/users', data, {
                errorBag: 'createUser',
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/companies', data, {
                errorBag: 'createCompany',
              })

              router.post('/users', data, {
                errorBag: 'createUser',
              })
            `,
          },
        ]}
      />
      <P>
        Specifying an error bag will cause the validation errors to come back from the server within{' '}
        <Code>page.props.errors.createCompany</Code> and <Code>page.props.errors.createUser</Code>.
      </P>
    </>
  )
}
