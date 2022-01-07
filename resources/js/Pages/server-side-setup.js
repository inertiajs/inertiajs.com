import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Server-side setup',
  links: [
    { url: '#install-dependencies', name: 'Install dependencies' },
    { url: '#root-template', name: 'Root template' },
    { url: '#middleware', name: 'Middleware' },
    { url: '#creating-responses', name: 'Creating responses' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Server-side setup</H1>
      <P>
        The first step when installing Inertia is to configure your server-side framework. Inertia ships with official
        server-side adapters for <A href="https://laravel.com/">Laravel</A> and{' '}
        <A href="https://rubyonrails.org/">Rails</A>. For other frameworks, please see the{' '}
        <A href="/community-adapters">community adapters</A>.
      </P>
      <H2>Install dependencies</H2>
      <P>
        Install the Inertia server-side adapters using the preferred package manager for that language or framework.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'bash',
            code: dedent`
              composer require inertiajs/inertia-laravel
            `,
            description: 'Install via Composer',
          },
          {
            name: 'Rails',
            language: 'ruby',
            description: 'Add this to your Gemfile',
            code: dedent`
              gem 'inertia_rails'
            `,
          },
        ]}
      />
      <H2>Root template</H2>
      <P>
        Next, setup the root template that will be loaded on the first page visit. This will be used to load your site
        assets (CSS and JavaScript), and will also contain a root <Code>{'<div>'}</Code> to boot your JavaScript
        application in.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'twig',
            code: dedent`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
                  <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
                  <script src="{{ mix('/js/app.js') }}" defer></script>
                </head>
                <body>
                  @inertia
                </body>
              </html>
            `,
            description: `By default the Laravel adapter will use the app.blade.php view. This template should include your assets, as well as the @inertia directive. If you'd like to use a different root view, you can change it using Inertia::setRootView().`,
          },
          {
            name: 'Rails',
            language: 'erb',
            code: dedent`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <%= stylesheet_pack_tag 'application' %>
                  <%= javascript_pack_tag 'application', defer: true %>
                </head>
                <body>
                  <%= yield %>
                </body>
              </html>
            `,
            description: `By default the Rails adapter will use the application.html.erb view. This template should include your assets, as well as the yield command. If you'd like to use a different root view, you can change it using InertiaRails.configure.`,
          },
        ]}
      />
      <H2>Middleware</H2>
      <P>
        Next, setup the Inertia middleware. In the Rails adapter, this is configured automatically for you. However, in
        Laravel you need to publish the <Code>HandleInertiaRequests</Code> middleware to your application, which can be
        done using this artisan command:
      </P>
      <CodeBlock
        language="sh"
        children={dedent`
          php artisan inertia:middleware
        `}
      />
      <P>
        Once generated, register the <Code>HandleInertiaRequests</Code> middleware in your <Code>App\Http\Kernel</Code>,
        as the <u>last item</u> in your <Code>web</Code> middleware group.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          'web' => [
              // ...
              \\App\\Http\\Middleware\\HandleInertiaRequests::class,
          ],
        `}
      />
      <P>
        This middleware provides a <Code>version()</Code> method for setting your{' '}
        <A href="/asset-versioning">asset version</A>, and a <Code>share()</Code> method for setting{' '}
        <A href="/shared-data">shared data</A>. Please see those pages for more information.
      </P>
      <H2>Creating responses</H2>
      <P>
        That's it, you're all ready to go server-side! From here you can start creating Inertia responses. See the{' '}
        <A href="/responses">responses</A> page for more information.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Inertia\\Inertia;\n
              class EventsController extends Controller
              {
                  public function show(Event $event)
                  {
                      return Inertia::render('Event/Show', [
                          'event' => $event->only(
                              'id',
                              'title',
                              'start_date',
                              'description'
                          ),
                      ]);
                  }
              }
            `,
          },
          {
            name: 'Rails',
            language: 'ruby',
            code: dedent`
              class EventsController < ApplicationController
                def show
                  event = Event.find(params[:id])
                  render inertia: 'Event/Show',
                    props: {
                      event: event.as_json(
                        only: [ :id, :title, :start_date, :description ]
                      )
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
