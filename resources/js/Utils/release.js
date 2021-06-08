import React from 'react'
import { H1, Layout } from '@/Components'

export default function release(page) {
  const Page = ({ title, date }) => (
    <>
      <H1>{title}</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on {date}</div>
      {page}
    </>
  )

  Page.layout = page => <Layout children={page} meta={{ title: page.props.title }} />

  return Page
}
