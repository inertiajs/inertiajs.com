import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-react@v0.5.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.5.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on February 25, 2021</div>
      <H2>New form helper</H2>
      This release adds a new form helper to the React adapter ([#516](https://github.com/inertiajs/inertia/pull/516)), similar to the existing form helpers in the Vue 2 and Vue 3 adapters. It is designed to help reduce the amount of boilerplate needed for typical forms.
      <H3>Example</H3>
      Here's how to use it:
      ```jsx
      import React from 'react'
      import { useForm } from '@inertiajs/inertia-react'

      import TextInput from './TextInput'
      import LoadingButton from './LoadingButton'

      const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
      })

      function submit(event) {
        event.preventDefault()
        post('/users')
      }

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
      ```
      <H3>API</H3>
      Here are a complete list of all the available properties:
      - `data`
      - `errors`
      - `hasErrors`
      - `processing`
      - `progress`
      - `wasSuccessful`
      - `recentlySuccessful`
      And, here is a complete list of all the available methods:
      - `setData(key, value)`, `setData(values)`, `setData(callback)`
      - `transform(callback)`
      - `reset()`, `reset(fields)`
      - `clearErrors()`, `clearErrors(fields)`
      - `submit(method, url, options)`
      - `get(url, options)`
      - `post(url, options)`
      - `put(url, options)`
      - `patch(url, options)`
      - `delete(url, options)`
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
