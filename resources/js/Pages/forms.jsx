import { A, Code, H1, H2, H3, MinimumVersion, Notice, P, React, Svelte, TabbedCode, Vue } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Forms',
  links: [
    { url: '#form-component', name: 'Form component' },
    { url: '#form-helper', name: 'Form helper' },
    { url: '#server-side-responses', name: 'Server-side responses' },
    { url: '#server-side-validation', name: 'Server-side validation' },
    { url: '#manual-form-submissions', name: 'Manual form submissions' },
    { url: '#file-uploads', name: 'File uploads' },
    { url: '#xhr-fetch-submissions', name: 'XHR / fetch submissions' },
  ],
}

export default function () {
  return (
    <>
      <H1>Forms</H1>
      <P>
        Inertia provides two primary ways to build forms: the <Code>&lt;Form&gt;</Code> component and the{' '}
        <Code>useForm</Code> helper. Both integrate with your server-side framework's validation and handle form
        submissions without full page reloads.
      </P>
      <H2>Form component</H2>
      <P>
        Inertia provides a <Code>&lt;Form&gt;</Code> component that behaves much like a classic HTML form, but uses
        Inertia under the hood to avoid full page reloads. This is the simplest way to get started with forms in
        Inertia.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { Form } from '@inertiajs/vue3'
              </script>

              <template>
                <Form action="/users" method="post">
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <button type="submit">Create User</button>
                </Form>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Form } from '@inertiajs/react'

              export default () => (
                <Form action="/users" method="post">
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <button type="submit">Create User</button>
                </Form>
              )
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script>
                import { Form } from '@inertiajs/svelte'
              </script>

              <Form action="/users" method="post">
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Create User</button>
              </Form>
            `,
          },
        ]}
      />
      <P>
        Just like a traditional HTML form, there is no need to attach{' '}
        <Vue>
          a <Code>v-model</Code>
        </Vue>
        <React>
          an <Code>onChange</Code> handler
        </React>
        <Svelte>
          a <Code>bind:</Code>
        </Svelte>{' '}
        to your input fields, just give each input a <Code>name</Code> attribute{' '}
        <React>
          and a <Code>defaultValue</Code> (if applicable){' '}
        </React>
        and the <Code>Form</Code> component will handle the data submission for you.
      </P>
      <P>
        The component also supports nested data structures, file uploads, and dotted key notation.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form action="/reports" method="post">
                <input type="text" name="name" />
                <textarea name="report[description]"></textarea>
                <input type="text" name="report[tags][]" />
                <input type="file" name="documents" multiple />
                <button type="submit">Create Report</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form action="/reports" method="post">
                <input type="text" name="name" />
                <textarea name="report[description]"></textarea>
                <input type="text" name="report[tags][]" />
                <input type="file" name="documents" multiple />
                <button type="submit">Create Report</button>
              </Form>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <Form action="/reports" method="post">
                <input type="text" name="name" />
                <textarea name="report[description]"></textarea>
                <input type="text" name="report[tags][]" />
                <input type="file" name="documents" multiple />
                <button type="submit">Create Report</button>
              </Form>
            `,
          },
        ]}
      />
      <P>
        You can pass a <Code>transform</Code> prop to modify the form data before submission. This is useful for
        injecting additional fields or transforming existing data, although hidden inputs work too.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form
                action="/posts"
                method="post"
                :transform="data => ({ ...data, user_id: 123 })"
              >
                <input type="text" name="title" />
                <button type="submit">Create Post</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form
                action="/posts"
                method="post"
                transform={data => ({ ...data, user_id: 123 })}
              >
                <input type="text" name="title" />
                <button type="submit">Create Post</button>
              </Form>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <Form
                action="/posts"
                method="post"
                transform={data => ({ ...data, user_id: 123 })}
              >
                <input type="text" name="title" />
                <button type="submit">Create Post</button>
              </Form>
            `,
          },
        ]}
      />
      <H3>Wayfinder</H3>
      <P>
        When using <A href="https://github.com/laravel/wayfinder">Wayfinder</A>, you can pass the resulting object
        directly to the <Code>action</Code> prop. The Form component will infer the HTTP method and URL from the
        Wayfinder object.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { Form } from '@inertiajs/vue3'
              import { store } from 'App/Http/Controllers/UserController'
              </script>

              <template>
                <Form :action="store()">
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <button type="submit">Create User</button>
                </Form>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Form } from '@inertiajs/react'
              import { store } from 'App/Http/Controllers/UserController'

              export default () => (
                <Form action={store()}>
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <button type="submit">Create User</button>
                </Form>
              )
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script>
                import { Form } from '@inertiajs/svelte'
                import { store } from 'App/Http/Controllers/UserController'
              </script>

              <Form action={store()}>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Create User</button>
              </Form>
            `,
          },
        ]}
      />
      <H3>Checkbox inputs</H3>
      <P>
        When working with checkboxes, you may want to add an explicit <Code>value</Code> attribute such as{' '}
        <Code>value="1"</Code>. Without a value attribute, checked checkboxes will submit as <Code>"on"</Code>, which
        some server-side validation rules may not recognize as a proper boolean value.
      </P>
      <H3>Slot props</H3>
      <P>
        The <Code>&lt;Form&gt;</Code> component exposes reactive state and helper methods through its default slot,
        giving you access to form processing state, errors, and utility functions.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form
                action="/users"
                method="post"
                #default="{
                  errors,
                  hasErrors,
                  processing,
                  progress,
                  wasSuccessful,
                  recentlySuccessful,
                  setError,
                  clearErrors,
                  resetAndClearErrors,
                  defaults,
                  isDirty,
                  reset,
                  submit,
                }"
              >
                <input type="text" name="name" />

                <div v-if="errors.name">
                  {{ errors.name }}
                </div>

                <button type="submit" :disabled="processing">
                  {{ processing ? 'Creating...' : 'Create User' }}
                </button>

                <div v-if="wasSuccessful">User created successfully!</div>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form action="/users" method="post">
                {({
                  errors,
                  hasErrors,
                  processing,
                  progress,
                  wasSuccessful,
                  recentlySuccessful,
                  setError,
                  clearErrors,
                  resetAndClearErrors,
                  defaults,
                  isDirty,
                  reset,
                  submit,
                }) => (
                  <>
                    <input type="text" name="name" />

                    {errors.name && <div>{errors.name}</div>}

                    <button type="submit" disabled={processing}>
                      {processing ? 'Creating...' : 'Create User'}
                    </button>

                    {wasSuccessful && <div>User created successfully!</div>}
                  </>
                )}
              </Form>
            `,
          },
          {
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <Form
                action="/users"
                method="post"
                let:errors
                let:hasErrors
                let:processing
                let:progress
                let:wasSuccessful
                let:recentlySuccessful
                let:setError
                let:clearErrors
                let:resetAndClearErrors
                let:defaults
                let:isDirty
                let:reset
                let:submit
              >
                <input type="text" name="name" />

                {#if errors.name}
                  <div>{errors.name}</div>
                {/if}

                <button type="submit" disabled={processing}>
                  {processing ? 'Creating...' : 'Create User'}
                </button>

                {#if wasSuccessful}
                  <div>User created successfully!</div>
                {/if}
              </Form>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'html',
            code: dedent`
              <Form action="/users" method="post">
                {#snippet children({
                  errors,
                  hasErrors,
                  processing,
                  progress,
                  wasSuccessful,
                  recentlySuccessful,
                  setError,
                  clearErrors,
                  resetAndClearErrors,
                  defaults,
                  isDirty,
                  reset,
                  submit,
                })}
                  <input type="text" name="name" />

                  {#if errors.name}
                    <div>{errors.name}</div>
                  {/if}

                  <button type="submit" disabled={processing}>
                    {processing ? 'Creating...' : 'Create User'}
                  </button>

                  {#if wasSuccessful}
                    <div>User created successfully!</div>
                  {/if}
                {/snippet}
              </Form>
            `,
          },
        ]}
      />
      <P>
        The <Code>defaults</Code> method allows you to update the form's default values to match the current field{' '}
        values. When called, subsequent <Code>reset()</Code> calls will restore fields to these new defaults, and the{' '}
        <Code>isDirty</Code> property will track changes from these updated defaults. Unlike <Code>useForm</Code>, this
        method accepts no arguments and always uses all current form values.
      </P>
      <P>
        The <Code>errors</Code> object uses dotted notation for nested fields, allowing you to display validation
        messages for complex form structures.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form action="/users" method="post" #default="{ errors }">
                <input type="text" name="user.name" />
                <div v-if="errors['user.name']">{{ errors['user.name'] }}</div>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form action="/users" method="post">
                {({ errors }) => (
                  <>
                    <input type="text" name="user.name" />
                    {errors['user.name'] && <div>{errors['user.name']}</div>}
                  </>
                )}
              </Form>
            `,
          },
          {
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <Form action="/users" method="post" let:errors>
                <input type="text" name="user.name" />
                {#if errors['user.name']}
                  <div>{errors['user.name']}</div>
                {/if}
              </Form>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'html',
            code: dedent`
              <Form action="/users" method="post">
                {#snippet children({ errors })}
                  <input type="text" name="user.name" />
                  {#if errors['user.name']}
                    <div>{errors['user.name']}</div>
                  {/if}
                {/snippet}
              </Form>
            `,
          },
        ]}
      />
      <H3>Props and options</H3>
      <P>
        In addition to <Code>action</Code> and <Code>method</Code>, the <Code>&lt;Form&gt;</Code> component accepts
        several props. Many of them are identical to the options available in Inertia's{' '}
        <A href="/manual-visits">visit options</A>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form
                action="/profile"
                method="put"
                error-bag="profile"
                query-string-array-format="indices"
                :headers="{ 'X-Custom-Header': 'value' }"
                :show-progress="false"
                :transform="data => ({ ...data, timestamp: Date.now() })"
                :invalidate-cache-tags="['users', 'dashboard']"
                disable-while-processing
                :options="{
                  preserveScroll: true,
                  preserveState: true,
                  preserveUrl: true,
                  replace: true,
                  only: ['users', 'flash'],
                  except: ['secret'],
                  reset: ['page'],
                }"
              >
                <input type="text" name="name" />
                <button type="submit">Update</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form
                action="/profile"
                method="put"
                errorBag="profile"
                queryStringArrayFormat="indices"
                headers={{ 'X-Custom-Header': 'value' }}
                showProgress={false}
                transform={data => ({ ...data, timestamp: Date.now() })}
                invalidateCacheTags={['users', 'dashboard']}
                disableWhileProcessing
                options={{
                  preserveScroll: true,
                  preserveState: true,
                  preserveUrl: true,
                  replace: true,
                  only: ['users', 'flash'],
                  except: ['secret'],
                  reset: ['page'],
                }}
              >
                <input type="text" name="name" />
                <button type="submit">Update</button>
              </Form>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <Form
                action="/profile"
                method="put"
                errorBag="profile"
                queryStringArrayFormat="indices"
                headers={{ 'X-Custom-Header': 'value' }}
                showProgress={false}
                transform={data => ({ ...data, timestamp: Date.now() })}
                invalidateCacheTags={['users', 'dashboard']}
                disableWhileProcessing
                options={{
                  preserveScroll: true,
                  preserveState: true,
                  preserveUrl: true,
                  replace: true,
                  only: ['users', 'flash'],
                  except: ['secret'],
                  reset: ['page'],
                }}
              >
                <input type="text" name="name" />
                <button type="submit">Update</button>
              </Form>
            `,
          },
        ]}
      />
      <P>
        Some props are intentionally grouped under <Code>options</Code> instead of being top-level to avoid confusion.
        For example, <Code>only</Code>, <Code>except</Code>, and <Code>reset</Code> relate to <em>partial reloads</em>,
        not <em>partial submissions</em>. The general rule: top-level props are for the form submission itself, while{' '}
        <Code>options</Code> control how Inertia handles the subsequent visit.
      </P>
      <P>
        When setting the{' '}
        <React>
          <Code>disableWhileProcessing</Code>
        </React>
        <Svelte>
          <Code>disableWhileProcessing</Code>
        </Svelte>
        <Vue>
          <Code>disable-while-processing</Code>
        </Vue>{' '}
        prop, the <Code>Form</Code> component will add the <Code>inert</Code> attribute to the HTML <Code>form</Code>{' '}
        tag while the form is processing to prevent user interaction.
      </P>
      <P>To style the form while it's processing, you can target the inert form in the following ways.</P>
      <TabbedCode
        examples={[
          {
            name: 'Tailwind 4',
            language: 'jsx',
            code: dedent`
                <Form
                    action="/profile"
                    method="put"
                    disableWhileProcessing
                    className="inert:opacity-50 inert:pointer-events-none"
                >
                    {/* Your form fields here */}
                </Form>
            `,
          },
          {
            name: 'CSS',
            language: 'css',
            code: dedent`
                form[inert] {
                    opacity: 0.5;
                    pointer-events: none;
                }
            `,
          },
        ]}
      />
      <H3>Events</H3>
      <P>
        The <Code>&lt;Form&gt;</Code> component emits all the standard visit <A href="/events">events</A> for form
        submissions.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form
                action="/users"
                method="post"
                @before="handleBefore"
                @start="handleStart"
                @progress="handleProgress"
                @success="handleSuccess"
                @error="handleError"
                @finish="handleFinish"
                @cancel="handleCancel"
                @cancelToken="handleCancelToken"
              >
                <input type="text" name="name" />
                <button type="submit">Create User</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form
                action="/users"
                method="post"
                onCancelToken={handleCancelToken}
                onBefore={handleBefore}
                onStart={handleStart}
                onProgress={handleProgress}
                onCancel={handleCancel}
                onSuccess={handleSuccess}
                onError={handleError}
                onFinish={handleFinish}
              >
                <input type="text" name="name" />
                <button type="submit">Create User</button>
              </Form>
            `,
          },
          {
            name: 'Svelte 4',
            language: 'html',
            code: dedent`
              <Form
                action="/users"
                method="post"
                on:cancelToken={handleCancelToken}
                on:before={handleBefore}
                on:start={handleStart}
                on:progress={handleProgress}
                on:cancel={handleCancel}
                on:success={handleSuccess}
                on:error={handleError}
                on:finish={handleFinish}
              >
                <input type="text" name="name" />
                <button type="submit">Create User</button>
              </Form>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'html',
            code: dedent`
              <Form
                action="/users"
                method="post"
                onCancelToken={handleCancelToken}
                onBefore={handleBefore}
                onStart={handleStart}
                onProgress={handleProgress}
                onCancel={handleCancel}
                onSuccess={handleSuccess}
                onError={handleError}
                onFinish={handleFinish}
              >
                <input type="text" name="name" />
                <button type="submit">Create User</button>
              </Form>
            `,
          },
        ]}
      />
      <H3>Resetting the Form</H3>
      <P>
        The <Code>Form</Code> component provides several attributes that allow you to reset the form after a submission.
      </P>
      <P>`resetOnSuccess` may be used to reset the form after a successful submission.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <!-- Reset the entire form on success -->
              <Form action="/users" method="post" resetOnSuccess>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>

              <!-- Reset specific fields on success -->
              <Form action="/users" method="post" :resetOnSuccess="['name']">
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              // Reset the entire form on success
              <Form action="/users" method="post" resetOnSuccess>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>

              // Reset specific fields on success
              <Form action="/users" method="post" resetOnSuccess={['name']}>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
                <!-- Reset the entire form on success -->
                <Form action="/users" method="post" resetOnSuccess>
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <button type="submit">Submit</button>
                </Form>

                <!-- Reset specific fields on success -->
                <Form action="/users" method="post" resetOnSuccess={['name']}>
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <button type="submit">Submit</button>
                </Form>
            `,
          },
        ]}
      />
      <P>`resetOnError` may be used to reset the form after errors.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <!-- Reset the entire form on error -->
              <Form action="/users" method="post" resetOnError>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>

              <!-- Reset specific fields on error -->
              <Form action="/users" method="post" :resetOnError="['name']">
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              // Reset the entire form on error
              <Form action="/users" method="post" resetOnError>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>

              // Reset specific fields on error
              <Form action="/users" method="post" resetOnError={['name']}>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
                <!-- Reset the entire form on error -->
                <Form action="/users" method="post" resetOnError>
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <button type="submit">Submit</button>
                </Form>

                <!-- Reset specific fields on error -->
                <Form action="/users" method="post" resetOnError={['name']}>
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <button type="submit">Submit</button>
                </Form>
            `,
          },
        ]}
      />
      <H3>Setting new default values</H3>
      <P>
        The <Code>Form</Code> component provides the <Code>setDefaultsOnSuccess</Code> attribute to set the current form
        values as the new defaults after a successful submission.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form action="/users" method="post" setDefaultsOnSuccess>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form action="/users" method="post" setDefaultsOnSuccess>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
                <Form action="/users" method="post" setDefaultsOnSuccess>
                    <input type="text" name="name" />
                    <input type="email" name="email" />
                    <button type="submit">Submit</button>
                </Form>
            `,
          },
        ]}
      />
      <H3>Dotted key notation</H3>
      <P>
        The <Code>&lt;Form&gt;</Code> component supports dotted key notation for creating nested objects from flat input
        names. This provides a convenient way to structure form data.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form action="/users" method="post">
                <input type="text" name="user.name" />
                <input type="text" name="user.skills[]" />
                <input type="text" name="address.street" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form action="/users" method="post">
                <input type="text" name="user.name" />
                <input type="text" name="user.skills[]" />
                <input type="text" name="address.street" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <Form action="/users" method="post">
                <input type="text" name="user.name" />
                <input type="text" name="user.skills[]" />
                <input type="text" name="address.street" />
                <button type="submit">Submit</button>
              </Form>
            `,
          },
        ]}
      />
      <P>The example above would generate the following data structure.</P>
      <TabbedCode
        examples={[
          {
            name: 'JSON',
            language: 'json',
            code: dedent`
              {
                "user": {
                  "name": "John Doe",
                  "skills": ["JavaScript"]
                },
                "address": {
                  "street": "123 Main St"
                }
              }
            `,
          },
        ]}
      />
      <P>
        If you need literal dots in your field names (not as nested object separators), you can escape them using
        backslashes.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <Form action="/config" method="post">
                <input type="text" name="app\\.name" />
                <input type="text" name="settings.theme\\.mode" />
                <button type="submit">Save</button>
              </Form>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              <Form action="/config" method="post">
                <input type="text" name="app\\.name" />
                <input type="text" name="settings.theme\\.mode" />
                <button type="submit">Save</button>
              </Form>
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <Form action="/config" method="post">
                <input type="text" name="app\\.name" />
                <input type="text" name="settings.theme\\.mode" />
                <button type="submit">Save</button>
              </Form>
            `,
          },
        ]}
      />
      <P>The example above would generate the following data structure.</P>
      <TabbedCode
        examples={[
          {
            name: 'JSON',
            language: 'json',
            code: dedent`
              {
                "app.name": "My Application",
                "settings": {
                  "theme.mode": "dark"
                }
              }
            `,
          },
        ]}
      />
      <H3>Programmatic access</H3>
      <P>
        You can access the form's methods programmatically using refs. This provides an alternative to{' '}
        <A href="#slot-props">slot props</A> when you need to trigger form actions from outside the form.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { ref } from 'vue'
              import { Form } from '@inertiajs/vue3'

              const formRef = ref()

              const handleSubmit = () => {
                formRef.value.submit()
              }
              </script>

              <template>
                <Form ref="formRef" action="/users" method="post">
                  <input type="text" name="name" />
                  <button type="submit">Submit</button>
                </Form>

                <button @click="handleSubmit">Submit Programmatically</button>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { useRef } from 'react'
              import { Form } from '@inertiajs/react'

              export default function CreateUser() {
                const formRef = useRef()

                const handleSubmit = () => {
                  formRef.current.submit()
                }

                return (
                  <>
                    <Form ref={formRef} action="/users" method="post">
                      <input type="text" name="name" />
                      <button type="submit">Submit</button>
                    </Form>

                    <button onClick={handleSubmit}>Submit Programmatically</button>
                  </>
                )
              }
            `,
          },
          {
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script>
                import { Form } from '@inertiajs/svelte'

                let formRef

                function handleSubmit() {
                  formRef.submit()
                }
              </script>

              <Form bind:this={formRef} action="/users" method="post">
                <input type="text" name="name" />
                <button type="submit">Submit</button>
              </Form>

              <button on:click={handleSubmit}>Submit Programmatically</button>
            `,
          },
        ]}
      />
      <P>
        In React and Vue, refs provide access to all form methods and reactive state. In Svelte, refs expose only
        methods, so reactive state like <Code>isDirty</Code> and <Code>errors</Code> should be accessed via{' '}
        <A href="#slot-props">slot props</A> instead.
      </P>
      <H2>Form helper</H2>
      <P>
        In addition to the <Code>&lt;Form&gt;</Code> component, Inertia also provides a <Code>useForm</Code> helper for
        when you need programmatic control over your form's data and submission behavior.
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
      <H3>Form errors</H3>
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
        If you're using client-side input validation libraries or do client-side validation manually, you can set your
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
      <H3>Resetting the Form</H3>
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
        Sometimes, you may want to restore your form fields to their default values and clear any validation errors at
        the same time. Instead of calling <Code>reset()</Code> and <Code>clearErrors()</Code> separately, you can use
        the <Code>resetAndClearErrors()</Code> method, which combines both actions into a single call.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              // Reset the form and clear all errors...
              form.resetAndClearErrors()

              // Reset specific fields and clear their errors...
              form.resetAndClearErrors('field', 'anotherfield')
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              const { resetAndClearErrors } = useForm({ ... })

              // Reset the form and clear all errors...
              resetAndClearErrors()

              // Reset specific fields and clear their errors...
              resetAndClearErrors('field', 'anotherfield')
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              // Reset the form and clear all errors...
              $form.resetAndClearErrors()

              // Reset specific fields and clear their errors...
              $form.resetAndClearErrors('field', 'anotherfield')
            `,
          },
        ]}
      />
      <H3>Setting new default values</H3>
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
      <H3>Form field change tracking</H3>
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
      <H3>Canceling Form submissions</H3>
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
      <H3>Form data and history state</H3>
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
      <MinimumVersion version="2.0.6" />
      <P>
        When using <A href="https://github.com/laravel/wayfinder">Wayfinder</A> in conjunction with the form helper, you
        can simply pass the resulting object directly to the <Code>form.submit</Code> method. The form helper will infer
        the HTTP method and URL from the Wayfinder object.
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
      <H2>Server-side responses</H2>
      <P>
        When using Inertia, you don't typically inspect form responses client-side like you would with traditional
        XHR/fetch requests. Instead, your server-side route or controller issues a <A href="/redirects">redirect</A>{' '}
        response after processing the form, often redirecting to a success page.
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
      <P>
        This redirect-based approach works with all form submission methods: the <Code>&lt;Form&gt;</Code> component,
        {' '}<Code>useForm</Code> helper, and manual router submissions. It makes handling Inertia forms feel very similar to
        classic server-side form submissions.
      </P>
      <H2>Server-side validation</H2>
      <P>
        Both the <Code>&lt;Form&gt;</Code> component and <Code>useForm</Code> helper automatically handle server-side
        validation errors. When your server returns validation errors, they're automatically available in the{' '}
        <Code>errors</Code> object without any additional configuration.
      </P>
      <P>
        Unlike traditional XHR/fetch requests where you might check for a <Code>422</Code> status code, Inertia handles
        validation errors as part of its redirect-based flow, just like classic server-side form submissions, but
        without the full page reload.
      </P>
      <P>
        For a complete guide on validation error handling, including error bags and advanced scenarios, see the{' '}
        <A href="/validation">validation documentation</A>.
      </P>
      <H2>Manual form submissions</H2>
      <P>
        It's also possible to submit forms manually using Inertia's <Code>router</Code> methods directly, without using
        the <Code>&lt;Form&gt;</Code> component or <Code>useForm</Code> helper:
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
      <H2>File uploads</H2>
      <P>
        When making requests or form submissions that include files, Inertia will automatically convert the request data
        into a <Code>FormData</Code> object. This works with the <Code>&lt;Form&gt;</Code> component,{' '}
        <Code>useForm</Code> helper, and manual router submissions.
      </P>
      <P>
        For more information on file uploads, including progress tracking, see the{' '}
        <A href="/file-uploads">file uploads documentation</A>.
      </P>
      <H2>XHR / fetch submissions</H2>
      <P>
        Using Inertia to submit forms works great for the vast majority of situations. However, in the event that you
        need more control over the form submission, you're free to make plain XHR or <Code>fetch</Code> requests
        instead, using the library of your choice.
      </P>
    </>
  )
}
