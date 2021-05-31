import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 2, 2020</div>
      <P>
        Added support for <Code>Responsable</Code> props (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/27">#27</A>),
        <A href="https://github.com/inertiajs/inertia-laravel/pull/28">#28</A>),
        <A href="https://github.com/inertiajs/inertia-laravel/pull/70">#70</A>),
        <A href="https://github.com/inertiajs/inertia-laravel/pull/82">#82</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
