import React from 'react'
import { A, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia-vue3@v0.3.7',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.3.7</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on March 30, 2021</div>
      <Ul>
        <Li>
          Fixed bug with form helper remember functionality when working with array and object props (
          <A href="https://github.com/inertiajs/inertia/pull/587">#587</A>).
        </Li>
        <Li>
          Fixed bug causing Vue to throw a warning when using nested layouts (
          <A href="https://github.com/inertiajs/inertia/pull/588">#588</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
