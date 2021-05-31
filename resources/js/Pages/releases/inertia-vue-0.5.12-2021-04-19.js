import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.5.12',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.5.12</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 19, 2021</div>
      <P>
        Fix issue with <Code>processing</Code> and <Code>progress</Code> form helper state (
        <A href="https://github.com/inertiajs/inertia/pull/635">#635</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
