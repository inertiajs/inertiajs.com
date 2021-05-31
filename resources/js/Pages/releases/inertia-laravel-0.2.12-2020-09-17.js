import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.12',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.12</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 17, 2020</div>
      <P>
        Automatically register the Inertia middleware in the <Code>web</Code> middleware group, instead of in the global
        middleware stack (<A href="https://github.com/inertiajs/inertia-laravel/pull/147">#147</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
