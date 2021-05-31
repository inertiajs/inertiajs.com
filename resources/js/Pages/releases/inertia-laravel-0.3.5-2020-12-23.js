import React from 'react'
import { A, Code, H1, Layout, P, Strong } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.3.5',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.3.5</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on December 23, 2020</div>
      <P>
        This release adds support for the new error bag feature in Inertia.js (
        <A href="https://github.com/inertiajs/inertia/pull/362">#362</A>).
      </P>
      <P>
        If an <Code>errorBag</Code> is defined on an Inertia visit (and sent via the <Code>X-Inertia-Error-Bag</Code>{' '}
        header), this adapter will now automatically scope validation errors to the error bag name provided.
      </P>
      <P>
        Note, it will <Strong>only</Strong> use the visit defined error bag if an error bag isn't already been set
        server-side.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
