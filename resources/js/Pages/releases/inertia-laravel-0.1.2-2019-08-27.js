import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.1.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.1.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 27, 2019</div>
      <P>
        Added auto registering of middleware (<A href="https://github.com/inertiajs/inertia-laravel/pull/61">#61</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
