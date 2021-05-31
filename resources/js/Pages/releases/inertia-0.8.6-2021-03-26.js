import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.8.6',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.8.6</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on March 26, 2021</div>
      <Ul>
        <Li>
          Added <Code>onBeforeRender()</Code> visit callback (
          <A href="https://github.com/inertiajs/inertia/pull/410">#410</A>).
        </Li>
        <Li>
          Add typescript definition for the <Code>errorBag</Code> visit option (
          <A href="https://github.com/inertiajs/inertia/pull/541">#541</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
