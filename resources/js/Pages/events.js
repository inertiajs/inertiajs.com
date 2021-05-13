import dedent from 'dedent-js'
import A from '../Components/A'
import P from '../Components/P'
import H1 from '../Components/H1'
import H2 from '../Components/H2'
import Code from '../Components/Code'
import Layout from '../Components/Layout'
import InlineCode from '../Components/InlineCode'
import TabbedCode from '../Components/TabbedCode'

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
        To register an event listener, use the <InlineCode>Inertia.on()</InlineCode> method.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('start', (event) => {
            console.log(\`Starting a visit to \${event.detail.visit.url}\`)
          })
        `}
      />
      <P>
        Under the hood Inertia uses native browser events, so you can also work with them that way as well. Just be sure
        to append <InlineCode>inertia:</InlineCode> to the event name.
      </P>
      <Code
        language="js"
        code={dedent`
          document.addEventListener('inertia:start', (event) => {
            console.log(\`Starting a visit to \${event.detail.visit.url}\`)
          })
        `}
      />
      <H2>Removing listeners</H2>
      <P>
        When you register an event listener, Inertia automatically returns you a callback to remove the event listener.
      </P>
      <Code
        language="js"
        code={dedent`
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
        <InlineCode>removeEventListener()</InlineCode>.
      </P>
      <Code
        language="js"
        code={dedent`
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
        Some events (<InlineCode>before</InlineCode>, <InlineCode>invalid</InlineCode>, <InlineCode>error</InlineCode>)
        support cancellation, allowing you to prevent Inertia's default behaviour. Just like native events, if only one
        event listener calls <InlineCode>event.preventDefault()</InlineCode>, the event will be cancelled.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            if (!confirm('Are you sure you want to navigate away?')) {
              event.preventDefault()
            }
          })
        `}
      />
      <P>
        As a convenience, if you register your event listener using <InlineCode>Inertia.on()</InlineCode>, you can also
        cancel the event by returning <InlineCode>false</InlineCode> from the listener.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            return confirm('Are you sure you want to navigate away?')
          })
        `}
      />
      <H2>Before</H2>
      <P>
        The <InlineCode>before</InlineCode> event fires when a request is about to be made to the server. This is useful
        for intercepting visits.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            console.log(\`About to make a visit to \${event.detail.visit.url}\`)
          })
        `}
      />
      <P>The primary purpose of this event is to allow you to prevent a visit from happening.</P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            return confirm('Are you sure you want to navigate away?')
          })
        `}
      />
      <H2>Start</H2>
      <P>
        The <InlineCode>start</InlineCode> event fires when a request to the server has started. This is useful for
        displaying loading indicators.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('start', (event) => {
            console.log(\`Starting a visit to \${event.detail.visit.url}\`)
          })
        `}
      />
      <P>
        The <InlineCode>start</InlineCode> event is not cancelable.
      </P>
      <H2>Progress</H2>
      <P>
        The <InlineCode>progress</InlineCode> event fires as progress increments during file uploads.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('progress', (event) => {
            this.form.progress = event.detail.progress.percentage
          })
        `}
      />
      <P>
        The <InlineCode>progress</InlineCode> event is not cancelable.
      </P>
      <H2>Success</H2>
      <P>
        The <InlineCode>success</InlineCode> event fires on successful page visits, unless validation errors are
        present. Note, this does <em>not</em> include history visits.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('success', (event) => {
            console.log(\`Successfully made a visit to \${event.detail.page.url}\`)
          })
        `}
      />
      <P>
        The <InlineCode>success</InlineCode> event is not cancelable.
      </P>
      <H2>Error</H2>
      <P>
        The <InlineCode>error</InlineCode> event fires when validation errors are present on "successful" page visits.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('error', (errors) => {
            console.log(errors)
          })
        `}
      />
      <P>
        The <InlineCode>error</InlineCode> event is not cancelable.
      </P>
      <H2>Invalid</H2>
      <P>
        The <InlineCode>invalid</InlineCode> event fires when a non-Inertia response is received from the server, such
        as an <InlineCode>html</InlineCode> or <InlineCode>json</InlineCode>
        response. A valid Inertia response is one that has the <InlineCode>X-Inertia</InlineCode> header set to{' '}
        <InlineCode>true</InlineCode> with a <InlineCode>json</InlineCode> payload containing{' '}
        <A href="/the-protocol#the-page-object">the page object</A>.
      </P>
      <P>
        This event is fired for all response types, including <InlineCode>200</InlineCode>, <InlineCode>400</InlineCode>
        , and <InlineCode>500</InlineCode> response codes.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('invalid', (event) => {
            console.log(\`An invalid Inertia response was received.\`)
            console.log(event.detail.response)
          })
        `}
      />
      <P>
        Cancel the <InlineCode>invalid</InlineCode> event to prevent Inertia from showing the non-Inertia response
        modal.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('invalid', (event) => {
            event.preventDefault()
            // Handle the invalid response yourself
          })
        `}
      />
      <H2>Exception</H2>
      <P>
        The <InlineCode>exception</InlineCode> event fires on unexpected XHR errors, such as network interruptions, and
        for errors generated in the <InlineCode>resolveComponent()</InlineCode> callback.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('exception', (event) => {
            console.log(\`An unexpected error occurred during an Inertia visit.\`)
            console.log(event.detail.error)
          })
        `}
      />
      <P>
        Cancel the <InlineCode>exception</InlineCode> event to prevent the error from being thrown.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('exception', (event) => {
            event.preventDefault()
            // Handle the error yourself
          })
        `}
      />
      <P>
        Note, this event will <em>not</em> fire for XHR requests that receive <InlineCode>400</InlineCode> and{' '}
        <InlineCode>500</InlineCode> level responses, or for non-Inertia responses, as these situations are handled in
        other ways by Inertia. See the <A href="/error-handling">error handling</A> page for more information.
      </P>
      <H2>Finish</H2>
      <P>
        The <InlineCode>finish</InlineCode> event fires after an XHR request has completed for both successful and
        unsuccessful responses. This event is useful for hiding loading indicators.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('finish', (event) => {
            NProgress.done()
          })
        `}
      />
      <P>
        The <InlineCode>finish</InlineCode> event is not cancelable.
      </P>
      <H2>Navigate</H2>
      <P>
        The <InlineCode>navigate</InlineCode> event fires on successful page visits, as well as when navigating through
        history. This event is useful for tracking analytics and things of that nature.
      </P>
      <Code
        language="js"
        code={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('navigate', (event) => {
            console.log(\`Navigated to \${event.detail.page.url}\`)
          })
        `}
      />
      <P>
        The <InlineCode>navigate</InlineCode> event is not cancelable.
      </P>
      <H2>Event callbacks</H2>
      <P>
        In addition to the global events, Inertia also provides a number of{' '}
        <A href="/manual-visits#event-callbacks">event callbacks</A> when manually making Inertia visits.
      </P>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
