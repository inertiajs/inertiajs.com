import React from 'react'
import dedent from 'dedent-js'
import { A, CodeBlock, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia@v0.2.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.2.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 8, 2020</div>
      <P>
        This release adds the ability to define custom headers on Inertia requests, thanks to the work of{' '}
        <A href="https://github.com/claudiodekker">@claudiodekker</A>) (
        <A href="https://github.com/inertiajs/inertia/pull/202">#202</A>).
      </P>
      <P>Here is how this is done:</P>
      <CodeBlock
        language="js"
        children={dedent`
          this.$inertia.visit('/users', {
            headers: {
              'Custom-Header': 'value',
            },
          })\n
          this.$inertia.post('/users', this.form, {
            headers: {
              'Custom-Header': 'value',
            },
          })
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
