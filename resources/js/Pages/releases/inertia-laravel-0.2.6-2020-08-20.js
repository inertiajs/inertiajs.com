import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.6',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.6</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 20, 2020</div>
      <Ul>
        <Li>
          Automatically cast asset version to a string (
          <A href="https://github.com/inertiajs/inertia-laravel/pull/131">#131</A>).
        </Li>
        <Li>
          Added <Code>laravel/framework</Code> as a dependency (
          <A href="https://github.com/inertiajs/inertia-laravel/commit/02238454a2799b6578ed1f28a32e379bf1c3eb98">
            commit
          </A>
          ).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
