import dedent from 'dedent-js'
import { A, H1, Layout, Notice, P, Strong, TabbedCode } from '../Components'

const meta = {
  title: 'Who is Inertia.js for?',
}

const Page = () => {
  return (
    <>
      <H1>Who is Inertia.js for?</H1>
      <P>
        Inertia was designed for development teams who typically build server-side rendered applications using
        frameworks like Laravel, Ruby on Rails or Django. They create controllers, get data from the database (via an
        ORM), and render views.
      </P>
      <P>
        But what happens when these developers want to replace their server-side rendered views with a modern
        JavaScript-based single-page app front-end? The answer is always "you need to build an API". Because that's how
        modern SPAs are built.
      </P>
      <P>
        This means building a REST or GraphQL API. It means figuring out auth for that API. It means client-side state
        management. It means setting up a new Git repo. It means setting up another hosting account for the API. And
        this list goes on. It's a complete paradigm shift.
      </P>
      <P>
        <Strong>
          Inertia allows you to build a fully JavaScript-based single-page app without all this added complexity.
        </Strong>
      </P>
      <P>
        Inertia works much more like a classic server-side rendered app. You create controllers, you get data from the
        database (via your ORM), and you render views. Except the views here are JavaScript page components. Meaning you
        get all the power of a client-side app, and the SPA experience, but you don't need to build an API. (Be sure to
        see the <A href="/how-it-works">how it works</A> page for a more complete explanation.)
      </P>
      <P>
        This simplicity does create a tight coupling between the back-end and the front-end, but that's already an
        accepted practice (and arguably a benefit) when building classic server-side rendered apps.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
