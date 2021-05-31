import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.4.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.4.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 10, 2021</div>
      <Ul>
        <Li>
          Register macros on <Code>register</Code> to avoid race condition (
          <A href="https://github.com/inertiajs/inertia-laravel/pull/262">#262</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
