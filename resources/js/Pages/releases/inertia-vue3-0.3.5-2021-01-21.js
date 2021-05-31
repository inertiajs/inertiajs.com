import React from 'react'
import { Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-vue3@v0.3.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 21, 2021</div>
      <Ul>
        <Li>
          Add <Code>useRemember</Code> hook.
        </Li>
        <Li>
          Fix <Code>remember</Code> serialization.
        </Li>
        <Li>
          Add <Code>GET</Code> support to the form helper.
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
