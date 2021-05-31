import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.1.8',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.1.8</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 30, 2020</div>
      <Ul>
        <Li>
          Add <Code>box-sizing: border-box</Code> to modal (
          <A href="https://github.com/inertiajs/inertia/pull/104">#104</A>).
        </Li>
        <Li>
          Add support for lazy <Code>preserveState</Code> and <Code>preserveScroll</Code> evaluation (
          <A href="https://github.com/inertiajs/inertia/pull/135">#135</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
