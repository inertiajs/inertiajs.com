import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue3@0.4.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@0.4.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on June 4, 2021</div>
      <P>
        Fix rendering of fragments in <Code>{'<inertia-head>'}</Code> component (
        <A href="https://github.com/inertiajs/inertia/pull/723">#723</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
