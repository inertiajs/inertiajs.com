import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, H3, Layout, Li, P, Ul } from '@/Components'

const meta = {
  title: 'inertia-react@v0.5.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.5.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on February 25, 2021</div>
      <H2>New form helper</H2>
      <P>
        This release adds a new form helper to the React adapter (
        <A href="https://github.com/inertiajs/inertia/pull/516">#516</A>), similar to the existing form helpers in the
        Vue 2 and Vue 3 adapters. It is designed to help reduce the amount of boilerplate needed for typical forms.
      </P>
      <H3>Example</H3>
      <P>Here's how to use it:</P>
      <CodeBlock
        language="jsx"
        children={dedent`
          import React from 'react'
          import { useForm } from '@inertiajs/inertia-react'\n
          import TextInput from './TextInput'
          import LoadingButton from './LoadingButton'\n
          const { data, setData, post, processing, errors } = useForm({
            name: '',
            email: '',
          })\n
          function submit(event) {
            event.preventDefault()
            post('/users')
          }\n
          return (
            <form onSubmit={submit}>
              <TextInput label="Name" value={data.name} errors={errors.name} onChange={(e) => setData('name', e.target.value)} />
              <TextInput
                label="Email"
                value={data.email}
                errors={errors.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              <LoadingButton loading={processing} type="submit">
                Submit
              </LoadingButton>
            </form>
          )
        `}
      />
      <H3>API</H3>
      <P>Here are a complete list of all the available properties:</P>
      <Ul>
        <Li>
          <Code>data</Code>
        </Li>
        <Li>
          <Code>errors</Code>
        </Li>
        <Li>
          <Code>hasErrors</Code>
        </Li>
        <Li>
          <Code>processing</Code>
        </Li>
        <Li>
          <Code>progress</Code>
        </Li>
        <Li>
          <Code>wasSuccessful</Code>
        </Li>
        <Li>
          <Code>recentlySuccessful</Code>
        </Li>
      </Ul>
      <P>And, here is a complete list of all the available methods:</P>
      <Ul>
        <Li>
          <Code>setData(key, value)</Code>, <Code>setData(values)</Code>, <Code>setData(callback)</Code>
        </Li>
        <Li>
          <Code>transform(callback)</Code>
        </Li>
        <Li>
          <Code>reset()</Code>, <Code>reset(fields)</Code>
        </Li>
        <Li>
          <Code>clearErrors()</Code>, <Code>clearErrors(fields)</Code>
        </Li>
        <Li>
          <Code>submit(method, url, options)</Code>
        </Li>
        <Li>
          <Code>get(url, options)</Code>
        </Li>
        <Li>
          <Code>post(url, options)</Code>
        </Li>
        <Li>
          <Code>put(url, options)</Code>
        </Li>
        <Li>
          <Code>patch(url, options)</Code>
        </Li>
        <Li>
          <Code>delete(url, options)</Code>
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
