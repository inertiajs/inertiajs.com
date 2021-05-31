import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue3@v0.3.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 28, 2020</div>
      <P>
        Add <Code>recentlySuccessful</Code> to form helper (
        <A href="https://github.com/inertiajs/inertia/pull/374">#374</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
