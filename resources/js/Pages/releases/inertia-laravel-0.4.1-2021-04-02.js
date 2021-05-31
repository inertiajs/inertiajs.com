import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.4.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.4.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 2, 2021</div>
      <Ul>
        <Li>
          Add default option to <Code>Inertia::getShared()</Code> method (
          <A href="https://github.com/inertiajs/inertia-laravel/pull/117">#117</A>).
        </Li>
        <Li>
          Add <Code>Inertia::flushShared()</Code> method for clearing all shared data (
          <A href="https://github.com/inertiajs/inertia-laravel/pull/244">#244</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
