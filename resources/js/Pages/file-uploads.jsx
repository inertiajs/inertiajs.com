import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'

const meta = {
  title: 'File uploads',
  links: [
    { url: '#form-data-conversion', name: 'FormData conversion' },
    { url: '#file-upload-example', name: 'File upload example' },
    { url: '#multipart-limitations', name: 'Multipart limitations' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>File uploads</H1>
      <H2>FormData conversion</H2>
      <P>
        When making Inertia requests that include files (even nested files), Inertia will automatically convert the
        request data into a <Code>FormData</Code> object. This conversation is necessary in order to submit a{' '}
        <Code>multipart/form-data</Code> request via XHR.
      </P>
      <P>
        If you would like the request to always use a <Code>FormData</Code> object regardless of whether a file is
        present in the data, you may provide the <Code>forceFormData</Code> option when making the request.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post('/users', data, {
            forceFormData: true,
          })
        `}
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
            name: 'Vue 2',
            language: 'twig',
            code: dedent`
              <template>
                <form @submit.prevent="submit">
                  <input type="text" v-model="form.name" />
                  <input type="file" @input="form.avatar = $event.target.files[0]" />
                  <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                    {{ form.progress.percentage }}%
                  </progress>
                  <button type="submit">Submit</button>
                </form>
              </template>\n
              <script>
              export default {
                data() {
                  return {
                    form: this.$inertia.form({
                      name: null,
                      avatar: null,
                    }),
                  }
                },
                methods: {
                  submit() {
                    this.form.post('/users')
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
                  <input type="text" v-model="form.name" />
                  <input type="file" @input="form.avatar = $event.target.files[0]" />
                  <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                    {{ form.progress.percentage }}%
                  </progress>
                  <button type="submit">Submit</button>
                </form>
              </template>\n
              <script>
              import { useForm } from '@inertiajs/inertia-vue3'\n
              export default {
                setup () {
                  const form = useForm({
                    name: null,
                    avatar: null,
                  })\n
                  function submit() {
                    form.post('/users')
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
                            import { useForm } from '@inertiajs/inertia-react'\n
              const { data, setData, post, progress } = useForm({
                name: null,
                avatar: null,
              })\n
              function submit(e) {
                e.preventDefault()
                post('/users')
              }\n
              return (
                <form onSubmit={submit}>
                  <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} />
                  <input type="file" value={data.avatar} onChange={e => setData('avatar', e.target.files[0])} />
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
            name: 'Svelte',
            language: 'html',
            code: dedent`
              <script>
              import { useForm } from '@inertiajs/inertia-svelte'\n
              let form = useForm({
                name: null,
                avatar: null,
              })\n
              function submit() {
                $form.post('/users')
              }
              </script>\n
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
        ]}
      />
      <P>
        This example uses the <A href="/forms#form-helper">Inertia form helper</A> for convenience, since the form
        helper provides easy access to the current upload progress. However, you are free to submit your forms using{' '}
        <A href="/manual-visits">manual Inertia visits</A> as well.
      </P>
      <H2>Multipart limitations</H2>
      <P>
        Uploading files using a <Code>multipart/form-data</Code> request is not natively supported in some languages for
        the <Code>PUT</Code>,<Code>PATCH</Code>, or <Code>DELETE</Code> methods. The simplest workaround for this
        limitation is to simply upload files using a <Code>POST</Code> request instead.
      </P>
      <P>
        However, some frameworks, such as{' '}
        <a href="https://laravel.com/docs/8.x/routing#form-method-spoofing">Laravel</a> and{' '}
        <a href="https://guides.rubyonrails.org/form_helpers.html#how-do-forms-with-patch-put-or-delete-methods-work-questionmark">
          Rails
        </a>
        , support form method spoofing, which allows you to upload the files using <Code>POST</Code>, but have the
        framework handle the request as a <Code>PUT</Code> or <Code>PATCH</Code> request. This is done by including a{' '}
        <Code>_method</Code> attribute in the data of your request.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.post(\`/users/\${user.id}\`, {
            _method: 'put',
            avatar: form.avatar,
          })
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
