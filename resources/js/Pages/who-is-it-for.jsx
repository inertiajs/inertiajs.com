import { H1, P, Strong } from '@/Components'

export const meta = {
  title: 'Who is Inertia.js for?',
}

export default function () {
  return (
    <>
      <H1>Who is Inertia.js for?</H1>
      <P>
        Inertia was crafted for development teams and solo hackers who typically build server-side rendered applications
        using frameworks like Laravel, Ruby on Rails, Django, or Phoenix. You're used to creating controllers,
        retrieving data from the database (via an ORM), and rendering views.
      </P>
      <P>
        But what happens when you want to replace your server-side rendered views with a modern, JavaScript-based
        single-page application frontend? The answer is always "you need to build an API". Because that's how modern
        SPAs are built.
      </P>
      <P>
        This means building a REST or GraphQL API. It means figuring out authentication and authorization for that API.
        It means client-side state management. It means setting up a new Git repository. It means a more complicated
        deployment strategy. And this list goes on. It's a complete paradigm shift, and often a complete mess. We think
        there is a better way.
      </P>
      <P>
        <Strong>
          Inertia empowers you to build a modern, JavaScript-based single-page application without the tiresome
          complexity.
        </Strong>
      </P>
      <P>
        Inertia works just like a classic server-side rendered application. You create controllers, you get data from
        the database (via your ORM), and you render views. But, Inertia views are JavaScript page components written in
        React, Vue, or Svelte.
      </P>
      <P>
        This means you get all the power of a client-side application and modern SPA experience, but you don't need to
        build an API. We think it's a breath of fresh air that will supercharge your productivity.
      </P>
    </>
  )
}
