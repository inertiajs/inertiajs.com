import React from 'react'
import { Code, H1, H2, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.4.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.4.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 9, 2020</div>
      <Ul>
        <Li>Updated plain JSON response message in modal.</Li>
        <Li>
          [INTERNAL] Updated to now call <Code>transformProps()</Code>, since this behaviour has been removed from the
          adapters.
        </Li>
        <Li>
          [INTERNAL] Updated the <Code>updatePage()</Code> callback be called <Code>swapComponent()</Code>, and changed
          arguments order.
        </Li>
        <Li>Fixed the TypeScript definitions.</Li>
        <Li>Fixed bug where partial reload props would get merged when the page component changed.</Li>
      </Ul>
      <H2>Breaking change</H2>
      Note, this release makes changes to the internals of Inertia.js, which requires that you also update your
      respective adapters. The peer dependencies have been updated to reflect this.
      <Ul>
        <Li>
          <Code>@inertiajs/inertia-vue@0.3.0</Code>
        </Li>
        <Li>
          <Code>@inertiajs/inertia-react@0.3.0</Code>
        </Li>
        <Li>
          <Code>@inertiajs/inertia-svelte@0.4.0</Code>
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
