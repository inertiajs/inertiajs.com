import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@v0.1.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.1.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 30, 2020</div>
      <P>
        Upgrade types for lazy <Code>preserveScroll</Code> & <Code>preserveState</Code>.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
