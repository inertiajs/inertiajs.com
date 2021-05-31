import React from 'react'
import { A, Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.2.15',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.2.15</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 2, 2020</div>
      <P>
        Add new <Code>Inertia::location($url)</Code> method for performing full page visits, client-side, using{' '}
        <Code>location.href</Code> (<A href="https://github.com/inertiajs/inertia-laravel/pull/154">#154</A>).
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
