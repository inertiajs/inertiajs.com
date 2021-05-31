import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-svelte@v0.4.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.4.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 13, 2020</div>
      <P>
        Add new <Code>App</Code> and <Code>Link</Code> named exports.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
