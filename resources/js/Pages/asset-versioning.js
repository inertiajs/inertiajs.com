import dedent from 'dedent-js'
import { A, Code, H1, H2, Layout, P, TabbedCode } from '../Components'

const meta = {
  title: 'Asset versioning',
  links: [
    { url: '#introduction', name: 'Introduction' },
    { url: '#configuring', name: 'Configuring' },
    { url: '#cache-busting', name: 'Cache busting' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Asset versioning</H1>
      <P>
        One common challenge with single-page apps is refreshing site assets when they've been changed. Inertia makes
        this easy by optionally tracking the current version of your site assets. In the event that an asset changes,
        Inertia will automatically make a hard page visit instead of a normal ajax visit on the next request.
      </P>
      <H2>Configuring</H2>
      <P>
        To enable automatic asset refreshing, you simply need to tell Inertia what the current version of your assets
        is. This can be any <Code>string</Code> (letters, numbers, or a file hash), as long as it changes when your
        assets have been updated.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              /*
              |----------------------------------------------------------------
              | Via the HandleInertiaRequests middleware (recommended)
              |----------------------------------------------------------------
              */\n
              class HandleInertiaRequests extends Middleware
              {
                  public function version(Request $request)
                  {
                      return parent::version($request);
                  }
              }\n
              /*
              |----------------------------------------------------------------
              | Manually
              |----------------------------------------------------------------
              */\n
              use Inertia\\Inertia;\n
              Inertia::version($version);
              Inertia::version(fn () => $version); // Lazily
            `,
            description:
              'The HandleInertiaRequests middleware provides a sensible default for Laravel applications, which uses either a hash of the "app.asset_url" config value or the mix-manifest.json file.',
          },
          {
            name: 'Rails',
            language: 'ruby',
            code: dedent`
              InertiaRails.configure do |config|
                config.version = '1.0'
              end\n
              # You can also use lazy evaluation
              InertiaRails.configure do |config|
                config.version = lambda { InertiaRails::Version.last }
              end
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
        <Code>webpack.mix.js</Code> file.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
