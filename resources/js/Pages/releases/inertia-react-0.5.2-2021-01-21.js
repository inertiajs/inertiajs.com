import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@v0.5.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.5.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 21, 2021</div>
      <P>
        Rename <Code>useRememberedState</Code> hook to <Code>useRemember</Code>, and deprecate{' '}
        <Code>useRememberedState</Code>.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
