import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, P, TabbedCode } from '../Components'

const meta = {
  title: 'Validation',
  links: [
    { url: '#how-it-works', name: 'How it works' },
    { url: '#sharing-errors', name: 'Sharing errors' },
    { url: '#displaying-errors', name: 'Displaying errors' },
    { url: '#repopulating-input', name: 'Repopulating input' },
    { url: '#error-bags', name: 'Error bags' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Validation</H1>
      <H2>How it works</H2>
      <P>
        Handling server-side validation errors in Inertia works a little different than a classic ajax-driven form,
        where you catch the validation errors from <Code>422</Code> responses and manually update the form's error
        state. That's because Inertia never receives <Code>422</Code> responses. Rather, Inertia operates much more like
        a standard full page form submission. Here's how:
      </P>
      <P>
        First, you submit your form using Inertia. In the event that there are server-side validation errors, you don't
        immediately return those errors as a <Code>422</Code> JSON response. Instead, you redirect (server-side) back to
        the form page you are on, flashing the validation errors in the session. Frameworks like Laravel do this
        automatically.
      </P>
      <P>
        Next, any time these validation errors are present in the session, they automatically get shared with Inertia,
        making them available client-side as page props, which you can display in your form. Since props are reactive,
        they are automatically shown when the form submission completes.
      </P>
      <P>
        Finally, since Inertia apps never generate <Code>422</Code> responses, Inertia needs another way to determine if
        a response includes validation errors. To do this, Inertia checks the <Code>page.props.errors</Code> object for
        the existence of any errors. In the event that errors are present, the <Code>onError()</Code> callback will be
        called instead of the <Code>onSuccess()</Code> callback.
      </P>
      <H2>Sharing errors</H2>
      <P>
        In order for your server-side validation errors to be available client-side, your server-side framework must
        share them via the <Code>errors</Code> prop. Some adapters, such as the Laravel adapter, do this automatically.
        For others, you may need to do this manually. Please refer to your specific server-side adapter documentation
        for more information.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              class UsersController extends Controller
              {
                  public function create()
                  {
                      return Inertia::render('Users/Create');
                  }\n
                  public function store()
                  {
                    Request::validate([
                        'first_name' => ['required', 'max:50'],
                        'last_name' => ['required', 'max:50'],
                        'email' => ['required', 'max:50', 'email'],
                    ]);\n
                    $user = User::create(
                      Request::only('first_name', 'last_name', 'email')
                    );\n
                    return Redirect::route('users.show', $user);
                  }
              }
            `,
          },
          {
            name: 'Rails',
            language: 'ruby',
            code: dedent`
              class UsersController < ApplicationController
                def create
                  user = User.create(user_params)\n
                  if user.persisted?
                    redirect_to users_path
                  else
                    redirect_to new_user_path, inertia: { errors: user.errors }
                  end
                end
              end
            `,
          },
        ]}
      />
      <H2>Displaying errors</H2>
      <P>
        Since validation errors are made available client-side as page component props, you can conditionally display
        them based on their existence. Here's an example how.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
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
              </template>\n
              <script>
              export default {
                props: {
                  errors: Object,
                },
                data() {
                  return {
                    form: {
                      first_name: null,
                      last_name: null,
                      email: null,
                    },
                  }
                },
                methods: {
                  submit() {
                    this.$inertia.post('/users', this.form)
                  },
                },
              }
              </script>
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
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
              </template>\n
              <script>
              export default {
                props: {
                  errors: Object,
                },
                data() {
                  return {
                    form: {
                      first_name: null,
                      last_name: null,
                      email: null,
                    },
                  }
                },
                methods: {
                  submit() {
                    this.$inertia.post('/users', this.form)
                  },
                },
              }
              </script>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Inertia } from '@inertiajs/inertia'
              import { usePage } from '@inertiajs/inertia-react'
              import React, { useState } from 'react'\n
              export default function Edit() {
                const { errors } = usePage().props\n
                const [values, setValues] = useState({
                  first_name: null,
                  last_name: null,
                  email: null,
                })\n
                function handleChange(e) {
                  setValues(values => ({
                    ...values,
                    [e.target.id]: e.target.value,
                  }))
                }\n
                function handleSubmit(e) {
                  e.preventDefault()
                  Inertia.post('/users', values)
                }\n
                return (
                  <form onSubmit={handleSubmit}>
                    <label for="first_name">First name:</label>
                    <input id="first_name" value={values.first_name} onChange={handleChange} />
                    {errors.first_name && <div>{errors.first_name}</div>}
                    <label for="last_name">Last name:</label>
                    <input id="last_name" value={values.last_name} onChange={handleChange} />
                    {errors.last_name && <div>{errors.last_name}</div>}
                    <label for="email">Email:</label>
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
                import { Inertia } from '@inertiajs/inertia'\n
                export let errors = {}\n
                let values = {
                  first_name: null,
                  last_name: null,
                  email: null,
                }\n
                function handleSubmit() {
                  Inertia.post('/users', values)
                }
              </script>\n
              <form on:submit|preventDefault={handleSubmit}>
                <label for="first_name">First name:</label>
                <input id="first_name" bind:value={values.first_name}>
                {#if errors.first_name}<div>{errors.first_name}</div>{/if}\n
                <label for="last_name">Last name:</label>
                <input id="last_name" bind:value={values.last_name}>
                {#if errors.last_name}<div>{errors.last_name}</div>{/if}\n
                <label for="email">Email:</label>
                <input id="email" bind:value={values.email}>
                {#if errors.email}<div>{errors.email}</div>{/if}\n
                <button type="submit">Submit</button>
              </form>
            `,
          },
        ]}
      />
      <P>
        Note, in the Vue adapters, you can also access the errors via the <Code>$page.props.errors</Code> object.
      </P>
      <H2>Repopulating input</H2>
      <P>
        While handling errors in Inertia is similar to full page form submissions, this approach is actually much nicer,
        since you don't need to manually repopulate old form input data.
      </P>
      <P>
        When validation errors occur, the user is automatically redirected back to the form page they are already on.
        And, by default, Inertia automatically preserves the{' '}
        <A href="/manual-visits#component-state">component state</A> for <Code>post</Code>, <Code>put</Code>,{' '}
        <Code>patch</Code>, and <Code>delete</Code> requests. Meaning, all the old form input data remains exactly as it
        is.
      </P>
      <P>
        The only thing that changes is the <Code>errors</Code> prop, which now contains the validation errors.
      </P>
      <H2>Error bags</H2>
      <P>
        For pages that have more than one form, it's possible to run into conflicts when displaying validation errors if
        two forms share the same field names. For example, imagine a "create company" form and a "create user" form that
        both have a <Code>name</Code> field. Since both forms will be displaying the <Code>page.props.errors.name</Code>{' '}
        validation error, generating a validation error for the <Code>name</Code> field in either form will cause the
        error to appear in both forms.
      </P>
      <P>
        To get around this, you can use error bags. Error bags scope the validation errors returned from the server
        within a unique key specific to that form. Continuing with our example above, you might have a{' '}
        <Code>createCompany</Code> error bag for the first form, and a <Code>createUser</Code> error bag for the second
        form.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/companies', data, {
            errorBag: 'createCompany',
          })\n
          Inertia.post('/users', data, {
            errorBag: 'createUser',
          })
        `}
      />
      <P>
        Doing this will cause the validation errors to come back from the server as{' '}
        <Code>page.props.errors.createCompany</Code> and <Code>page.props.errors.createUser</Code>.
      </P>
      <P>
        Note, if you're using the <A href="/forms#form-helper">form helper</A>, it's not necessary to use error bags,
        since validation errors are automatically scoped to the form object.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
