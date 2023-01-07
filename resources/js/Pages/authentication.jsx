import { A, H1, P } from '@/Components'

export const meta = {
  title: 'Authentication',
}

export default function () {
  return (
    <>
      <H1>Authentication</H1>
      <P>
        One of the benefits of using Inertia is that you don't need a special authentication system such as OAuth to
        connect to your data provider (API). Also, since your data is provided via your controllers, and housed on the
        same domain as your JavaScript components, you don't have to worry about setting up CORS.
      </P>
      <P>
        Rather, when using Inertia, you can simply use whatever authentication system your server-side framework ships
        with. Typically, this will be a session based authentication system such as the authentication system included
        with Laravel.
      </P>
      <P>
        Laravel's <A href="https://laravel.com/docs/starter-kits">starter kits</A>, Breeze and Jetstream, provide
        out-of-the-box scaffolding for new Inertia applications, including authentication.
      </P>
    </>
  )
}
