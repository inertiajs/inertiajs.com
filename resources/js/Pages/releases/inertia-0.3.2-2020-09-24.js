import React from 'react'
import { Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.3.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 24, 2020</div>
      <Ul>
        <Li>
          Add support for <Code>axios@0.20.0</Code>.
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
