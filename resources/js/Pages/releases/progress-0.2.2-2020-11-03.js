import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-progress@v0.2.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-progress@v0.2.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on November 3, 2020</div>
      <P>
        Add TypeScript typings (<A href="https://github.com/inertiajs/progress/pull/7">#7</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
