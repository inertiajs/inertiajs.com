import React from 'react'
import { H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@v0.5.11',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.5.11</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 8, 2021</div>
      <P>Bring type declarations up to date.</P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
