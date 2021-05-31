import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-react@v0.5.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@v0.5.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 23, 2020</div>
      <Ul>
        <Li>
          This release adds a new optional <Code>resolveErrors</Code> setting.
        </Li>
        <Li>
          You can read more about this in the corresponding <A href="/releases/inertia-0.8.0">Inertia release</A>).
        </Li>
        <Li>
          When upgrading to this release, be sure to also upgrade <Code>@inertiajs/inertia</Code> to <Code>v0.8.0</Code>
          .
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
