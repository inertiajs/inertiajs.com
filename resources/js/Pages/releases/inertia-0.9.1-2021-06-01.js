import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia@0.9.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@0.9.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on June 1, 2021</div>
      <P>
        Improve head manager rendering (<A href="https://github.com/inertiajs/inertia/pull/704">#704</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
