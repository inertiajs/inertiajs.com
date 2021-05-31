import React from 'react'
import { H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.1.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.1.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 13, 2019</div>
      <P>Update umd build package name.</P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
