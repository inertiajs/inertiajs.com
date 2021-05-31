import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.5.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.5.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 26, 2020</div>
      <Ul>
        <Li>
          Fix bug with non-string URLs, such as <Code>window.location</Code> (
          <A href="https://github.com/inertiajs/inertia/pull/289">#289</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
