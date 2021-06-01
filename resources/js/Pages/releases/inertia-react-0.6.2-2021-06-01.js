import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@0.6.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@0.6.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on June 1, 2021</div>
      <P>
        Rename <Code>InertiaHead</Code> key from <Code>inertia</Code> to <Code>head-key</Code> (
        <A href="https://github.com/inertiajs/inertia/pull/704">#704</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
