import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 2, 2020</div>
      <P>
        Added <Code>inertia()</Code> request macro (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/90">#90</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
