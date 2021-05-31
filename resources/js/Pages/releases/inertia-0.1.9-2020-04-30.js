import React from 'react'
import { Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.1.9',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.1.9</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 30, 2020</div>
      <Ul>
        <Li>
          Upgrade types for lazy <Code>preserveScroll</Code> & <Code>preserveState</Code>.
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
