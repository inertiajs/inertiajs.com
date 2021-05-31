import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.11',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.11</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 9, 2020</div>
      <P>
        Revert change in <Code>v0.2.10</Code>, which was broken (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/140">#140</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
