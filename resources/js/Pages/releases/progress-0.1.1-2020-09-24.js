import React from 'react'
import { H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-progress@v0.1.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-progress@v0.1.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 24, 2020</div>
      <P>Add check to ensure the progress is only updated if the progress bar has been started.</P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
