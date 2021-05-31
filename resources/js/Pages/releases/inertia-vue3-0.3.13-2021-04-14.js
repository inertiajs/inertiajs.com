import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue3@v0.3.13',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.13</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 14, 2021</div>
      <P>
        Remove dependency on deprecated <Code>onBeforeRender</Code> event (
        <A href="https://github.com/inertiajs/inertia/pull/628">#628</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
