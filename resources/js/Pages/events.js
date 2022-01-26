import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, P, TabbedCode } from '@/Components'

const meta = {
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
    { url: '#event-callbacks', name: 'Event callbacks' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Events</H1>
      <P>
        Inertia provides an event system that allows you to "hook into" the various lifecycle events of the library.
      </P>
      <H2>Registering listeners</H2>
      <P>
        To register an event listener, use the <Code>Inertia.on()</Code> method.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('start', (event) => {
            console.log(\`Starting a visit to \${event.detail.visit.url}\`)
          })
        `}
      />
      <P>
        Under the hood Inertia uses native browser events, so you can also work with them that way as well. Just be sure
        to prepend <Code>inertia:</Code> to the event name.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          document.addEventListener('inertia:start', (event) => {
            console.log(\`Starting a visit to \${event.detail.visit.url}\`)
          })
        `}
      />
      <H2>Removing listeners</H2>
      <P>
        When you register an event listener, Inertia automatically returns you a callback to remove the event listener.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          let removeStartEventListener = Inertia.on('start', (event) => {
            console.log(\`Starting a visit to \${event.detail.visit.url}\`)
          })\n
          // Remove the listener
          removeStartEventListener()
        `}
      />
      <P>Combined with hooks, you can automatically remove the event listener on component unmount.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'jsx',
            code: dedent`
              export default {
                mounted() {
                  this.$once(
                    'hook:destroyed',
                    this.$inertia.on('start', (event) => {
                      console.log(\`Starting a visit to \${event.detail.visit.url}\`)
                    })
                  )
                },
              }
            `,
          },
          {
            name: 'Vue 3',
            language: 'jsx',
            code: dedent`
              import { Inertia } from '@inertiajs/inertia'
              import { onUnmounted } from 'vue'\n
              export default {
                setup() {
                  onUnmounted(
                    Inertia.on('start', (event) => {
                      console.log(\`Starting a visit to \${event.detail.visit.url}\`)
                    })
                  )
                },
              }
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { Inertia } from '@inertiajs/inertia'
              import React, { useEffect } from 'react'\n
              useEffect(() => {
                return Inertia.on('start', (event) => {
                  console.log(\`Starting a visit to \${event.detail.visit.url}\`)
                })
              }, [])
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
              import { Inertia } from '@inertiajs/inertia'
              import { onMount } from 'svelte'\n
              onMount(() => {
                return Inertia.on('start', (event) => {
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
      <CodeBlock
        language="js"
        children={dedent`
          let startEventListener = (event) => {
            console.log(\`Starting a visit to \${event.detail.visit.url}\`)
          }\n
          document.addEventListener('inertia:start', startEventListener)\n
          // Remove the listener
          document.removeEventListener('inertia:start', startEventListener)
        `}
      />
      <H2>Cancelling events</H2>
      <P>
        Some events (<Code>before</Code>, <Code>invalid</Code>, <Code>error</Code>) support cancellation, allowing you
        to prevent Inertia's default behaviour. Just like native events, if only one event listener calls{' '}
        <Code>event.preventDefault()</Code>, the event will be cancelled.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            if (!confirm('Are you sure you want to navigate away?')) {
              event.preventDefault()
            }
          })
        `}
      />
      <P>
        As a convenience, if you register your event listener using <Code>Inertia.on()</Code>, you can also cancel the
        event by returning <Code>false</Code> from the listener.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            return confirm('Are you sure you want to navigate away?')
          })
        `}
      />
      <H2>Before</H2>
      <P>
        The <Code>before</Code> event fires when a request is about to be made to the server. This is useful for
        intercepting visits.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            console.log(\`About to make a visit to \${event.detail.visit.url}\`)
          })
        `}
      />
      <P>The primary purpose of this event is to allow you to prevent a visit from happening.</P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            return confirm('Are you sure you want to navigate away?')
          })
        `}
      />
      <H2>Start</H2>
      <P>
        The <Code>start</Code> event fires when a request to the server has started. This is useful for displaying
        loading indicators.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('start', (event) => {
            console.log(\`Starting a visit to \${event.detail.visit.url}\`)
          })
        `}
      />
      <P>
        The <Code>start</Code> event is not cancelable.
      </P>
      <H2>Progress</H2>
      <P>
        The <Code>progress</Code> event fires as progress increments during file uploads.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('progress', (event) => {
            this.form.progress = event.detail.progress.percentage
          })
        `}
      />
      <P>
        The <Code>progress</Code> event is not cancelable.
      </P>
      <H2>Success</H2>
      <P>
        The <Code>success</Code> event fires on successful page visits, unless validation errors are present. Note, this
        does <em>not</em> include history visits.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('success', (event) => {
            console.log(\`Successfully made a visit to \${event.detail.page.url}\`)
          })
        `}
      />
      <P>
        The <Code>success</Code> event is not cancelable.
      </P>
      <H2>Error</H2>
      <P>
        The <Code>error</Code> event fires when validation errors are present on "successful" page visits.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('error', (errors) => {
            console.log(errors)
          })
        `}
      />
      <P>
        The <Code>error</Code> event is not cancelable.
      </P>
      <H2>Invalid</H2>
      <P>
        The <Code>invalid</Code> event fires when a non-Inertia response is received from the server, such as an{' '}
        <Code>html</Code> or <Code>json</Code> response. A valid Inertia response is one that has the{' '}
        <Code>X-Inertia</Code> header set to <Code>true</Code> with a <Code>json</Code> payload containing{' '}
        <A href="/the-protocol#the-page-object">the page object</A>.
      </P>
      <P>
        This event is fired for all response types, including <Code>200</Code>, <Code>400</Code>, and <Code>500</Code>{' '}
        response codes.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('invalid', (event) => {
            console.log(\`An invalid Inertia response was received.\`)
            console.log(event.detail.response)
          })
        `}
      />
      <P>
        Cancel the <Code>invalid</Code> event to prevent Inertia from showing the non-Inertia response modal.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('invalid', (event) => {
            event.preventDefault()
            // Handle the invalid response yourself
          })
        `}
      />
      <H2>Exception</H2>
      <P>
        The <Code>exception</Code> event fires on unexpected XHR errors, such as network interruptions, and for errors
        generated when resolving page components.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('exception', (event) => {
            console.log(\`An unexpected error occurred during an Inertia visit.\`)
            console.log(event.detail.error)
          })
        `}
      />
      <P>
        Cancel the <Code>exception</Code> event to prevent the error from being thrown.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('exception', (event) => {
            event.preventDefault()
            // Handle the error yourself
          })
        `}
      />
      <P>
        Note, this event will <em>not</em> fire for XHR requests that receive <Code>400</Code> and <Code>500</Code>{' '}
        level responses, or for non-Inertia responses, as these situations are handled in other ways by Inertia. See the{' '}
        <A href="/error-handling">error handling</A> page for more information.
      </P>
      <H2>Finish</H2>
      <P>
        The <Code>finish</Code> event fires after an XHR request has completed for both successful and unsuccessful
        responses. This event is useful for hiding loading indicators.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('finish', (event) => {
            NProgress.done()
          })
        `}
      />
      <P>
        The <Code>finish</Code> event is not cancelable.
      </P>
      <H2>Navigate</H2>
      <P>
        The <Code>navigate</Code> event fires on successful page visits, as well as when navigating through history.
        This event is useful for tracking analytics and things of that nature.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('navigate', (event) => {
            console.log(\`Navigated to \${event.detail.page.url}\`)
          })
        `}
      />
      <P>
        The <Code>navigate</Code> event is not cancelable.
      </P>
      <H2>Event callbacks</H2>
      <P>
        In addition to the global events, Inertia also provides a number of{' '}
        <A href="/manual-visits#event-callbacks">event callbacks</A> when manually making Inertia visits.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
