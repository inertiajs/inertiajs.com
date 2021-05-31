import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@v0.4.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.4.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 15, 2020</div>
      <P>
        Add a <Code>displayName</Code> to <Code>InertiaPageContext</Code> to improve React devtools experience.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
