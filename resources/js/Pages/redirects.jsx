import { Code, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Redirects',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#303-response-code', name: '303 response code' },
    { url: '#external-redirects', name: 'External redirects' },
  ],
}

export default function () {
  return (
    <>
      <H1>Redirects</H1>
      <P>
        When making a non-GET Inertia request manually or via a <Code>{`<Link>`}</Code> element, you should ensure that
        you always respond with a proper Inertia redirect response.
      </P>
      <P>
        For example, if your controller is creating a new user, your "store" endpoint should return a redirect back to a
        standard <Code>GET</Code> endpoint, such as your user "index" page. Inertia will automatically follow this
        redirect and update the page accordingly.
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
                          'users' => User::all(),
                      ]);
                  }

                  public function store(Request $request)
                  {
                      User::create(
                          $request->validate([
                              'name' => ['required', 'max:50'],
                              'email' => ['required', 'max:50', 'email'],
                          ])
                      );

                      return to_route('users.index');
                  }
              }
            `,
          },
        ]}
      />
      <H2>303 response code</H2>
      <P>
        When redirecting after a <Code>PUT</Code>, <Code>PATCH</Code>, or <Code>DELETE</Code> request, you must use a{' '}
        <Code>303</Code> response code, otherwise the subsequent request will not be treated as a <Code>GET</Code>{' '}
        request. A <Code>303</Code> redirect is very similar to a <Code>302</Code> redirect; however, the follow-up
        request is explicitly changed to a <Code>GET</Code> request.
      </P>
      <P>
        If you're using one of our official server-side adapters, all redirects will automatically be converted to{' '}
        <Code>303</Code> redirects.
      </P>
      <H2>External redirects</H2>
      <P>
        Sometimes it's necessary to redirect to an external website, or even another non-Inertia endpoint in your app
        while handling an Inertia request. This can be accomplished using a server-side initiated{' '}
        <Code>window.location</Code> visit via the <Code>Inertia::location()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              return Inertia::location($url);
            `,
          },
        ]}
      />
      <P>
        The <Code>Inertia::location()</Code> method will generate a <Code>409 Conflict</Code> response and include the
        destination URL in the <Code>X-Inertia-Location</Code> header. When this response is received client-side,
        Inertia will automatically perform a <Code>window.location = url</Code> visit.
      </P>
    </>
  )
}
