import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@v0.4.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.4.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 15, 2020</div>
      <P>
        Inertia <Code>v0.7.0</Code> compatibility.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
