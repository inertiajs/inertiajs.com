import { A, Code, CodeBlock, H1, H2, H3, Layout, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

const meta = {
  title: 'Progress indicators',
  links: [
    { url: '#default', name: 'Default' },
    { url: '#custom', name: 'Custom' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Progress indicators</H1>
      <P>
        Since Inertia requests are made via XHR, there's no default browser loading indicator when navigating from one
        page to another. To solve this Inertia displays a progress indicator at the top of the page whenever you make an
        Inertia visit.
      </P>
      <P>
        If you prefer, you can also disable Inertia's default loading indicator and provide your own custom
        implementation. We'll look at both approaches below.
      </P>
      <H2>Default</H2>
      <P>
        Inertia's default progress indicator is a light wrapper around the{' '}
        <A href="https://ricostacruz.com/nprogress/">NProgress</A> library. You can customize it via the{' '}
        <Code>progress</Code> property of the <Code>createInertiaApp()</Code> function.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          createInertiaApp({
            progress: {
              // The delay after which the progress bar will appear
              // during navigation, in milliseconds.
              delay: 250,\n
              // The color of the progress bar.
              color: '#29d',\n
              // Whether to include the default NProgress styles.
              includeCSS: true,\n
              // Whether the NProgress spinner will be shown.
              showSpinner: false,
            },
            // ...
          })
        `}
      />
      <P>
        You can disable Inertia's default loading indicator by setting the <Code>progress</Code> property to{' '}
        <Code>false</Code>:
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
        Let's explore how to do this, using the <A href="https://ricostacruz.com/nprogress/">NProgress</A> library as an
        example.
      </P>
      <P>First, disable Inertia's default loading indicator:</P>
      <CodeBlock
        language="js"
        children={dedent`
          createInertiaApp({
            progress: false,
            // ...
          })
        `}
      />
      <P>
        Next, install the NProgress library. Technically this is already installed since it's an Inertia dependency, but
        it's good to be explicit, as Inertia could change in the future.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install nprogress
        `}
      />
      <P>
        You'll need to add the NProgress{' '}
        <A href="https://github.com/rstacruz/nprogress/blob/master/nprogress.css">styles</A> to your project. You can do
        this using the CDN version.
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
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/vue2'
            `,
          },
          {
            name: 'Vue 3',
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
        Next, let's add a <Code>finish</Code> event listener to hide the progress bar when the page visit finishes.
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
        To implement the delay behaviour, we'll use the <Code>setTimeout</Code> and <Code>clearTimeout</Code> functions.
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
            name: 'Vue 2',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/vue2'\n
              let timeout = null\n
              router.on('start', () => {
                timeout = setTimeout(() => NProgress.start(), 250)
              })\n
              router.on('progress', (event) => {
                if (NProgress.isStarted() && event.detail.progress.percentage) {
                  NProgress.set((event.detail.progress.percentage / 100) * 0.9)
                }
              })\n
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
            name: 'Vue 3',
            language: 'js',
            code: dedent`
              import NProgress from 'nprogress'
              import { router } from '@inertiajs/vue3'\n
              let timeout = null\n
              router.on('start', () => {
                timeout = setTimeout(() => NProgress.start(), 250)
              })\n
              router.on('progress', (event) => {
                if (NProgress.isStarted() && event.detail.progress.percentage) {
                  NProgress.set((event.detail.progress.percentage / 100) * 0.9)
                }
              })\n
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
              import { router } from '@inertiajs/react'\n
              let timeout = null\n
              router.on('start', () => {
                timeout = setTimeout(() => NProgress.start(), 250)
              })\n
              router.on('progress', (event) => {
                if (NProgress.isStarted() && event.detail.progress.percentage) {
                  NProgress.set((event.detail.progress.percentage / 100) * 0.9)
                }
              })\n
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
              import { router } from '@inertiajs/svelte'\n
              let timeout = null\n
              router.on('start', () => {
                timeout = setTimeout(() => NProgress.start(), 250)
              })\n
              router.on('progress', (event) => {
                if (NProgress.isStarted() && event.detail.progress.percentage) {
                  NProgress.set((event.detail.progress.percentage / 100) * 0.9)
                }
              })\n
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
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
