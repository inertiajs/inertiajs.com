import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-svelte@v0.6.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.6.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on February 26, 2021</div>
      <P>
        Fix <Code>preserveState</Code> option and <Code>$page</Code> store (
        <A href="https://github.com/inertiajs/inertia/pull/522">#522</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
