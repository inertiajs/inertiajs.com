import dedent from 'dedent-js'
import React from 'react'
import { Code, CodeBlock, H1, H2, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-laravel@v0.3.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.3.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 14, 2020</div>
      <H2>Creating new middleware</H2>
      <P>
        This release removes the automatic registration of the Inertia middleware. Instead, there is a new command for
        generating your own <Code>HandleInertiaRequests</Code> middleware:
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          php artisan inertia:middleware
        `}
      />
      <H2>Registering new middleware</H2>
      <P>
        Once you've generated the new middleware, be sure to register the <Code>HandleInertiaRequests</Code> middleware
        in your <Code>App\Http\Kernel</Code> file as the <em>last item</em> in your <Code>web</Code> middleware group.
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
          protected $middlewareGroups = [
              'web' => [
                  ...
                  \\Illuminate\\Routing\\Middleware\\SubstituteBindings::class,
          +       \\App\\Http\\Middleware\\HandleInertiaRequests::class,
              ],
        `}
      />
      <H2>Using the new middleware</H2>
      <P>
        This middleware provides a <Code>version()</Code> method for setting your asset version, and a{' '}
        <Code>share()</Code> method for setting the props that are shared by default. This provides a better approach
        than doing this in your <Code>AppServiceProvider</Code> using the <Code>Inertia::version()</Code> and{' '}
        <Code>Inertia::share()</Code> helpers.
      </P>
      <P>
        Here's the complete example of how to use the new <Code>HandleInertiaRequests</Code> middleware:
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          <?php\n
          namespace App\\Http\\Middleware;\n
          use Illuminate\\Http\\Request;
          use Inertia\\Middleware;\n
          class HandleInertiaRequests extends Middleware
          {
              /**
               * Determines the current asset version.
               *
               * @see https://inertiajs.com/asset-versioning
               * @param  \\Illuminate\\Http\\Request  $request
               * @return string|null
               */
              public function version(Request $request)
              {
                  return parent::version($request);
              }\n
              /**
               * Defines the props that are shared by default.
               *
               * @see https://inertiajs.com/shared-data
               * @param  \\Illuminate\\Http\\Request  $request
               * @return array
               */
              public function share(Request $request)
              {
                  return array_merge(parent::share($request), [
                      'auth' => fn () => [
                          'user' => optional($request->user())->only(['name', 'email']),
                      ],
                      'flash' => fn () => $request->session()->only(['success', 'error']),
                  ]);
              }
          }
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
