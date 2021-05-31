import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.3.6',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.3.6</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 8, 2021</div>
      <P>
        This release updates the <Code>Response</Code> class to make it macroable (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/205">#205</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
