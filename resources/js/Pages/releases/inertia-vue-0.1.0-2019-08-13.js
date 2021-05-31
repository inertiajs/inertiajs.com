import React from 'react'
import { H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.1.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.1.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 13, 2019</div>
      <P>Initial release.</P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
