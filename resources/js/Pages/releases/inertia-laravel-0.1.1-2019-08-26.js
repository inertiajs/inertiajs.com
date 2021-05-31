import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.1.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.1.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 26, 2019</div>
      <P>
        Added a new <Code>Route::inertia($uri, $component, $data)</Code> macro (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/60">#60</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
