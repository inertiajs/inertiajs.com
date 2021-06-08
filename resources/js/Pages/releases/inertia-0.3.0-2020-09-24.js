import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <H2>Global events</H2>
    <P>
      This release adds a new event system to Inertia.js, allowing developers to "hook into" the various lifecycle
      events of the library. Here's how to use it:
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
      When you register an event, Inertia automatically returns you a callback to unregister the event. Combined with a
      destroyed hook, you can do something like this to automatically unregister the event when you navigate to a
      different page.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        export default {
          mounted() {
            this.$once(
              'hook:destroyed',
              Inertia.on('start', (event) => {
                if (!confirm('Are you sure you want to navigate away?')) {
                  event.preventDefault()
                }
              })
            )
          },
        }
      `}
    />
    <P>Under the hood this uses native browser events, so you can also work with them that way. For example:</P>
    <CodeBlock
      language="js"
      children={dedent`
        document.addEventListener('inertia:start', (event) => {
          console.log(\`starting a visit to \${event.detail.visit.url}\`)
        })
      `}
    />
    <P>
      Some events support cancellation, allowing you to prevent Inertia's default behaviour. Just like native events, if
      only one event listener calls <Code>event.preventDefault()</Code>, the event will be cancelled. Here is a complete
      list of all the available events:
    </P>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Detail</th>
        <th>Cancelable</th>
      </tr>
      <tr>
        <td>
          <Code>start</Code>
        </td>
        <td>
          Fires before a request is made to the server. Useful for displaying loading indicators and for listening to
          and intercepting visits.
        </td>
        <td>
          <Code>e.detail.visit</Code>
        </td>
        <td>Yes, prevents visit from being made.</td>
      </tr>
      <tr>
        <td>
          <Code>progress</Code>
        </td>
        <td>Fires whenever a progress event is emitted during a file upload.</td>
        <td>
          <Code>e.detail.progress</Code>
        </td>
        <td>No</td>
      </tr>
      <tr>
        <td>
          <Code>success</Code>
        </td>
        <td>Fires on successful page visits.</td>
        <td>
          <Code>e.detail.page</Code>
        </td>
        <td>No</td>
      </tr>
      <tr>
        <td>
          <Code>invalid</Code>
        </td>
        <td>Fires when a non-Inertia response is received, for all response levels (200, 400 and 500).</td>
        <td>
          <Code>e.detail.response</Code>
        </td>
        <td>Yes, prevents the modal from being shown.</td>
      </tr>
      <tr>
        <td>
          <Code>error</Code>
        </td>
        <td>
          Fires on unexpected XHR errors (such as network interruptions) and for errors generated in the
          <Code>resolveComponent()</Code> callback. Will NOT fire for XHR requests that receive a response (even if they
          are 400/500 level responses).
        </td>
        <td>
          <Code>e.detail.error</Code>
        </td>
        <td>Yes, prevents the error from being thrown.</td>
      </tr>
      <tr>
        <td>
          <Code>finish</Code>
        </td>
        <td>
          Fires after an XHR request is made to the server, for both successful and unsuccessful responses. Useful for
          hiding loading indicators.
        </td>
        <td>N/A</td>
        <td>No</td>
      </tr>
      <tr>
        <td>
          <Code>navigate</Code>
        </td>
        <td>
          Fires when a new state is pushed into the history (initial visit and on <Code>history.pushState</Code>), or
          when navigating history (<Code>popstate</Code>). Does not fire for <Code>history.replaceState</Code> events.
          These are considered "successful" page navigation events, useful for tracking analytics, and things like that.
        </td>
        <td>
          <Code>e.detail.page</Code>
        </td>
        <td>No</td>
      </tr>
    </table>
    <H2>Event callbacks</H2>
    <P>In addition to the global events, this release adds a number of visit event callbacks.</P>
    <CodeBlock
      language="js"
      children={dedent`
        Inertia.post('/users', data, {
          onCancelToken: (cancelToken) => {},
          onCancel: (visit) => {},
          onStart: (visit) => {},
          onProgress: (progress) => {},
          onSuccess: (page) => {},
          onFinish: () => {},
        })
      `}
    />
    <H2>Visit promise deprecated</H2>
    <P>
      This release deprecates the promise that is returned from <Code>Inertia.visit()</Code>. If you call{' '}
      <Code>then()</Code>, <Code>catch()</Code> or <Code>finally()</Code> on an Inertia visit, you'll get the following
      warning:
    </P>
    <CodeBlock
      children={dedent`
        Inertia.js visit promises have been deprecated and will be removed in a future release. Please use the new visit event callbacks instead. Learn more at https://inertiajs.com/events
      `}
    />
    <P>
      The recommended approach is to use the new event callbacks instead. For example, instead of using{' '}
      <Code>then()</Code>, use <Code>onSuccess()</Code>:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        Inertia.post('/profile', data, {
          onSuccess: () => {
            if (this.errors.isEmpty()) {
              this.form.password = null
            }
          },
        })
      `}
    />
    <P>
      And, instead of using <Code>finally()</Code>, use <Code>onFinish()</Code> instead:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        Inertia.post('/profile', data, {
          onFinish: () => (this.sending = false),
        })
      `}
    />
    <H2>NProgress removed (breaking change)</H2>
    <P>
      This PR removes the direct NProgress integration, since the new event system makes this so easy to do outside of
      Inertia core. This behaviour is now available via a first-class package called{' '}
      <A href="https://github.com/inertiajs/progress">@inertiajs/progress</A>. To add the new progress library to your
      project, first install the package:
    </P>
    <CodeBlock
      language="bash"
      children={dedent`
        npm install @inertiajs/progress
        yarn add @inertiajs/progress
      `}
    />
    <P>Once it's been installed, initialize it in your app:</P>
    <CodeBlock
      language="js"
      children={dedent`
        import { InertiaProgress } from '@inertiajs/progress'\n
        InertiaProgress.init({
          // The delay after which the progress bar will
          // appear during navigation, in milliseconds.
          delay: 250,\n
          // The color of the progress bar.
          color: '#29d',\n
          // Whether to include the default NProgress styles.
          includeCSS: true,\n
          // Whether the NProgress spinner will be shown.
          showSpinner: false,
        })
      `}
    />
    <H2>Other changes</H2>
    <Ul>
      <Li>
        Restored lazy evaluation of <Code>preserveScroll</Code> and <Code>preserveState</Code> ([#231<A href=""></A>
        https://github.com/inertiajs/inertia/pull/231)).
      </Li>
      <Li>Scroll region improvements (refactored to a single scroll event listener).</Li>
    </Ul>
  </>
)
