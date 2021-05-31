import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.5.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.5.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 27, 2020</div>
      <Ul>
        <Li>
          Fix bug with network-path reference URLs, such as <Code>{'//example.com/endpoint'}</Code> (
          <A href="https://github.com/inertiajs/inertia/commit/609d1828752e0ac031ff615d47a423be1c8cb512">commit</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
