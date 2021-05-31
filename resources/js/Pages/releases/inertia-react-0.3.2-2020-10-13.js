import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@v0.3.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.3.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 13, 2020</div>
      <P>
        Add new <Code>App</Code> and <Code>Link</Code> named exports.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
