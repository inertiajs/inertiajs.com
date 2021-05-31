import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-svelte@v0.5.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.5.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on November 13, 2020</div>
      <P>
        Bring the <Code>@inertiajs/inertia</Code> peer dependency requirement to the latest major version.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
