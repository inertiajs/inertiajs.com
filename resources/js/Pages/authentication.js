import React from 'react'
import { H1, Layout, P } from '@/Components'

const meta = {
  title: 'Authentication',
}

const Page = () => {
  return (
    <>
      <H1>Authentication</H1>
      <P>
        One of the benefits of using Inertia is that you don't need a special authentication system to connect to your
        data provider (API), such as OAuth. Also, since your data is provided via your controllers, and housed on the
        same domain as your JavaScript components, you don't have to worry about setting up CORS.
      </P>
      <P>
        Rather, with Inertia you can simply use whatever authentication system your server-side framework ships with.
        Typically this will be a session based auth system.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
