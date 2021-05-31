import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.10',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.10</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 9, 2020</div>
      <P>
        Add the ability to customize the root <Code>div</Code> <Code>id</Code> when using the <Code>@inertia</Code>{' '}
        directive (<A href="https://github.com/inertiajs/inertia-laravel/pull/139">#139</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
