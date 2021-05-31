import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.5.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.5.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 28, 2020</div>
      <P>
        Prevent errors from being cleared on form helper reset (
        <A href="https://github.com/inertiajs/inertia/pull/375">#375</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
