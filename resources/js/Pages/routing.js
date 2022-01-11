import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Routing',
  links: [
    { url: '#top', name: 'Defining routes' },
    { url: '#route-helpers', name: 'Route helpers' },
    { url: '#generating-routes', name: 'Generating URLs' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Routing</H1>
      <H2>Defining routes</H2>
      <P>
        With Inertia all routing is defined server-side. Meaning you don't need Vue Router or React Router. Simply
        create routes using your server-side framework of choice.
      </P>
      <H2>Route helpers</H2>
      <P>
        If you have a page that doesn't need a corresponding controller method, like an FAQ or about page, you can route
        directly to a component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              Route::inertia('/about', 'AboutComponent');
            `,
          },
          {
            name: 'Rails',
            language: 'ruby',
            code: dedent`
              inertia 'about' => 'AboutComponent'
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
                                  'edit_url' => URL::route('users.edit', $user),
                              ];
                          }),
                          'create_url' => URL::route('users.create'),
                      ]);
                  }
              }
            `,
          },
          {
            name: 'Rails',
            language: 'ruby',
            code: dedent`
              class UsersController < ApplicationController
                def index
                  render inertia: 'Users/Index', props: {
                    users: User.all.map do |user|
                      user.as_json(
                        only: [ :id, :name, :email ]
                      ).merge(
                        edit_url: edit_user_path(user)
                      )
                    end,
                    create_url: new_user_path
                  }
                end
              end
            `,
          },
        ]}
      />
      <P>
        Another option is to make your route definitions available client-side as JSON, and then use this to generate
        URLs from your named routes.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          <script>
            let routes = {{ json_encode($routes) }}
          </script>
        `}
      />
      <P>
        If you're using Laravel, the <A href="https://github.com/tightenco/ziggy">Ziggy</A> library does this for you
        automatically via a global <Code>route()</Code> function. If you're using Ziggy with Vue, it's helpful to make
        this function available as a custom <Code>$route</Code> property so you can use it directly in your templates.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              Vue.prototype.$route = route
            `,
          },
          {
            name: 'Vue 3',
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
      <P>
        For Ruby on Rails there is a similar library called{' '}
        <A href="https://github.com/railsware/js-routes">JsRoutes</A>.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
