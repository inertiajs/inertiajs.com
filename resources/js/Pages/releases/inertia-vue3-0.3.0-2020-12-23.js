import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue3@v0.3.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 23, 2020</div>
      <H2>New form helper</H2>
      <P>
        This release includes a new form helper, inspired by the form helper included in{' '}
        <A href="https://jetstream.laravel.com">Jetstream</A>. Here's how to use it:
      </P>
      <CodeBlock
        language="twig"
        children={dedent`
          <template>
            <form @submit.prevent="form.post('/login')">
              <!-- email -->
              <input type="text" v-model="form.email" />
              <div v-if="form.errors.email">{{ form.errors.email }}</div>
              <!-- password -->
              <input type="password" v-model="form.password" />
              <div v-if="form.errors.password">{{ form.errors.password }}</div>
              <!-- remember me -->
              <input type="checkbox" v-model="form.remember" /> Remember Me
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
        `}
      />
      <P>Alternatively, you can use the form helper with the new Vue 3 composition API:</P>
      <CodeBlock
        language="js"
        children={dedent`
          import { useForm } from '@inertiajs/inertia-vue3'\n
          export default {
            setup() {
              const form = useForm({
                email: null,
                password: null,
                remember: false,
              })\n
              return { form }
            },
          }
        `}
      />
      <P>
        It also comes with a <Code>form.reset()</Code> helper for resetting the form back to its original state. Or, if
        you want to only reset specific fields, you can call <Code>form.reset('field', 'anotherfield')</Code>.
      </P>
      <P>
        Also, in the event that you're uploading files, the current progress event is available at{' '}
        <Code>form.progress</Code>, which makes it really easy to show upload progress in your views:
      </P>
      <CodeBlock
        language="twig"
        children={dedent`
          <progress :value="form.progress.percentage" max="100">{{ form.progress.percentage }}%</progress>
        `}
      />
      <P>
        Also, if you need to modify the data before it's sent to the server, you can do this via the{' '}
        <Code>transform()</Code> function:
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          this.form
            .transform((data) => ({
              ...data,
              remember: data.remember ? 'on' : '',
            }))
            .post('/login')
        `}
      />
      <H2>Improved validation error handling</H2>
      <P>
        This release adds a new optional <Code>resolveErrors</Code> setting. You can read more about this in the
        corresponding <A href="/releases/inertia-0.8.0">Inertia release</A>.
      </P>
      <H2>Update Inertia dependency - BREAKING CHANGE ⚠️</H2>
      <P>
        When upgrading to this release, be sure to also upgrade <Code>@inertiajs/inertia</Code> to <Code>v0.8.0</Code>.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
