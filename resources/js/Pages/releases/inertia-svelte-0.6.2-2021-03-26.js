import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Li, P, Ul } from '@/Components'

const meta = {
  title: 'inertia-svelte@v0.6.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.6.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on March 26, 2021</div>
      <Ul>
        <Li>
          Added form helper (<A href="https://github.com/inertiajs/inertia/pull/558">#558</A>),{' '}
          <A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
        </Li>
        <Li>
          Renamed link component to fix compilation conflicts (
          <A href="https://github.com/inertiajs/inertia/pull/549">#549</A>).
        </Li>
        <Li>
          Improved render component for nested layouts (<A href="https://github.com/inertiajs/inertia/pull/529">#529</A>
          ).
        </Li>
      </Ul>
      <H2>New form helper</H2>
      <P>
        This release adds a new form helper to the Svelte adapter, similar to the existing form helpers in the Vue 2,
        Vue 3 and React adapters. This was contributed by <A href="https://github.com/mariojankovic">@mariojankovic</A>.
        It is designed to help reduce the amount of boilerplate needed for typical forms. Here's how to use it:
      </P>
      <CodeBlock
        language="html"
        children={dedent`
          <script>
          import { useForm } from '@inertiajs/inertia-svelte'\n
          import TextInput from './TextInput'
          import LoadingButton from './LoadingButton'\n
          let form = useForm({
            name: null,
            email: null,
          })\b
          function submit() {
            $form.post('/users')
          }
          </script>\n
          <form on:submit|preventDefault={submit}>
            <TextInput type="text" bind:value={$form.name} error="$form.errors.name" />
            <TextInput type="text" bind:value={$form.email} error="$form.errors.email" />
            <LoadingButton loading={$form.processing} type="submit">Submit</LoadingButton>
          </form>
        `}
      />
      <P>
        The form helper also accepts a second "options" argument. This lets you set a form <Code>key</Code>, needed if
        there are multiple forms on the page. You can also disable the automatic remember behaviour by setting the{' '}
        <Code>remember</Code> option to <Code>false</Code>.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          let form = useForm({
            email: null,
            password: null,
          }, {
            key: 'login',
            remember: false,
          })
        `}
      />
      <P>Here are a complete list of all the available form properties:</P>
      <Ul>
        <Li>
          <Code>form.errors</Code>
        </Li>
        <Li>
          <Code>form.hasErrors</Code>
        </Li>
        <Li>
          <Code>form.processing</Code>
        </Li>
        <Li>
          <Code>form.progress</Code>
        </Li>
        <Li>
          <Code>form.wasSuccessful</Code>
        </Li>
        <Li>
          <Code>form.recentlySuccessful</Code>
        </Li>
      </Ul>
      <P>And here is a complete list of all the available form methods:</P>
      <Ul>
        <Li>
          <Code>form.reset()</Code>
        </Li>
        <Li>
          <Code>form.reset(...fields)</Code>
        </Li>
        <Li>
          <Code>form.clearErrors()</Code>
        </Li>
        <Li>
          <Code>form.clearErrors(...fields)</Code>
        </Li>
        <Li>
          <Code>form.transform(callback)</Code>
        </Li>
        <Li>
          <Code>form.submit(method, url, options)</Code>
        </Li>
        <Li>
          <Code>form.get(url, options)</Code>
        </Li>
        <Li>
          <Code>form.post(url, options)</Code>
        </Li>
        <Li>
          <Code>form.put(url, options)</Code>
        </Li>
        <Li>
          <Code>form.patch(url, options)</Code>
        </Li>
        <Li>
          <Code>form.delete(url, options)</Code>
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
