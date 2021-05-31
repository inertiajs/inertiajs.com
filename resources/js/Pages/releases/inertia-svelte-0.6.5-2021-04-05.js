import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-svelte@v0.6.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.6.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 5, 2021</div>
      <P>
        Fix bug with form helper remember key (<A href="https://github.com/inertiajs/inertia/issues/603">#603</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
