import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.7',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.7</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 21, 2020</div>
      <P>
        Fix regression with asset versioning (<A href="https://github.com/inertiajs/inertia-laravel/pull/133">#133</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
