import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.1.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.1.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 7, 2020</div>
      <P>
        Added support for an <Code>only</Code> prop on <Code>InertiaLink</Code>.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
