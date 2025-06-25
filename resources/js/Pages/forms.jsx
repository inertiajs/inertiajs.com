import { A, Code, H1, H2, H3, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Forms',
  links: [
    { url: '#submitting-forms', name: 'Submitting forms' },
    { url: '#server-side-validation', name: 'Server-side validation' },
    { url: '#form-helper', name: 'Form helper' },
    { url: '#file-uploads', name: 'File uploads' },
    { url: '#xhr-fetch-submissions', name: 'XHR / fetch submissions' },
  ],
}

export default function () {
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
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { reactive } from 'vue'
              import { router } from '@inertiajs/vue3'

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
                  <label for="last_name">Last name:</label>
                  <input id="last_name" v-model="form.last_name" />
                  <label for="email">Email:</label>
                  <input id="email" v-model="form.email" />
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
              import { router } from '@inertiajs/react'

              export default function Edit() {
                const [values, setValues] = useState({
                  first_name: "",
                  last_name: "",
                  email: "",
                })

                function handleChange(e) {
                  const key = e.target.id;
                  const value = e.target.value
                  setValues(values => ({
                      ...values,
                      [key]: value,
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
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <script>
                import { router } from '@inertiajs/svelte'

                let values = {
                  first_name: null,
                  last_name: null,
                  email: null,
                }

                function submit() {
                  router.post('/users', values)
                }
              </script>

              <form on:submit|preventDefault={submit}>
                <label for="first_name">First name:</label>
                <input id="first_name" bind:value={values.first_name}>

                <label for="last_name">Last name:</label>
                <input id="last_name" bind:value={values.last_name}>

                <label for="email">Email:</label>
                <input id="email" bind:value={values.email}>

                <button type="submit">Submit</button>
              </form>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'html',
            code: dedent`
              <script>
                import { router } from '@inertiajs/svelte'

                let values = {
                  first_name: null,
                  last_name: null,
                  email: null,
                }

                function submit(e) {
                  e.preventDefault()
                  router.post('/users', values)
                }
              </script>

              <form onsubmit={submit}>
                <label for="first_name">First name:</label>
                <input id="first_name" bind:value={values.first_name}>

                <label for="last_name">Last name:</label>
                <input id="last_name" bind:value={values.last_name}>

                <label for="email">Email:</label>
                <input id="email" bind:value={values.email}>

                <button type="submit">Submit</button>
              </form>
            `,
          },
        ]}
      />
      <P>
        As you may have noticed in the example above, when using Inertia, you don't typically need to inspect form
        responses client-side like you would when making XHR / fetch requests manually.
      </P>
      <P>
        Instead, your server-side route / controller typically issues a <A href="/redirects">redirect</A> response. And,
        Of course, there is nothing stopping you from redirecting the user right back to the page they were previously
        on. Using this approach, handling Inertia form submissions feels very similar to handling classic HTML form
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
                  }

                  public function store(Request $request)
                  {
                      User::create($request->validate([
                        'first_name' => ['required', 'max:50'],
                        'last_name' => ['required', 'max:50'],
                        'email' => ['required', 'max:50', 'email'],
                      ]));

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
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { useForm } from '@inertiajs/vue3'

              const form = useForm({
                email: null,
                password: null,
                remember: false,
              })
              </script>

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
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { useForm } from '@inertiajs/react'

              const { data, setData, post, processing, errors } = useForm({
                email: '',
                password: '',
                remember: false,
              })

              function submit(e) {
                e.preventDefault()
                post('/login')
              }

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
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <script>
                import { useForm } from '@inertiajs/svelte'

                const form = useForm({
                  email: null,
                  password: null,
                  remember: false,
                })

                function submit() {
                  $form.post('/login')
                }
              </script>

              <form on:submit|preventDefault={submit}>
                <input type="text" bind:value={$form.email} />
                {#if $form.errors.email}
                  <div class="form-error">{$form.errors.email}</div>
                {/if}
                <input type="password" bind:value={$form.password} />
                {#if $form.errors.password}
                  <div class="form-error">{$form.errors.password}</div>
                {/if}
                <input type="checkbox" bind:checked={$form.remember} /> Remember Me
                <button type="submit" disabled={$form.processing}>Submit</button>
              </form>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'jsx',
            code: dedent`
              <script>
                import { useForm } from '@inertiajs/svelte'

                const form = useForm({
                  email: null,
                  password: null,
                  remember: false,
                })

                function submit(e) {
                  e.preventDefault()
                  $form.post('/login')
                }
              </script>

              <form onsubmit={submit}>
                <input type="text" bind:value={$form.email} />
                {#if $form.errors.email}
                  <div class="form-error">{$form.errors.email}</div>
                {/if}
                <input type="password" bind:value={$form.password} />
                {#if $form.errors.password}
                  <div class="form-error">{$form.errors.password}</div>
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
            name: 'Vue',
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
              const { submit, get, post, put, patch, delete: destroy } = useForm({ ... })

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
            name: 'Vue',
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
            const { post, reset } = useForm({ ... })

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
        If you need to modify the form data before it's sent to the server, you can do so via the{' '}
        <Code>transform()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
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
              const { transform } = useForm({ ... })

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
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              <button type="submit" :disabled="form.processing">Submit</button>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              const { processing } = useForm({ ... })

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
            name: 'Vue',
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
              const { progress } = useForm({ ... })

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
        If there are form validation errors, they are available via the <Code>errors</Code> property. When building
        Laravel powered Inertia applications, form errors will automatically be populated when your application throws
        instances of <Code>ValidationException</Code>, such as when using <Code>{'$request->validate()'}</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              <div v-if="form.errors.email">{{ form.errors.email }}</div>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              const { errors } = useForm({ ... })

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
            name: 'Vue',
            language: 'js',
            code: dedent`
              // Clear all errors...
              form.clearErrors()

              // Clear errors for specific fields...
              form.clearErrors('field', 'anotherfield')
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { clearErrors } = useForm({ ... })

              // Clear all errors...
              clearErrors()

              // Clear errors for specific fields...
              clearErrors('field', 'anotherfield')
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Clear all errors...
              $form.clearErrors()

              // Clear errors for specific fields...
              $form.clearErrors('field', 'anotherfield')
            `,
          },
        ]}
      />
      <P>
        If you're using a client-side input validation libraries or do client-side validation manually, you can set your
        own errors on the form using the <Code>setErrors()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              // Set a single error...
              form.setError('field', 'Your error message.');

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
              const { setError } = useForm({ ... })

              // Set a single error...
              setError('field', 'Your error message.');

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
              $form.setError('field', 'Your error message.');

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
            name: 'Vue',
            language: 'js',
            code: dedent`
              // Reset the form...
              form.reset()

              // Reset specific fields...
              form.reset('field', 'anotherfield')
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { reset } = useForm({ ... })

              // Reset the form...
              reset()

              // Reset specific fields...
              reset('field', 'anotherfield')
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Reset the form...
              $form.reset()

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
            name: 'Vue',
            language: 'js',
            code: dedent`
              // Set the form's current values as the new defaults...
              form.defaults()

              // Update the default value of a single field...
              form.defaults('email', 'updated-default@example.com')

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
              const { setDefaults } = useForm({ ... })

              // Set the form's current values as the new defaults...
              setDefaults()

              // Update the default value of a single field...
              setDefaults('email', 'updated-default@example.com')

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
              $form.defaults()

              // Update the default value of a single field...
              $form.defaults('email', 'updated-default@example.com')

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
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <div v-if="form.isDirty">There are unsaved form changes.</div>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              const { isDirty } = useForm({ ... })

              {isDirty && <div>There are unsaved form changes.</div>}
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
            name: 'Vue',
            language: 'js',
            code: dedent`
              form.cancel()
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { cancel } = useForm({ ... })

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
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/vue3'

              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/react'

              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/svelte'

              const form = useForm('CreateUser', data)
              const form = useForm(\`EditUser:\${user.id}\`, data)
            `,
          },
        ]}
      />
      <H3>Wayfinder</H3>
      <P>
        <strong>Requires Inertia &gt;= v2.0.6</strong>
      </P>
      <P>
        When using <A href="https://github.com/laravel/wayfinder">Wayfinder</A> in conjunction with the form helper, you
        can simply pass the resulting object directly to the <Code>form.submit</Code> method. The form helper will infer
        the HTTP method and URL from the Wayfinder object:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/vue3'
              import { store } from 'App/Http/Controllers/UserController'

              const form = useForm({
                name: 'John Doe',
                email: 'john.doe@example.com',
              })

              form.submit(store())
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/react'
              import { store } from 'App/Http/Controllers/UserController'

              const form = useForm({
                name: 'John Doe',
                email: 'john.doe@example.com',
              })

              form.submit(store())
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { useForm } from '@inertiajs/svelte'
              import { store } from 'App/Http/Controllers/UserController'

              const form = useForm({
                name: 'John Doe',
                email: 'john.doe@example.com',
              })

              form.submit(store())
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
