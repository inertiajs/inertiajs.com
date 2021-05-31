import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.2.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.2.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 9, 2020</div>
      <P>
        Add <Code>headers</Code> prop to Inertia link component (
        <A href="https://github.com/inertiajs/inertia/pull/204">#204</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
