import React from 'react'
import dedent from 'dedent-js'
import { A, CodeBlock, H1, H2, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-svelte@v0.6.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.6.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 2, 2021</div>
      <P>
        Disabled automatic remembering of form data and errors in history state (
        <A href="https://github.com/inertiajs/inertia/pull/597">#597</A>).
      </P>
      <H2>Disabled automatic remembering of form data</H2>
      <P>
        This release updates the form helper to no longer automatically remember form data and errors in history state.
        While that behaviour was nice, it caused unexpected issues when there are multiple forms on a single page.
      </P>
      <P>
        The way to avoid these issues was to provide a unique form key. With this change, form data and errors are only
        remembered when a key is provided.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          // Not remembered
          let form = useForm(data)\n
          // Remembered
          let form = useForm('CreateUser', data)
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
