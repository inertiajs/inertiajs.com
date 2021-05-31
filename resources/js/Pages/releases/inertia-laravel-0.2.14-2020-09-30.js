import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.14',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.14</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 30, 2020</div>
      <P>
        Add auto registration of middleware for Laravel 5.4+ (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/153">#153</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
