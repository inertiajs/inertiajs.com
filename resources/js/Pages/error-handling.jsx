import { A, Code, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Error handling',
  links: [
    { url: '#development', name: 'Development' },
    { url: '#production', name: 'Production' },
  ],
}

export default function () {
  return (
    <>
      <H1>Error handling</H1>
      <H2>Development</H2>
      <P>
        One of the advantages to working with a robust server-side framework is the built-in exception handling you get
        for free. For example, Laravel ships with a beautiful error reporting tool which displays a nicely formatted
        stack trace in local development.
      </P>
      <P>
        The challenge is, if you're making an XHR request (which Inertia does) and you hit a server-side error, you're
        typically left digging through the network tab in your browser's devtools to diagnose the problem.
      </P>
      <P>
        Inertia solves this issue by showing all non-Inertia responses in a modal. This means you get the same beautiful
        error-reporting you're accustomed to, even though you've made that request over XHR.
      </P>
      <div className="relative my-6 overflow-hidden rounded bg-gray-500" style={{ paddingTop: '80.5%' }}>
        <div className="absolute inset-0 flex h-full w-full items-center justify-center text-sm">Loading&hellip;</div>
        <iframe
          className="absolute inset-0 h-full w-full"
          src="https://player.vimeo.com/video/363562630?autoplay=1&loop=1&muted=1&background=1"
        ></iframe>
      </div>
      <H2>Production</H2>
      <P>
        In production you will want to return a proper Inertia error response instead of relying on the modal-driven
        error reporting that is present during development. To accomplish this, you'll need to update your framework's
        default exception handler to return a custom error page.
      </P>
      <P>
        When building Laravel applications, you can accomplish this by using the <Code>respond</Code> exception method
        in your application's <Code>bootstrap/app.php</Code> file.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Illuminate\\Http\\Request;
              use Symfony\\Component\\HttpFoundation\\Response;
              use Inertia\\Inertia;

              ->withExceptions(function (Exceptions $exceptions) {
                  $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
                      if (! app()->environment(['local', 'testing']) && in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                          return Inertia::render('ErrorPage', ['status' => $response->getStatusCode()])
                              ->toResponse($request)
                              ->setStatusCode($response->getStatusCode());
                      } elseif ($response->getStatusCode() === 419) {
                          return back()->with([
                              'message' => 'The page expired, please try again.',
                          ]);
                      }

                      return $response;
                  });
              })
            `,
          },
        ]}
      />
      <P>
        You may have noticed we're returning an <Code>ErrorPage</Code> page component in the example above. You'll need
        to actually create this component, which will serve as the generic error page for your application. Here's an
        example error component you can use as a starting point.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
              <script setup>
              import { computed } from 'vue'

              const props = defineProps({ status: Number })

              const title = computed(() => {
                return {
                  503: '503: Service Unavailable',
                  500: '500: Server Error',
                  404: '404: Page Not Found',
                  403: '403: Forbidden',
                }[props.status]
              })

              const description = computed(() => {
                return {
                  503: 'Sorry, we are doing some maintenance. Please check back soon.',
                  500: 'Whoops, something went wrong on our servers.',
                  404: 'Sorry, the page you are looking for could not be found.',
                  403: 'Sorry, you are forbidden from accessing this page.',
                }[props.status]
              })
              </script>

              <template>
                <div>
                  <h1>{{ title }}</h1>
                  <div>{{ description }}</div>
                </div>
              </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              export default function ErrorPage({ status }) {
                const title = {
                  503: '503: Service Unavailable',
                  500: '500: Server Error',
                  404: '404: Page Not Found',
                  403: '403: Forbidden',
                }[status]

                const description = {
                  503: 'Sorry, we are doing some maintenance. Please check back soon.',
                  500: 'Whoops, something went wrong on our servers.',
                  404: 'Sorry, the page you are looking for could not be found.',
                  403: 'Sorry, you are forbidden from accessing this page.',
                }[status]

                return (
                  <div>
                    <H1>{title}</H1>
                    <div>{description}</div>
                  </div>
                )
              }
            `,
          },
          {
            name: 'Svelte 4',
            language: 'jsx',
            code: dedent`
              <script>
                export let status

                $: title = {
                  503: '503: Service Unavailable',
                  500: '500: Server Error',
                  404: '404: Page Not Found',
                  403: '403: Forbidden',
                }[status]

                $: description = {
                  503: 'Sorry, we are doing some maintenance. Please check back soon.',
                  500: 'Whoops, something went wrong on our servers.',
                  404: 'Sorry, the page you are looking for could not be found.',
                  403: 'Sorry, you are forbidden from accessing this page.',
                }[status]
              </script>

              <div>
                <h1>{title}</h1>
                <div>{description}</div>
              </div>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'jsx',
            code: dedent`
              <script>
                let { status } = $props()

                const titles = {
                  503: '503: Service Unavailable',
                  500: '500: Server Error',
                  404: '404: Page Not Found',
                  403: '403: Forbidden',
                }

                const descriptions = {
                  503: 'Sorry, we are doing some maintenance. Please check back soon.',
                  500: 'Whoops, something went wrong on our servers.',
                  404: 'Sorry, the page you are looking for could not be found.',
                  403: 'Sorry, you are forbidden from accessing this page.',
                }
              </script>

              <div>
                <h1>{titles[status]}</h1>
                <div>{description[status]}</div>
              </div>
            `,
          },
        ]}
      />
    </>
  )
}
