import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia@0.9.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@0.9.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on June 4, 2021</div>
      <P>
        Fix double render on initial page load (<A href="https://github.com/inertiajs/inertia/pull/724">#724</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
