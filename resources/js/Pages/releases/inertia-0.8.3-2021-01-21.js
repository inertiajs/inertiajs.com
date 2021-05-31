import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.8.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.8.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on January 21, 2021</div>
      <Ul>
        <Li>
          Use remember history state when visiting the same component and preserving state (
          <A href="https://github.com/inertiajs/inertia/commit/395ddaa5d3953549d681206e7038f13d77a23610">commit</A>).
        </Li>
        <Li>
          Add TypeScript definition for <Code>onError</Code> (
          <A href="https://github.com/inertiajs/inertia/pull/390">#390</A>).
        </Li>
        <Li>
          Add <Code>forceFormData</Code> visit option to force <Code>FormData</Code> encoding (
          <A href="https://github.com/inertiajs/inertia/pull/407">#407</A>).
        </Li>
        <Li>
          Pass <Code>visit</Code> to <Code>onFinish()</Code> callback (
          <A href="https://github.com/inertiajs/inertia/commit/896c53bb0e80bb6ba56e588a3afe665fa8aa0498">commit</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
