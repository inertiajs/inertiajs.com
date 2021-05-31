import React from 'react'
import { H1, Layout, Li, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.6.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.6.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on November 13, 2020</div>
      <Ul>
        <Li>Bring type declarations up to date.</Li>
      </Ul>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
