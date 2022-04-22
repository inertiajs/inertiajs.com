import React from 'react'
import dedent from 'dedent-js'
import { H1, Layout, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Authorization',
}

const Page = () => {
  return (
    <>
      <H1>Authorization</H1>
      <P>
        When using Inertia, authorization is best handled server-side in your application's authorization policies. However, you may be wondering how to
        perform checks against your policies from within your JavaScript page components since you won't have access to your
        server-side helpers.
      </P>
      <P>
        The simplest approach to solving this problem is to pass the results of your authorization checks as props to your page components.
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
                          'can' => [
                              'create_user' => Auth::user()->can('create', User::class),
                          ],
                          'users' => User::all()->map(function ($user) {
                              return [
                                  'first_name' => $user->first_name,
                                  'last_name' => $user->last_name,
                                  'email' => $user->email,
                                  'can' => [
                                      'edit_user' => Auth::user()->can('edit', $user),
                                  ]
                              ];
                          }),
                      ]);
                  }
              }
            `,
          }
        ]}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
