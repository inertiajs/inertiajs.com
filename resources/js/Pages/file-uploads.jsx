import { A, Code, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'File uploads',
  links: [
    { url: '#form-data-conversion', name: 'FormData conversion' },
    { url: '#file-upload-example', name: 'File upload example' },
    { url: '#multipart-limitations', name: 'Multipart limitations' },
  ],
}

export default function () {
  return (
    <>
      <H1>File uploads</H1>
      <H2>FormData conversion</H2>
      <P>
        When making Inertia requests that include files (even nested files), Inertia will automatically convert the
        request data into a <Code>FormData</Code> object. This conversion is necessary in order to submit a{' '}
        <Code>multipart/form-data</Code> request via XHR.
      </P>
      <P>
        If you would like the request to always use a <Code>FormData</Code> object regardless of whether a file is
        present in the data, you may provide the <Code>forceFormData</Code> option when making the request.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post('/users', data, {
                forceFormData: true,
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post('/users', data, {
                forceFormData: true,
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post('/users', data, {
                forceFormData: true,
              })
            `,
          },
        ]}
      />
      <P>
        You can learn more about the <Code>FormData</Code> interface via its{' '}
        <A href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">MDN documentation</A>.
      </P>
      <Notice>
        Prior to version 0.8.0, Inertia did not automatically convert requests to <Code color="orange">FormData</Code>.
        If you're using an Inertia release prior to this version, you will need to manually perform this conversion.
      </Notice>
      <H2>File upload example</H2>
      <P>
        Let's examine a complete file upload example using Inertia. This example includes both a <Code>name</Code> text
        input and an <Code>avatar</Code> file input.
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
                name: null,
                avatar: null,
              })

              function submit() {
                form.post('/users')
              }
              </script>

              <template>
                <form @submit.prevent="submit">
                  <input type="text" v-model="form.name" />
                  <input type="file" @input="form.avatar = $event.target.files[0]" />
                  <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                    {{ form.progress.percentage }}%
                  </progress>
                  <button type="submit">Submit</button>
                </form>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { useForm } from '@inertiajs/react'

              const { data, setData, post, progress } = useForm({
                name: null,
                avatar: null,
              })

              function submit(e) {
                e.preventDefault()
                post('/users')
              }

              return (
                <form onSubmit={submit}>
                  <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} />
                  <input type="file" onChange={e => setData('avatar', e.target.files[0])} />
                  {progress && (
                    <progress value={progress.percentage} max="100">
                      {progress.percentage}%
                    </progress>
                  )}
                  <button type="submit">Submit</button>
                </form>
              )
            `,
          },
          {
            name: 'Svelte 4',
            language: 'jsx',
            code: dedent`
              <script>
                import { useForm } from '@inertiajs/svelte'

                const form = useForm({
                  name: null,
                  avatar: null,
                })

                function submit() {
                  $form.post('/users')
                }
              </script>

              <form on:submit|preventDefault={submit}>
                <input type="text" bind:value={$form.name} />
                <input type="file" on:input={e => $form.avatar = e.target.files[0]} />
                {#if $form.progress}
                  <progress value={$form.progress.percentage} max="100">
                    {$form.progress.percentage}%
                  </progress>
                {/if}
                <button type="submit">Submit</button>
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
                  name: null,
                  avatar: null,
                })

                function submit(e) {
                  e.preventDefault()
                  $form.post('/users')
                }
              </script>

              <form onsubmit={submit}>
                <input type="text" bind:value={$form.name} />
                <input type="file" oninput={e => $form.avatar = e.target.files[0]} />
                {#if $form.progress}
                  <progress value={$form.progress.percentage} max="100">
                    {$form.progress.percentage}%
                  </progress>
                {/if}
                <button type="submit">Submit</button>
              </form>
            `,
          },
        ]}
      />
      <P>
        This example uses the <A href="/forms#form-helper">Inertia form helper</A> for convenience, since the form
        helper provides easy access to the current upload progress. However, you are free to submit your forms using{' '}
        <A href="/manual-visits">manual Inertia visits</A> as well.
      </P>
      <H2>Multipart limitations</H2>
      <P>
        Uploading files using a <Code>multipart/form-data</Code> request is not natively supported in some server-side
        frameworks when using the <Code>PUT</Code>,<Code>PATCH</Code>, or <Code>DELETE</Code> HTTP methods. The simplest
        workaround for this limitation is to simply upload files using a <Code>POST</Code> request instead.
      </P>
      <P>
        However, some frameworks, such as <a href="https://laravel.com/docs/routing#form-method-spoofing">Laravel</a>{' '}
        and{' '}
        <a href="https://guides.rubyonrails.org/form_helpers.html#how-do-forms-with-patch-put-or-delete-methods-work-questionmark">
          Rails
        </a>
        , support form method spoofing, which allows you to upload the files using <Code>POST</Code>, but have the
        framework handle the request as a <Code>PUT</Code> or <Code>PATCH</Code> request. This is done by including a{' '}
        <Code>_method</Code> attribute in the data of your request.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.post(\`/users/\${user.id}\`, {
                _method: 'put',
                avatar: form.avatar,
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.post(\`/users/\${user.id}\`, {
                _method: 'put',
                avatar: form.avatar,
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.post(\`/users/\${user.id}\`, {
                _method: 'put',
                avatar: form.avatar,
              })
            `,
          },
        ]}
      />
    </>
  )
}
