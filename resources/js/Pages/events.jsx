import { A, Code, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Events',
  links: [
    { url: '#registering-listeners', name: 'Registering listeners' },
    { url: '#removing-listeners', name: 'Removing listeners' },
    { url: '#cancelling-events', name: 'Cancelling events' },
    { url: '#before', name: 'Before' },
    { url: '#start', name: 'Start' },
    { url: '#progress', name: 'Progress' },
    { url: '#success', name: 'Success' },
    { url: '#error', name: 'Error' },
    { url: '#invalid', name: 'Invalid' },
    { url: '#exception', name: 'Exception' },
    { url: '#finish', name: 'Finish' },
    { url: '#navigate', name: 'Navigate' },
    { url: '#prefetching', name: 'Prefetching' },
    { url: '#prefetched', name: 'Prefetched' },
    { url: '#event-callbacks', name: 'Event callbacks' },
  ],
}

export default function () {
  return (
    <>
      <H1>Events</H1>
      <P>
        Inertia provides an event system that allows you to "hook into" the various lifecycle events of the library.
      </P>
      <H2>Registering listeners</H2>
      <P>
        To register an event listener, use the <Code>router.on()</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
        ]}
      />
      <P>
        Under the hood, Inertia uses native browser events, so you can also interact with Inertia events using the
        typical event methods you may already be familiar with - just be sure to prepend <Code>inertia:</Code> to the
        event name.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              document.addEventListener('inertia:start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              document.addEventListener('inertia:start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              document.addEventListener('inertia:start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
        ]}
      />
      <H2>Removing listeners</H2>
      <P>
        When you register an event listener, Inertia automatically returns a callback that can be invoked to remove the
        event listener.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              let removeStartEventListener = router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })

              // Remove the listener...
              removeStartEventListener()
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              let removeStartEventListener = router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })

              // Remove the listener...
              removeStartEventListener()
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              let removeStartEventListener = router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })

              // Remove the listener...
              removeStartEventListener()
            `,
          },
        ]}
      />
      <P>Combined with hooks, you can automatically remove the event listener when components unmount.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/vue3'
              import { onUnmounted } from 'vue'

              onUnmounted(
                router.on('start', (event) => {
                  console.log(\`Starting a visit to \${event.detail.visit.url}\`)
                })
              )
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { useEffect } from 'react'
              import { router } from '@inertiajs/react'

              useEffect(() => {
                return router.on('start', (event) => {
                  console.log(\`Starting a visit to \${event.detail.visit.url}\`)
                })
              }, [])
            `,
          },
          {
            name: 'Svelte 4',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'
              import { onMount } from 'svelte'

              onMount(() => {
                return router.on('start', (event) => {
                  console.log(\`Starting a visit to \${event.detail.visit.url}\`)
                })
              })
            `,
          },
          {
            name: 'Svelte 5',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              $effect(() => {
                return router.on('start', (event) => {
                  console.log(\`Starting a visit to \${event.detail.visit.url}\`)
                })
              })
            `,
          },
        ]}
      />
      <P>
        Alternatively, if you're using native browser events, you can remove the event listener using{' '}
        <Code>removeEventListener()</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              let startEventListener = (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              }

              document.addEventListener('inertia:start', startEventListener)

              // Remove the listener...
              document.removeEventListener('inertia:start', startEventListener)
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              let startEventListener = (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              }

              document.addEventListener('inertia:start', startEventListener)

              // Remove the listener...
              document.removeEventListener('inertia:start', startEventListener)
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              let startEventListener = (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              }

              document.addEventListener('inertia:start', startEventListener)

              // Remove the listener...
              document.removeEventListener('inertia:start', startEventListener)
            `,
          },
        ]}
      />
      <H2>Cancelling events</H2>
      <P>
        Some events, such as <Code>before</Code>, <Code>invalid</Code>, and <Code>error</Code>, support cancellation,
        allowing you to prevent Inertia's default behavior. Just like native events, the event will be cancelled if only
        one event listener calls <Code>event.preventDefault()</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('before', (event) => {
                if (!confirm('Are you sure you want to navigate away?')) {
                  event.preventDefault()
                }
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('before', (event) => {
                if (!confirm('Are you sure you want to navigate away?')) {
                  event.preventDefault()
                }
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('before', (event) => {
                if (!confirm('Are you sure you want to navigate away?')) {
                  event.preventDefault()
                }
              })
            `,
          },
        ]}
      />
      <P>
        For convenience, if you register your event listener using <Code>router.on()</Code>, you can cancel the event by
        returning <Code>false</Code> from the listener.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('before', (event) => {
                return confirm('Are you sure you want to navigate away?')
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('before', (event) => {
                return confirm('Are you sure you want to navigate away?')
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('before', (event) => {
                return confirm('Are you sure you want to navigate away?')
              })
            `,
          },
        ]}
      />
      <P>
        Note, browsers do not allow cancelling the native <Code>popstate</Code> event, so preventing forward and back
        history visits while using Inertia.js is not possible.
      </P>
      <H2>Before</H2>
      <P>
        The <Code>before</Code> event fires when a request is about to be made to the server. This is useful for
        intercepting visits.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('before', (event) => {
                console.log(\`About to make a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('before', (event) => {
                console.log(\`About to make a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('before', (event) => {
                console.log(\`About to make a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
        ]}
      />
      <P>The primary purpose of this event is to allow you to prevent a visit from happening.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('before', (event) => {
                return confirm('Are you sure you want to navigate away?')
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('before', (event) => {
                return confirm('Are you sure you want to navigate away?')
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('before', (event) => {
                return confirm('Are you sure you want to navigate away?')
              })
            `,
          },
        ]}
      />
      <H2>Start</H2>
      <P>
        The <Code>start</Code> event fires when a request to the server has started. This is useful for displaying
        loading indicators.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('start', (event) => {
                console.log(\`Starting a visit to \${event.detail.visit.url}\`)
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>start</Code> event is not cancelable.
      </P>
      <H2>Progress</H2>
      <P>
        The <Code>progress</Code> event fires as progress increments during file uploads.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('progress', (event) => {
                this.form.progress = event.detail.progress.percentage
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('progress', (event) => {
                this.form.progress = event.detail.progress.percentage
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('progress', (event) => {
                this.form.progress = event.detail.progress.percentage
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>progress</Code> event is not cancelable.
      </P>
      <H2>Success</H2>
      <P>
        The <Code>success</Code> event fires on successful page visits, unless validation errors are present. However,
        this does <em>not</em> include history visits.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('success', (event) => {
                console.log(\`Successfully made a visit to \${event.detail.page.url}\`)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('success', (event) => {
                console.log(\`Successfully made a visit to \${event.detail.page.url}\`)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('success', (event) => {
                console.log(\`Successfully made a visit to \${event.detail.page.url}\`)
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>success</Code> event is not cancelable.
      </P>
      <H2>Error</H2>
      <P>
        The <Code>error</Code> event fires when validation errors are present on "successful" page visits.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('error', (errors) => {
                console.log(errors)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('error', (errors) => {
                console.log(errors)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('error', (errors) => {
                console.log(errors)
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>error</Code> event is not cancelable.
      </P>
      <H2>Invalid</H2>
      <P>
        The <Code>invalid</Code> event fires when a non-Inertia response is received from the server, such as an HTML or
        vanilla JSON response. A valid Inertia response is a response that has the <Code>X-Inertia</Code> header set to{' '}
        <Code>true</Code> with a <Code>json</Code> payload containing{' '}
        <A href="/the-protocol#the-page-object">the page object</A>.
      </P>
      <P>
        This event is fired for all response types, including <Code>200</Code>, <Code>400</Code>, and <Code>500</Code>{' '}
        response codes.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('invalid', (event) => {
                console.log(\`An invalid Inertia response was received.\`)
                console.log(event.detail.response)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('invalid', (event) => {
                console.log(\`An invalid Inertia response was received.\`)
                console.log(event.detail.response)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('invalid', (event) => {
                console.log(\`An invalid Inertia response was received.\`)
                console.log(event.detail.response)
              })
            `,
          },
        ]}
      />
      <P>
        You may cancel the <Code>invalid</Code> event to prevent Inertia from showing the non-Inertia response modal.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('invalid', (event) => {
                event.preventDefault()

                // Handle the invalid response yourself...
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('invalid', (event) => {
                event.preventDefault()

                // Handle the invalid response yourself...
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('invalid', (event) => {
                event.preventDefault()

                // Handle the invalid response yourself...
              })
            `,
          },
        ]}
      />
      <H2>Exception</H2>
      <P>
        The <Code>exception</Code> event fires on unexpected XHR errors such as network interruptions. In addition, this
        event fires for errors generated when resolving page components.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('exception', (event) => {
                console.log(\`An unexpected error occurred during an Inertia visit.\`)
                console.log(event.detail.error)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('exception', (event) => {
                console.log(\`An unexpected error occurred during an Inertia visit.\`)
                console.log(event.detail.error)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('exception', (event) => {
                console.log(\`An unexpected error occurred during an Inertia visit.\`)
                console.log(event.detail.error)
              })
            `,
          },
        ]}
      />
      <P>
        You may cancel the <Code>exception</Code> event to prevent the error from being thrown.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('exception', (event) => {
                event.preventDefault()
                // Handle the error yourself
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('exception', (event) => {
                event.preventDefault()
                // Handle the error yourself
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('exception', (event) => {
                event.preventDefault()
                // Handle the error yourself
              })
            `,
          },
        ]}
      />
      <P>
        This event will <em>not</em> fire for XHR requests that receive <Code>400</Code> and <Code>500</Code> level
        responses or for non-Inertia responses, as these situations are handled in other ways by Inertia. Please consult
        the <A href="/error-handling">error handling documentation</A> for more information.
      </P>
      <H2>Finish</H2>
      <P>
        The <Code>finish</Code> event fires after an XHR request has completed for both "successful" and "unsuccessful"
        responses. This event is useful for hiding loading indicators.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('finish', (event) => {
                NProgress.done()
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('finish', (event) => {
                NProgress.done()
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('finish', (event) => {
                NProgress.done()
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>finish</Code> event is not cancelable.
      </P>
      <H2>Navigate</H2>
      <P>
        The <Code>navigate</Code> event fires on successful page visits, as well as when navigating through history.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('navigate', (event) => {
                console.log(\`Navigated to \${event.detail.page.url}\`)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('navigate', (event) => {
                console.log(\`Navigated to \${event.detail.page.url}\`)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('navigate', (event) => {
                console.log(\`Navigated to \${event.detail.page.url}\`)
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>navigate</Code> event is not cancelable.
      </P>
      <H2>Prefetching</H2>
      <P>
        The <Code>prefetching</Code> event fires when the router starts prefetching a page.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('prefetching', (event) => {
                console.log(\`Prefetching \${event.detail.page.url}\`)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('prefetching', (event) => {
                console.log(\`Prefetching \${event.detail.page.url}\`)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('prefetching', (event) => {
                console.log(\`Prefetching \${event.detail.page.url}\`)
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>prefetching</Code> event is not cancelable.
      </P>
      <H2>Prefetched</H2>
      <P>
        The <Code>prefetched</Code> event fires when the router has successfully prefetched a page.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/vue3'

              router.on('prefetched', (event) => {
                console.log(\`Prefetched \${event.detail.page.url}\`)
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { router } from '@inertiajs/react'

              router.on('prefetched', (event) => {
                console.log(\`Prefetched \${event.detail.page.url}\`)
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { router } from '@inertiajs/svelte'

              router.on('prefetched', (event) => {
                console.log(\`Prefetched \${event.detail.page.url}\`)
              })
            `,
          },
        ]}
      />
      <P>
        The <Code>prefetched</Code> event is not cancelable.
      </P>
      <H2>Event callbacks</H2>
      <P>
        In addition to the global events described throughout this page, Inertia also provides a number of{' '}
        <A href="/manual-visits#event-callbacks">event callbacks</A> that fire when manually making Inertia visits.
      </P>
    </>
  )
}
