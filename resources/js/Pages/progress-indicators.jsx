import { A, Code, CodeBlock, H1, H2, H3, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Progress indicators',
  links: [
    { url: '#default', name: 'Default' },
    { url: '#custom', name: 'Custom' },
    { url: '#visit-options', name: 'Visit Options' },
  ],
}

export default function () {
  return (
    <>
      <H1>Progress indicators</H1>
      <P>
        Since Inertia requests are made via XHR, there would typically not be a browser loading indicator when
        navigating from one page to another. To solve this, Inertia displays a progress indicator at the top of the page
        whenever you make an Inertia visit. However, <A href="#visit-options">asynchronous requests</A> do not show the
        progress indicator unless explicitly configured.
      </P>
      <P>
        Of course, if you prefer, you can disable Inertia's default loading indicator and provide your own custom
        implementation. We'll discuss both approaches below.
      </P>
      <H2>Default</H2>
      <P>
        Inertia's default progress indicator is a light-weight wrapper around the{' '}
        <A href="https://ricostacruz.com/nprogress/">NProgress</A> library. You can customize it via the{' '}
        <Code>progress</Code> property of the <Code>createInertiaApp()</Code> function.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          createInertiaApp({
            progress: {
              // The delay after which the progress bar will appear, in milliseconds...
              delay: 250,

              // The color of the progress bar...
              color: '#29d',

              // Whether to include the default NProgress styles...
              includeCSS: true,

              // Whether the NProgress spinner will be shown...
              showSpinner: false,
            },
            // ...
          })
        `}
      />
      <P>
        You can disable Inertia's default loading indicator by setting the <Code>progress</Code> property to{' '}
        <Code>false</Code>.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          createInertiaApp({
            progress: false,
            // ...
          })
        `}
      />
      <H2>Custom</H2>
      <P>
        It's also possible to setup your own custom page loading indicators using Inertia <A href="/events">events</A>.
        Let's explore how to do this using the <A href="https://ricostacruz.com/nprogress/">NProgress</A> library as an
        example.
      </P>
      <P>First, disable Inertia's default loading indicator.</P>
      <CodeBlock
        language="js"
        children={dedent`
          createInertiaApp({
            progress: false,
            // ...
          })
        `}
      />
      <P>Next, install the NProgress library.</P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install nprogress
        `}
      />
      <P>
        After installation, you'll need to add the NProgress{' '}
        <A href="https://github.com/rstacruz/nprogress/blob/master/nprogress.css">styles</A> to your project. You can do
        this using a CDN hosted copy of the styles.
      </P>
      <CodeBlock
        language="html"
        children={dedent`
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
        `}
      />
      <P>
        Next, import both <Code>NProgress</Code> and the Inertia <Code>router</Code> into your application.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/vue3'
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/react'
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/svelte'
            `,
          },
        ]}
      />
      <P>
        Next, let's add a <Code>start</Code> event listener. We'll use this listener to show the progress bar when a new
        Inertia visit begins.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.on('start', () => NProgress.start())
        `}
      />
      <P>
        Then, let's add a <Code>finish</Code> event listener to hide the progress bar when the page visit finishes.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.on('finish', () => NProgress.done())
        `}
      />
      <P>
        That's it! Now, as you navigate from one page to another, the progress bar will be added and removed from the
        page.
      </P>
      <H3>Handling cancelled visits</H3>
      <P>
        While this custom progress implementation works great for page visits that finish properly, it would be nice to
        handle cancelled visits as well. First, for interrupted visits (those that get cancelled as a result of a new
        visit), the progress bar should simply be reset back to the start position. Second, for manually cancelled
        visits, the progress bar should be immediately removed from the page.
      </P>
      <P>
        We can accomplish this by inspecting the <Code>event.detail.visit</Code> object that's provided to the finish
        event.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.on('finish', (event) => {
            if (event.detail.visit.completed) {
              NProgress.done()
            } else if (event.detail.visit.interrupted) {
              NProgress.set(0)
            } else if (event.detail.visit.cancelled) {
              NProgress.done()
              NProgress.remove()
            }
          })
        `}
      />
      <H3>File upload progress</H3>
      <P>
        Let's take this a step further. When files are being uploaded, it would be great to update the loading indicator
        to reflect the upload progress. This can be done using the <Code>progress</Code> event.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.on('progress', (event) => {
            if (event.detail.progress.percentage) {
              NProgress.set((event.detail.progress.percentage / 100) * 0.9)
            }
          })
        `}
      />
      <P>
        Now, instead of the progress bar "trickling" while the files are being uploaded, it will actually update it's
        position based on the progress of the request. We limit the progress here to 90%, since we still need to wait
        for a response from the server.
      </P>
      <H3>Loading indicator delay</H3>
      <P>
        The last thing we're going to implement is a loading indicator delay. It's often preferable to delay showing the
        loading indicator until a request has taken longer than 250-500 milliseconds. This prevents the loading
        indicator from appearing constantly on quick page visits, which can be visually distracting.
      </P>
      <P>
        To implement the delay behavior, we'll use the <Code>setTimeout</Code> and <Code>clearTimeout</Code> functions.
        Let's start by defining a variable to keep track of the timeout.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          let timeout = null
        `}
      />
      <P>
        Next, let's update the <Code>start</Code> event listener to start a new timeout that will show the progress bar
        after 250 milliseconds.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.on('start', () => {
            timeout = setTimeout(() => NProgress.start(), 250)
          })
        `}
      />
      <P>
        Next, we'll update the <Code>finish</Code> event listener to clear any existing timeouts in the event that the
        page visit finishes before the timeout does.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.on('finish', (event) => {
            clearTimeout(timeout)
            // ...
          })
        `}
      />
      <P>
        In the <Code>finish</Code> event listener, we need to determine if the progress bar has actually started
        displaying progress, otherwise we'll inadvertently cause it to show before the timeout has finished.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.on('finish', (event) => {
            clearTimeout(timeout)
            if (!NProgress.isStarted()) {
              return
            }
            // ...
          })
        `}
      />
      <P>
        And, finally, we need to do the same check in the <Code>progress</Code> event listener.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.on('progress', event => {
            if (!NProgress.isStarted()) {
              return
            }
            // ...
          }
        `}
      />
      <P>That's it, you now have a beautiful custom page loading indicator!</P>
      <H3>Complete example</H3>
      <P>For convenience, here is the full source code of the final version of our custom loading indicator.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/vue3'

              let timeout = null

              router.on('start', () => {
                timeout = setTimeout(() => NProgress.start(), 250)
              })

              router.on('progress', (event) => {
                if (NProgress.isStarted() && event.detail.progress.percentage) {
                  NProgress.set((event.detail.progress.percentage / 100) * 0.9)
                }
              })

              router.on('finish', (event) => {
                clearTimeout(timeout)
                if (!NProgress.isStarted()) {
                  return
                } else if (event.detail.visit.completed) {
                  NProgress.done()
                } else if (event.detail.visit.interrupted) {
                  NProgress.set(0)
                } else if (event.detail.visit.cancelled) {
                  NProgress.done()
                  NProgress.remove()
                }
              })
            `,
          },
          {
            name: 'React',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/react'

              let timeout = null

              router.on('start', () => {
                timeout = setTimeout(() => NProgress.start(), 250)
              })

              router.on('progress', (event) => {
                if (NProgress.isStarted() && event.detail.progress.percentage) {
                  NProgress.set((event.detail.progress.percentage / 100) * 0.9)
                }
              })

              router.on('finish', (event) => {
                clearTimeout(timeout)
                if (!NProgress.isStarted()) {
                  return
                } else if (event.detail.visit.completed) {
                  NProgress.done()
                } else if (event.detail.visit.interrupted) {
                  NProgress.set(0)
                } else if (event.detail.visit.cancelled) {
                  NProgress.done()
                  NProgress.remove()
                }
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/svelte'

              let timeout = null

              router.on('start', () => {
                timeout = setTimeout(() => NProgress.start(), 250)
              })

              router.on('progress', (event) => {
                if (NProgress.isStarted() && event.detail.progress.percentage) {
                  NProgress.set((event.detail.progress.percentage / 100) * 0.9)
                }
              })

              router.on('finish', (event) => {
                clearTimeout(timeout)
                if (!NProgress.isStarted()) {
                  return
                } else if (event.detail.visit.completed) {
                  NProgress.done()
                } else if (event.detail.visit.interrupted) {
                  NProgress.set(0)
                } else if (event.detail.visit.cancelled) {
                  NProgress.done()
                  NProgress.remove()
                }
              })
            `,
          },
        ]}
      />
      <H2>Visit Options</H2>
      <P>
        In addition to these configurations, Inertia.js provides two visit options to control the loading indicator on a
        per-request basis: <Code>showProgress</Code> and <Code>async</Code>. These options offer greater control over
        how Inertia.js handles asynchronous requests and manages progress indicators.
      </P>
      <H3>showProgress</H3>
      <P>
        The <Code>showProgress</Code> option provides fine-grained control over the visibility of the loading indicator
        during requests.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          router.get('/settings', {}, { showProgress: false })
        `}
      />
      <H3>async</H3>
      <P>
        The <Code>async</Code> option allows you to perform asynchronous requests without displaying the default
        progress indicator. It can be used in combination with the <Code>showProgress</Code> option.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          // Disable the progress indicator
          router.get('/settings', {}, { async: true })

          // Enable the progress indicator with async requests
          router.get('/settings', {}, { async: true, showProgress: true })
        `}
      />
    </>
  )
}
