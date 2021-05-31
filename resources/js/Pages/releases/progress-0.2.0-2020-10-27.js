import React from 'react'
import { A, Code, H1, H2, Layout, Li, P, Ul } from '@/Components'

const meta = {
  title: 'inertia-progress@v0.2.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-progress@v0.2.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 27, 2020</div>
      <H2>Changes</H2>
      <Ul>
        <Li>
          Updates the library to use the improved <Code>finish</Code> event handling in <Code>@inertiajs/inertia</Code>{' '}
          version <A href="/releases/inertia-0.6.0">0.6.0</A>).
        </Li>
        <Li>
          Made all internal methods private, leaving only <Code>InertiaProgress.init()</Code> public.
        </Li>
      </Ul>
      <H2>Upgrade instructions</H2>
      <P>
        Note, you must upgrade <Code>@inertiajs/inertia</Code> to <Code>^0.6.0</Code> to use this version.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
