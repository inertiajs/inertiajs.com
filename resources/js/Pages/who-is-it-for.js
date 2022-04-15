import React from 'react'
import { A, H1, Layout, P, Strong } from '@/Components'

const meta = {
  title: 'Who is Inertia.js for?',
}

const Page = () => {
  return (
    <>
      <H1>Who is Inertia.js for?</H1>
      <P>
        Inertia was designed for development teams and solo hackers who typically build server-side rendered applications using
        frameworks like Laravel, Ruby on Rails or Django. They create controllers, get data from the database (via an
        ORM), and render views.
      </P>
      <P>
        But what happens when these developers want to replace their server-side rendered views with a modern
        JavaScript-based single-page application front-end? The answer is always "you need to build an API". Because that's how
        modern SPAs are built.
      </P>
      <P>
        This means building a REST or GraphQL API. It means figuring out authentication and authorization for that API. It means client-side state
        management. It means setting up a new Git repository. It means a more complicated deployment strategy. And
        this list goes on. It's a complete paradigm shift.
      </P>
      <P>
        <Strong>
          Inertia allows you to build a fully JavaScript-based single-page application without any of the added complexity.
        </Strong>
      </P>
      <P>
        Inertia works much more like a classic server-side rendered application. You create controllers, you get data from the
        database (via your ORM), and you render views. But, Inertia views are JavaScript page components written in React, Vue, or Svelte.
      </P>
      <P>
        This means you get all the power of a client-side application and modern SPA experience, but you don't need to build an API.
        We think it's a breath of fresh air that will supercharge your productivity.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
