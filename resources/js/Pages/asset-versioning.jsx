import { A, Code, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Asset versioning',
  links: [
    { url: '#introduction', name: 'Introduction' },
    { url: '#configuration', name: 'Configuration' },
    { url: '#cache-busting', name: 'Cache busting' },
  ],
}

export default function () {
  return (
    <>
      <H1>Asset versioning</H1>
      <P>
        One common challenge when building single-page apps is refreshing site assets when they've been changed.
        Thankfully, Inertia makes this easy by optionally tracking the current version of your site assets. When an
        asset changes, Inertia will automatically make a full page visit instead of a XHR visit on the next request.
      </P>
      <H2>Configuration</H2>
      <P>
        To enable automatic asset refreshing, you need to tell Inertia the current version of your assets. This can be
        any arbitrary string (letters, numbers, or a file hash), as long as it changes when your assets have been
        updated.
      </P>
      <P>
        Typically, your application's asset version can be specified within the <Code>version</Code> method of the
        Inertia <Code>HandleInertiaRequests</Code> middleware.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              class HandleInertiaRequests extends Middleware
              {
                  public function version(Request $request)
                  {
                      return parent::version($request);
                  }
              }
            `,
            description:
              'The HandleInertiaRequests middleware provides a sensible default for Laravel applications, which uses either a hash of the "app.asset_url" configuration value or the "mix-manifest.json" file. When using Vite, Inertia will use a hash of the "build/manifest.json" file.',
          },
        ]}
      />
      <P>
        Alternatively, the asset version can be provided manually using the <Code>Inertia::version()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Inertia\\Inertia;

              Inertia::version($version);
              Inertia::version(fn () => $version); // Lazily...
            `,
          },
        ]}
      />
      <H2>Cache busting</H2>
      <P>
        Asset refreshing in Inertia works on the assumption that a hard page visit will trigger your assets to reload.
        However, Inertia doesn't actually do anything to force this. Typically this is done with some form of cache
        busting. For example, appending a version query parameter to the end of your asset URLs.
      </P>
      <P>
        If you're using Laravel Mix, you can do this automatically by enabling{' '}
        <A href="https://laravel.com/docs/mix#versioning-and-cache-busting">versioning</A> in your{' '}
        <Code>webpack.mix.js</Code> file. When using Laravel's Vite integration, asset versioning is done automatically.
      </P>
    </>
  )
}
