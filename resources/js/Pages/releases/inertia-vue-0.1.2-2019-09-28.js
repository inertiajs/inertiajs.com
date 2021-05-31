import React from 'react'
import { H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-vue@v0.1.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.1.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 28, 2019</div>
      <Ul>
        <Li>Add support for persistent, nested layouts.</Li>
        <Li>Add TypeScript typings.</Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
