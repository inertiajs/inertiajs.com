import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue3@v0.3.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 29, 2020</div>
      <P>
        Update form helper to match reverted <Code>Inertia.delete()</Code> method signature change (
        <A href="https://github.com/inertiajs/inertia/issues/378">#378</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
