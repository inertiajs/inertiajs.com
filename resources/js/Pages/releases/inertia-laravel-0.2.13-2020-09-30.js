import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.13',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.13</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 30, 2020</div>
      <P>
        Add check for <Code>appendMiddlewareToGroup()</Code> method when registering middleware (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/152">#152</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
