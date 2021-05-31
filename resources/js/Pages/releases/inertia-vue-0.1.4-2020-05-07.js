import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.1.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.1.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 7, 2020</div>
      <P>
        Fixed a prop warning related to <Code>v0.1.3</Code> changes.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
