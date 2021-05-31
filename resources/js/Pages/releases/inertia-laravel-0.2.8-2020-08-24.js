import React from 'react'
import { A, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.8',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.8</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 24, 2020</div>
      <P>
        Add support for Laravel 8 (
        <A href="https://github.com/inertiajs/inertia-laravel/commit/1648fd10d22af3fcc6a0ac150accf14eea76ac48">
          commit
        </A>
        ).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
