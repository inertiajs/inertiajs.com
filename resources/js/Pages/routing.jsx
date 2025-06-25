import { A, Code, CodeBlock, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Routing',
  links: [
    { url: '#top', name: 'Defining routes' },
    { url: '#shorthand-routes', name: 'Shorthand routes' },
    { url: '#generating-urls', name: 'Generating URLs' },
  ],
}

export default function () {
  return (
    <>
      <H1>Routing</H1>
      <H2>Defining routes</H2>
      <P>
        When using Inertia, all of your application's routes are defined server-side. This means that you don't need Vue
        Router or React Router. Instead, you can simply define Laravel routes and return{' '}
        <A href="/responses">Inertia responses</A> from those routes.
      </P>
      <H2>Shorthand routes</H2>
      <P>
        If you have a <A href="/pages">page</A> that doesn't need a corresponding controller method, like an "FAQ" or
        "about" page, you can route directly to a component via the <Code>Route::inertia()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              Route::inertia('/about', 'About');
            `,
          },
        ]}
      />
      <H2>Generating URLs</H2>
      <P>
        Some server-side frameworks allow you to generate URLs from named routes. However, you will not have access to
        those helpers client-side. Here are a couple ways to still use named routes with Inertia.
      </P>
      <P>
        The first option is to generate URLs server-side and include them as props. Notice in this example how we're
        passing the <Code>edit_url</Code> and <Code>create_url</Code> to the <Code>Users/Index</Code> component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              class UsersController extends Controller
              {
                  public function index()
                  {
                      return Inertia::render('Users/Index', [
                          'users' => User::all()->map(function ($user) {
                              return [
                                  'id' => $user->id,
                                  'name' => $user->name,
                                  'email' => $user->email,
                                  'edit_url' => route('users.edit', $user),
                              ];
                          }),
                          'create_url' => route('users.create'),
                      ]);
                  }
              }
            `,
          },
        ]}
      />
      <P>
        However, when using Laravel, the <A href="https://github.com/tighten/ziggy">Ziggy</A> library can make your
        named, server-side routes available to you via a global <Code>route()</Code> function. In fact, if you are
        developing an application using one of Laravel's{' '}
        <A href="https://laravel.com/docs/starter-kits">starter kits</A>, Ziggy is already configured for you.
      </P>
      <P>
        If you're using Ziggy with Vue, it's helpful to make this function available as a custom <Code>$route</Code>{' '}
        property so you can use it directly in your templates.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              app.config.globalProperties.$route = route
            `,
          },
        ]}
      />
      <CodeBlock
        language="html"
        children={dedent`
          <Link :href="$route('users.create')">Create User</Link>
        `}
      />
    </>
  )
}
