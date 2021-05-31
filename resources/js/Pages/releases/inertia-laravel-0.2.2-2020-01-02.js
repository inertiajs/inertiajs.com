import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 2, 2020</div>
      <P>
        Added automatic binding of the <Code>ResponseFactory</Code> as a singleton (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/75">#75</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
