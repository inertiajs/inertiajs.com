import React from 'react'
import { Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-react@v0.4.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.4.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 27, 2020</div>
      <Ul>
        <Li>
          Add support for new <Code>onBefore()</Code> event callback in the Inertia link component.
        </Li>
        <Li>
          Note, you must upgrade <Code>@inertiajs/inertia</Code> to <Code>^0.6.0</Code> to take advantage of the new{' '}
          <Code>onBefore()</Code> event callback.
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
