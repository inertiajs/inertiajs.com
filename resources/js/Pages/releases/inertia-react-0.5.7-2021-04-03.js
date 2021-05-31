import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@v0.5.7',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.5.7</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 3, 2021</div>
      <P>
        Fix bug when creating a form helper without any data (
        <A href="https://github.com/inertiajs/inertia/pull/601">#601</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
