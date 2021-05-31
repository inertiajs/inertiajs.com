import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on February 28, 2020</div>
      <P>
        Added <Code>Arrayable</Code> support for nested props (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/102">#102</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
