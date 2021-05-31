import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.3.4',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.3.4</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 24, 2020</div>
      <Ul>
        <Li>
          Reverted <Code>0.3.3</Code> change that fired a <Code>finish</Code> event if the <Code>start</Code> event was
          cancelled (<A href="https://github.com/inertiajs/inertia/commit/dc1a958">commit</A>).
        </Li>
        <Li>
          Added the ability to cancel a visit from the <Code>onStart()</Code> callback (
          <A href="https://github.com/inertiajs/inertia/pull/233">#233</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
