import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 2, 2020</div>
      <P>
        Make response factory macroable (<A href="https://github.com/inertiajs/inertia-laravel/pull/91">#91</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
