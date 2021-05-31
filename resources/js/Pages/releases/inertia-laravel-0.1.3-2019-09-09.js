import React from 'react'
import { A, Code, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.1.3',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.1.3</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 9, 2019</div>
      <Ul>
        <Li>
          Added <Code>Arrayable</Code> support for props (
          <A href="https://github.com/inertiajs/inertia-laravel/pull/39">#39</A>).
        </Li>
        <Li>
          Replaced <Code>array_only</Code> with <Code>Arr::only</Code> (
          <A href="https://github.com/inertiajs/inertia-laravel/pull/68">#68</A>).
        </Li>
        <Li>
          Fixed wildcard URLs used with route macro (
          <A href="https://github.com/inertiajs/inertia-laravel/pull/69">#69</A>).
        </Li>
        <Li>
          Updated to always return a response object (
          <A href="https://github.com/inertiajs/inertia-laravel/pull/44">#44</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
