import React from 'react'
import dedent from 'dedent-js'
import { A, Code, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Forms',
  links: [
    { url: '#submitting-forms', name: 'Submitting forms' },
    { url: '#server-side-validation', name: 'Server-side validation' },
    { url: '#form-helper', name: 'Form helper' },
    { url: '#file-uploads', name: 'File uploads' },
    { url: '#xhr-fetch-submissions', name: 'XHR / fetch submissions' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Forms</H1>
      <H2>Submitting forms</H2>
      <P>
        While it's possible to make classic HTML form submissions with Inertia, it's not recommended since they cause
        full-page reloads. Instead, it's better to intercept form submissions and then make the{' '}
        <A href="/manual-visits">request using Inertia</A>.
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
                  <label for="last_name">Last name:</label>
                  <input id="last_name" v-model="form.last_name" />
                  <label for="email">Email:</label>
                  <input id="email" v-model="form.email" />
                  <button type="submit">Submit</button>
                </form>
              </template>\n
              <script>
              export default {
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
                  <label for="last_name">Last name:</label>
                  <input id="last_name" v-model="form.last_name" />
                  <label for="email">Email:</label>
                  <input id="email" v-model="form.email" />
                  <button type="submit">Submit</button>
                </form>
              </template>\n
              <script>
              import { reactive } from 'vue'
              import { Inertia } from '@inertiajs/inertia'\n
              export default {
                setup () {
                  const form = reactive({
                    first_name: null,
                    last_name: null,
                    email: null,
                  })\n
                  function submit() {
                    Inertia.post('/users', form)
                  }\n
                  return { form, submit }
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
              import React, { useState } from 'react'\n
              export default function Edit() {
                const [values, setValues] = useState({
                  first_name: "",
                  last_name: "",
                  email: "",
                })\n
                function handleChange(e) {
                  const key = e.target.id;
                  const value = e.target.value
                  setValues(values => ({
                      ...values,
                      [key]: value,
                  }))
                }\n
                function handleSubmit(e) {
                  e.preventDefault()
                  Inertia.post('/users', values)
                }\n
                return (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First name:</label>
                    <input id="first_name" value={values.first_name} onChange={handleChange} />
                    <label htmlFor="last_name">Last name:</label>
                    <input id="last_name" value={values.last_name} onChange={handleChange} />
                    <label htmlFor="email">Email:</label>
                    <input id="email" value={values.email} onChange={handleChange} />
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
                <input id="first_name" bind:value={values.first_name}>\n
                <label for="last_name">Last name:</label>
                <input id="last_name" bind:value={values.last_name}>\n
                <label for="email">Email:</label>
                <input id="email" bind:value={values.email}>\n
                <button type="submit">Submit</button>
              </form>
            `,
          },
        ]}
      />
      <P>
        As you may have noticed in the example above, when using Inertia, you don't typically need inspect form
        responses client-side like you would when making XHR / fetch requests manually.
      </P>
      <P>
        Instead, your server-side route / controller typically issues a <A href="/redirects">redirect</A> response. And,
        of course, there is nothing stopping you from redirecting the user right back to the page they were previously
        on. In this way, handling Inertia form submissions server-side feels very similar to handling classic HTML form
        submissions.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              class UsersController extends Controller
              {
                  public function index()
                  {
                      return Inertia::render('Users/Index', [
                        'users' => User::all(),
                      ]);
                  }\n
                  public function store(Request $request)
                  {
                      User::create($request->validate([
                        'first_name' => ['required', 'max:50'],
                        'last_name' => ['required', 'max:50'],
                        'email' => ['required', 'max:50', 'email'],
                      ]));\n
                      return to_route('users.index');
                  }
              }
            `,
          },
        ]}
      />
      <H2>Server-side validation</H2>
      <P>
        Handling server-side validation errors in Inertia works a little different than handling errors from manual XHR
        / fetch requests. When making XHR / fetch requests, you typically inspect the response for a <Code>422</Code>{' '}
        status code and manually update the form's error state.
      </P>
      <P>
        However, when using Inertia, a <Code>422</Code> response is never returned by your server. Instead, as we saw in
        the example above, your routes / controllers will typically return a redirect response - much like a classic,
        full-page form submission.
      </P>
      <P>
        For a full discussion on handling and displaying validation errors with Inertia, please consult the{' '}
        <A href="/validation">validation</A> documentation.
      </P>
      <H2>Form helper</H2>
      <P>
        Since working with forms is so common, Inertia includes a form helper designed to help reduce the amount of
        boilerplate code needed for handling typical form submissions.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <template>
                <form @submit.prevent="form.post('/login')">
                  <!-- email -->
                  <input type="text" v-model="form.email">
                  <div v-if="form.errors.email">{{ form.errors.email }}</div>
                  <!-- password -->
                  <input type="password" v-model="form.password">
                  <div v-if="form.errors.password">{{ form.errors.password }}</div>
                  <!-- remember me -->
                  <input type="checkbox" v-model="form.remember"> Remember Me
                  <!-- submit -->
                  <button type="submit" :disabled="form.processing">Login</button>
                </form>
              </template>\n
              <script>
              export default {
                data() {
                  return {
                    form: this.$inertia.form({
                      email: null,
                      password: null,
                      remember: false,
                    }),
                  }
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
                <form @submit.prevent="form.post('/login')">
                  <!-- email -->
                  <input type="text" v-model="form.email">
                  <div v-if="form.errors.email">{{ form.errors.email }}</div>
                  <!-- password -->
                  <input type="password" v-model="form.password">
                  <div v-if="form.errors.password">{{ form.errors.password }}</div>
                  <!-- remember me -->
                  <input type="checkbox" v-model="form.remember"> Remember Me
                  <!-- submit -->
                  <button type="submit" :disabled="form.processing">Login</button>
                </form>
              </template>\n
              <script>
              import { useForm } from '@inertiajs/inertia-vue3'\n
              export default {
                setup () {
                  const form = useForm({
                    email: null,
                    password: null,
                    remember: false,
                  })\n
                  return { form }
                },
              }
              </script>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import React from 'react'
              import { useForm } from '@inertiajs/inertia-react'\n
              const { data, setData, post, processing, errors } = useForm({
                email: '',
                password: '',
                remember: false,
              })\n
              function submit(e) {
                e.preventDefault()
                post('/login')
              }\n
              return (
                <form onSubmit={submit}>
                  <input type="text" value={data.email} onChange={e => setData('email', e.target.value)} />
                  {errors.email && <div>{errors.email}</div>}
                  <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                  {errors.password && <div>{errors.password}</div>}
                  <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)} /> Remember Me
                  <button type="submit" disabled={processing}>Login</button>
                </form>
              )
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script>
              import { useForm } from '@inertiajs/inertia-svelte'\n
              let form = useForm({
                email: null,
                password: null,
                remember: false,
              })\n
              function submit() {
                $form.post('/login')
              }
              </script>\n
              <form on:submit|preventDefault={submit}>
                <input type="text" bind:value={$form.email} />
                {#if $form.errors.email}
                  <div class="form-error">{$form.errors.email}</div>
                {/if}
                <input type="text" bind:value={$form.email} />
                {#if $form.errors.email}
                  <div class="form-error">{$form.errors.email}</div>
                {/if}
                <input type="checkbox" bind:checked={$form.remember} /> Remember Me
                <button type="submit" disabled={$form.processing}>Submit</button>
              </form>
            `,
          },
        ]}
      />
      <P>
        To submit the form, you may use the <Code>get</Code>, <Code>post</Code>, <Code>put</Code>, <Code>patch</Code>{' '}
        and <Code>delete</Code> methods.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              form.submit(method, url, options)
              form.get(url, options)
              form.post(url, options)
              form.put(url, options)
              form.patch(url, options)
              form.delete(url, options)
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              form.submit(method, url, options)
              form.get(url, options)
              form.post(url, options)
              form.put(url, options)
              form.patch(url, options)
              form.delete(url, options)
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { submit, get, post, put, patch, delete: destroy } = useForm({ ... })\n
              submit(method, url, options)
              get(url, options)
              post(url, options)
              put(url, options)
              patch(url, options)
              destroy(url, options)
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              $form.submit(method, url, options)
              $form.get(url, options)
              $form.post(url, options)
              $form.put(url, options)
              $form.patch(url, options)
              $form.delete(url, options)
            `,
          },
        ]}
      />
      <P>
        The submit methods support all of the typical <A href="/manual-visits">visit options</A>, such as{' '}
        <Code>preserveState</Code>, <Code>preserveScroll</Code>, and event callbacks, which can be helpful for
        performing tasks on successful form submissions. For example, you might use the <Code>onSuccess</Code> callback
        to reset inputs to their original state.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              form.post('/profile', {
                preserveScroll: true,
                onSuccess: () => form.reset('password'),
              })
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              form.post('/profile', {
                preserveScroll: true,
                onSuccess: () => form.reset('password'),
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
            const { post, reset } = useForm({ ... })\n
            post('/profile', {
              preserveScroll: true,
              onSuccess: () => reset('password'),
            })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              $form.post('/profile', {
                preserveScroll: true,
                onSuccess: () => $form.reset('password'),
              })
            `,
          },
        ]}
      />
      <P>
        If you need to modify the form data before it's sent to the server, you can do this via the{' '}
        <Code>transform()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              form
                .transform((data) => ({
                  ...data,
                  remember: data.remember ? 'on' : '',
                }))
                .post('/login')
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              form
                .transform((data) => ({
                  ...data,
                  remember: data.remember ? 'on' : '',
                }))
                .post('/login')
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { transform } = useForm({ ... })\n
              transform((data) => ({
                ...data,
                remember: data.remember ? 'on' : '',
              }))
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              $form
                .transform((data) => ({
                  ...data,
                  remember: data.remember ? 'on' : '',
                }))
                .post('/login')
            `,
          },
        ]}
      />
      <P>
        You can use the <Code>processing</Code> property to track if a form is currently being submitted. This can be
        helpful for preventing double form submissions by disabling the submit button.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <button type="submit" :disabled="form.processing">Submit</button>
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <button type="submit" :disabled="form.processing">Submit</button>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              const { processing } = useForm({ ... })\n
              <button type="submit" disabled={processing}>Submit</button>
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              <button type="submit" disabled={$form.processing}>Submit</button>
            `,
          },
        ]}
      />
      <P>
        If your form is uploading files, the current progress event is available via the <Code>progress</Code> property,
        allowing you to easily display the upload progress.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                {{ form.progress.percentage }}%
              </progress>
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                {{ form.progress.percentage }}%
              </progress>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              const { progress } = useForm({ ... })\n
              {progress && (
                <progress value={progress.percentage} max="100">
                  {progress.percentage}%
                </progress>
              )}
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              {#if $form.progress}
                <progress value={$form.progress.percentage} max="100">
                  {$form.progress.percentage}%
                </progress>
              {/if}
            `,
          },
        ]}
      />
      <P>
        In the event there are form errors, they are available via the <Code>errors</Code> property. When building
        Laravel powered Inertia applications, form errors will automatically be populated when your application throws
        instances of <Code>ValidationException</Code>, such as when using <Code>$request->validate()</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              <div v-if="form.errors.email">{{ form.errors.email }}</div>
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              <div v-if="form.errors.email">{{ form.errors.email }}</div>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              const { errors } = useForm({ ... })\n
              {errors.email && <div>{errors.email}</div>}
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              {#if $form.errors.email}
                <div>{$form.errors.email}</div>
              {/if}
            `,
          },
        ]}
      />
      <Notice>
        For a more thorough discussion of form validation and errors, please consult the{' '}
        <A href="/validation">validation documentation</A>.
      </Notice>
      <P>
        To determine if a form has any errors, you may use the <Code>hasErrors</Code> property. To clear form errors,
        use the <Code>clearErrors()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              // Clear all errors...
              form.clearErrors()\n
              // Clear errors for specific fields...
              form.clearErrors('field', 'anotherfield')
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              // Clear all errors...
              form.clearErrors()\n
              // Clear errors for specific fields...
              form.clearErrors('field', 'anotherfield')
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { clearErrors } = useForm({ ... })\n
              // Clear all errors...
              clearErrors()\n
              // Clear errors for specific fields...
              clearErrors('field', 'anotherfield')
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Clear all errors...
              $form.clearErrors()\n
              // Clear errors for specific fields...
              $form.clearErrors('field', 'anotherfield')
            `,
          },
        ]}
      />
      <P>
        If you're using a client-side input validation libraries or do additional manual validation, you can also set
        your own errors on the form using the <Code>setErrors()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              // Set a single error...
              form.setError('field', 'Your error message.');\n
              // Set multiple errors at once...
              form.setError({
                foo: 'Your error message for the foo field.',
                bar: 'Some other error for the bar field.'
              });
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              // Set a single error...
              form.setError('field', 'Your error message.');\n
              // Set multiple errors at once...
              form.setError({
                foo: 'Your error message for the foo field.',
                bar: 'Some other error for the bar field.'
              });
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { setError } = useForm({ ... })\n
              // Set a single error...
              setError('field', 'Your error message.');\n
              // Set multiple errors at once...
              setError({
                foo: 'Your error message for the foo field.',
                bar: 'Some other error for the bar field.'
              });
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Set a single error
              $form.setError('field', 'Your error message.');\n
              // Set multiple errors at once
              $form.setError({
                foo: 'Your error message for the foo field.',
                bar: 'Some other error for the bar field.'
              });
            `,
          },
        ]}
      />
      <Notice>
        Unlike an actual form submission, the page's props remain unchanged when manually setting errors on a form
        instance.
      </Notice>
      <P>
        When a form has been successfully submitted, the <Code>wasSuccessful</Code> property will be <Code>true</Code>.
        In addition to this, forms have a <Code>recentlySuccessful</Code> property, which will be set to{' '}
        <Code>true</Code> for two seconds after a successful form submission. This property can be utilized to show
        temporary success messages.
      </P>
      <P>
        To reset the form's values back to their default values, you can use the <Code>reset()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              // Reset the form...
              form.reset()\n
              // Reset specific fields...
              form.reset('field', 'anotherfield')
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              // Reset the form...
              form.reset()\n
              // Reset specific fields...
              form.reset('field', 'anotherfield')
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { reset } = useForm({ ... })\n
              // Reset the form...
              reset()\n
              // Reset specific fields...
              reset('field', 'anotherfield')
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Reset the form...
              $form.reset()\n
              // Reset specific fields...
              $form.reset('field', 'anotherfield')
            `,
          },
        ]}
      />
      <P>
        If your form's default values become outdated, you can use the <Code>defaults()</Code> method to update them.
        Then, the form will be reset to the correct values the next time the <Code>reset()</Code> method is invoked.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              // Set the form's current values as the new defaults...
              form.defaults()\n
              // Update the default value of a single field...
              form.defaults('email', 'updated-default@example.com')\n
              // Update the default value of multiple fields...
              form.defaults({
                name: 'Updated Example',
                email: 'updated-default@example.com',
              })
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              // Set the form's current values as the new defaults...
              form.defaults()\n
              // Update the default value of a single field...
              form.defaults('email', 'updated-default@example.com')\n
              // Update the default value of multiple fields...
              form.defaults({
                name: 'Updated Example',
                email: 'updated-default@example.com',
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { setDefaults } = useForm({ ... })\n
              // Set the form's current values as the new defaults...
              setDefaults()\n
              // Update the default value of a single field...
              setDefaults('email', 'updated-default@example.com')\n
              // Update the default value of multiple fields...
              setDefaults({
                name: 'Updated Example',
                email: 'updated-default@example.com',
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Set the form's current values as the new defaults...
              $form.defaults()\n
              // Update the default value of a single field...
              $form.defaults('email', 'updated-default@example.com')\n
              // Change the default value of multiple fields...
              $form.defaults({
                name: 'Updated Example',
                email: 'updated-default@example.com',
              })
            `,
          },
        ]}
      />
      <P>
        To determine if a form has any changes, you may use the <Code>isDirty</Code> property.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <div v-if="form.isDirty">There are unsaved form changes.</div>
            `,
          },
          {
            name: 'Vue 3',
            language: 'twig',
            code: dedent`
              <div v-if="form.isDirty">There are unsaved form changes.</div>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              {errors.isDirty && <div>There are unsaved form changes.</div>}
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              {#if $form.isDirty}
                <div>There are unsaved form changes.</div>
              {/if}
            `,
          },
        ]}
      />
      <P>
        To cancel a form submission, use the <Code>cancel()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              form.cancel()
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              form.cancel()
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { cancel } = useForm({ ... })\n
              cancel()
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              $form.cancel()
            `,
          },
        ]}
      />
      <P>
        To instruct Inertia to store a form's data and errors in <A href="/remembering-state">history state</A>, you can
        provide a unique form key as the first argument when instantiating your form.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              this.$inertia.form('CreateUser', data)
              this.$inertia.form(\`EditUser:\${this.user.id}\`, data)
            `,
          },
          {
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/inertia-vue3'\n
              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/inertia-react'\n
              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/inertia-svelte'\n
              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
        ]}
      />
      <H2>File uploads</H2>
      <P>
        When making requests or form submissions that include files, Inertia will automatically convert the request data
        into a <Code>FormData</Code> object.
      </P>
      <P>
        For a more thorough discussion of file uploads, please consult the{' '}
        <A href="/file-uploads">file uploads documentation</A>.
      </P>
      <H2>XHR / fetch submissions</H2>
      <P>
        Using Inertia to submit forms works great for the vast majority of situations; however, in the event that you
        need more control over the form submission, you're free to make plain XHR or <Code>fetch</Code> requests instead
        using the library of your choice.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
