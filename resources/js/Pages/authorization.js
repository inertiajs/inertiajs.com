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
        With Inertia, authorization is best handled server-side in your policies. However, you may be wondering how to
        check against your policies from within your JavaScript page components, since you won't have access to your
        server-side helpers. The simplest approach here is to pass your authorization checks as props to your page
        components.
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
                              'create_user' => Auth::user()->can('users.create'),
                          ],
                          'users' => User::all()->map(function ($user) {
                              return [
                                  'first_name' => $user->first_name,
                                  'last_name' => $user->last_name,
                                  'email' => $user->email,
                                  'can' => [
                                      'edit_user' => Auth::user()->can('users.edit', $user),
                                  ]
                              ];
                          }),
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
                    can: {
                      create_user: can?(:create, User)
                    },
                    users: User.all.map do |user|
                      user.as_json(
                        only: [ :id, :first_name, :last_name, :email ]
                      ).merge(
                        can: {
                          edit_user: can?(:edit, user)
                        }
                      )
                    end
                  }
                end
              end
            `,
          },
        ]}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
