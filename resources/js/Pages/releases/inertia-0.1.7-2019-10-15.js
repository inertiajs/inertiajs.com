import React from 'react'
import { A, H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.1.7',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.1.7</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 15, 2019</div>
      <Ul>
        <Li>
          Fix bug with scroll position not resetting (<A href="https://github.com/inertiajs/inertia/pull/87">#87</A>).
        </Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
