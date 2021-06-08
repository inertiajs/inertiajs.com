import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-svelte@0.7.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@0.7.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on June 8, 2021</div>
      <P>
        Fixed <Code>App.svelte</Code> import in <Code>createInertiaApp()</Code> setup method (
        <A href="https://github.com/inertiajs/inertia/pull/728">#728</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
