import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'

const meta = {
  title: 'CSRF protection',
  links: [
    { url: '#making-requests', name: 'Making requests' },
    { url: '#handling-mismatches', name: 'Handling mismatches' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>CSRF protection</H1>
      <H2>Making requests</H2>
      <Notice>
        Laravel automatically includes the proper CSRF token when making requests via Inertia or Axios. However, if you're using Laravel, be sure to omit the <Code color="orange">csrf-token</Code> meta tag from your project,
        as this will prevent the CSRF token from refreshing properly.
      </Notice>
      <P>
        If your server-side framework includes cross-site request forgery (CSRF) protection, you'll need to ensure that each
        Inertia requests includes the necessary CSRF token for <Code>POST</Code>, <Code>PUT</Code>, <Code>PATCH</Code>, and{' '}
        <Code>DELETE</Code> requests.
      </P>
      <P>
        One solution is to include the CSRF token as a prop on every response. You can then use the token when making
        Inertia requests.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          this.$inertia.post('/users', {
            name: this.name,
            email: this.email,
            _token: this.$page.props.csrf_token,
          })
        `}
      />
      <P>
        You can even use Inertia's <A href="/shared-data">shared data</A> functionality to automatically include the{' '}
        <Code>csrf_token</Code> with each response.
      </P>
      <P>
        However, a better approach is to use the CSRF functionality already built into{' '}
        <A href="https://github.com/axios/axios">axios</A> for this. Axios is the HTTP library that Inertia uses under
        the hood.
      </P>
      <P>
        Axios automatically checks for the existence of an <Code>XSRF-TOKEN</Code> cookie. If it's present, it will then
        include the token in an <Code>X-XSRF-TOKEN</Code> header for any requests it makes.
      </P>
      <P>
        The easiest way to implement this is using server-side middleware. Simply include the <Code>XSRF-TOKEN</Code>{' '}
        cookie on each response, and then verify the token using the <Code>X-XSRF-TOKEN</Code> header sent in the
        requests from axios.
      </P>
      <P>
        Of course, as already discussed, some server-side frameworks such as Laravel automatically handle the inclusion of the CSRF
        token when making requests. Therefore, no additional configuration is required when using one of these frameworks.
      </P>
      <H2>Handling mismatches</H2>
      <P>
        When a CSRF token mismatch occurs, your server-side framework will likely throw an exception that results in an error
        response. For example, when using Laravel, a <Code>TokenMismatchException</Code> is thrown which results in a{' '}
        <Code>419</Code> error page. Since that isn't a valid Inertia response, the error is shown in a modal.
      </P>
      <video controls>
        <source src="/mp4/csrf-mismatch-modal.mp4" type="video/mp4" />
      </video>
      <P>
        Obviously, this isn't a great user experience. A better way to handle these errors is to return a redirect back to the
        previous page, along with a flash message that the page expired. This will result in a valid Inertia response
        with the flash message available as a prop which you can then display to the user. Of course, you'll need to share
        your <A href="/shared-data#flash-messages">flash messages</A> with Inertia for this to work.
      </P>
      <P>
        When using Laravel, you may modify your application's exception handler to automatically redirect the user back
        to the page they were previously on while flashing a message to the session. First, you will need to extend
        your exception handler's <Code>render</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Throwable;
              use Inertia\\Inertia;\n
              /**
               * Prepare exception for rendering.
               *
               * @param  \\Throwable  $e
               * @return \\Throwable
               */
              public function render($request, Throwable $e)
              {
                  $response = parent::render($request, $e);\n
                  if ($response->status() === 419) {
                      return back()->with([
                          'message' => 'The page expired, please try again.',
                      ]);
                  }\n
                  return $response;
              }
            `,
          }
        ]}
      />
      <P>
        The end result is a much better experience for your users. Instead of seeing the error modal, the user is instead
        presented with a message that the page "expired" and are asked to try again.
      </P>
      <video controls>
        <source src="/mp4/csrf-mismatch-warning.mp4" type="video/mp4" />
      </video>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
