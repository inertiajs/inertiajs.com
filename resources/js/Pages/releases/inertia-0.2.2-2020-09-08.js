import React from 'react'
import { H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.2.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.2.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on September 8, 2020</div>
      <Ul>
        <Li>Tagged wrong package...nothing to see here. 🤦</Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
