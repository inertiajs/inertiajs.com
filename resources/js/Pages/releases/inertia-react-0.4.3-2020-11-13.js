import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@v0.4.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.4.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on November 13, 2020</div>
      <P>
        Bring the <Code>@inertiajs/inertia</Code> peer dependency requirement to the latest major version.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
