import React from 'react'
import { Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-react@v0.1.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.1.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 26, 2019</div>
      <Ul>
        <Li>Modernize TypeScript typings.</Li>
        <Li>
          Update <Code>@inertiajs/inertia</Code> dependency.
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
