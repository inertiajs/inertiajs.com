import { A, Code, CodeBlock, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Server-side setup',
  links: [
    { url: '#laravel-starter-kits', name: 'Laravel starter kits' },
    { url: '#install-dependencies', name: 'Install dependencies' },
    { url: '#root-template', name: 'Root template' },
    { url: '#middleware', name: 'Middleware' },
    { url: '#creating-responses', name: 'Creating responses' },
  ],
}

export default function () {
  return (
    <>
      <H1>Server-side setup</H1>
      <P>
        The first step when installing Inertia is to configure your server-side framework. Inertia maintains an official
        server-side adapter for <A href="https://laravel.com/">Laravel</A>. For other frameworks, please see the{' '}
        <A href="/community-adapters">community adapters</A>.
      </P>
      <P>
        Inertia is fine-tuned for Laravel, so the documentation examples on this website utilize Laravel. For examples
        of using Inertia with other server-side frameworks, please refer to the framework specific documentation
        maintained by that adapter.
      </P>
      <H2>Laravel starter kits</H2>
      <P>
        Laravel's <A href="https://laravel.com/docs/starter-kits">starter kits</A>, Breeze and Jetstream, provide
        out-of-the-box scaffolding for new Inertia applications. These starter kits are the absolute fastest way to
        start building a new Inertia project using Laravel and Vue or React. However, if you would like to manually
        install Inertia into your application, please consult the documentation below.
      </P>
      <H2>Install dependencies</H2>
      <P>First, install the Inertia server-side adapter using the Composer package manager.</P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'bash',
            code: dedent`
              composer require inertiajs/inertia-laravel
            `,
          },
        ]}
      />
      <H2>Root template</H2>
      <P>
        Next, setup the root template that will be loaded on the first page visit to your application. This will be used
        to load your site assets (CSS and JavaScript), and will also contain a root <Code>{'<div>'}</Code> in which to
        boot your JavaScript application.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'markup',
            code: dedent`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
                  @vite('resources/js/app.js')
                  @inertiaHead
                </head>
                <body>
                  @inertia
                </body>
              </html>
            `,
          },
        ]}
      />
      <P>
        This template should include your assets, as well as the <Code>@inertia</Code> and <Code>@inertiaHead</Code>{' '}
        directives.
      </P>
      <P>
        By default, Inertia's Laravel adapter will assume your root template is named <Code>app.blade.php</Code>. If you
        would like to use a different root view, you can change it using the <Code>Inertia::setRootView()</Code> method.
      </P>
      <H2>Middleware</H2>
      <P>
        Next we need to setup the Inertia middleware. You can accomplish this by publishing the{' '}
        <Code>HandleInertiaRequests</Code> middleware to your application, which can be done using the following Artisan
        command.
      </P>
      <CodeBlock
        language="sh"
        children={dedent`
          php artisan inertia:middleware
        `}
      />
      <P>
        Once the middleware has been published, append the <Code>HandleInertiaRequests</Code> middleware to the{' '}
        <Code>web</Code> middleware group in your application's <Code>bootstrap/app.php</Code> file.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          use App\\Http\\Middleware\\HandleInertiaRequests;

          ->withMiddleware(function (Middleware $middleware) {
              $middleware->web(append: [
                  HandleInertiaRequests::class,
              ]);
          })
        `}
      />
      <P>
        This middleware provides a <Code>version()</Code> method for setting your{' '}
        <A href="/asset-versioning">asset version</A>, as well as a <Code>share()</Code> method for defining{' '}
        <A href="/shared-data">shared data</A>.
      </P>
      <H2>Creating responses</H2>
      <P>
        That's it, you're all ready to go server-side! Now you're ready to start creating Inertia{' '}
        <A href="/pages">pages</A> and rendering them via <A href="/responses">responses</A>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Inertia\\Inertia;

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
        ]}
      />
    </>
  )
}
