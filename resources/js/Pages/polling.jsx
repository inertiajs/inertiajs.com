import { Code, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Polling',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#throttling', name: 'Throttling' },
  ],
}

export default function () {
  return (
    <>
      <H1>Polling</H1>
      <H2>Poll helper</H2>
      <P>
        Polling your server for new information on the current page is common, so Inertia provides a poll helper
        designed to help reduce the amount of boilerplate code. In addition, the poll helper will automatically stop
        polling when the page is unmounted.
      </P>
      <P>The only required argument is the polling interval in milliseconds.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { usePoll } from '@inertiajs/vue3'

              usePoll(2000)
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { usePoll } from '@inertiajs/react'

              usePoll(2000)
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { usePoll } from '@inertiajs/svelte'

              usePoll(2000)
            `,
          },
        ]}
      />
      <P>
        If you need to pass additional request options to the poll helper, you can pass any of the{' '}
        <Code>router.reload</Code> options as the second parameter.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
              import { usePoll } from '@inertiajs/vue3'

              usePoll(2000, {
                onStart() {
                    console.log('Polling request started')
                },
                onFinish() {
                    console.log('Polling request finished')
                }
              })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { usePoll } from '@inertiajs/react'

              usePoll(2000, {
                onStart() {
                    console.log('Polling request started')
                },
                onFinish() {
                    console.log('Polling request finished')
                }
              })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { usePoll } from '@inertiajs/svelte'

              usePoll(2000, {
                onStart() {
                    console.log('Polling request started')
                },
                onFinish() {
                    console.log('Polling request finished')
                }
              })
            `,
          },
        ]}
      />
      <P>
        If you'd like more control over the polling behavior, the poll helper provides <Code>stop</Code> and{' '}
        <Code>start</Code>
        methods that allow you to manually start and stop polling. You can pass the <Code>autoStart: false</Code> option
        to the poll helper to prevent it from automatically starting polling when the component is mounted.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
            <script setup>
            import { usePoll } from '@inertiajs/vue3'

            const { start, stop } = usePoll(2000, {}, {
                autoStart: false,
            })
            </script>

            <template>
                <button @click="start">Start polling</button>
                <button @click="stop">Stop polling</button>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
              import { usePoll } from '@inertiajs/react'

              export default () => {
                const { start, stop } = usePoll(2000, {}, {
                    autoStart: false,
                })

                return (
                    <div>
                        <button onClick={start}>Start polling</button>
                        <button onClick={stop}>Stop polling</button>
                    </div>
                )
              }
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { usePoll } from '@inertiajs/svelte'

              const { start, stop } = usePoll(2000, {}, {
                autoStart: false,
              })
            `,
          },
        ]}
      />

      <H2>Throttling</H2>
      <P>
        By default, the poll helper will throttle requests by 90% when the browser tab is in the background. If you'd
        like to disable this behavior, you can pass the <Code>keepAlive</Code> option to the poll helper.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            import { usePoll } from '@inertiajs/vue3'

            usePoll(2000, {}, {
                keepAlive: true,
            })
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { usePoll } from '@inertiajs/react'

            usePoll(2000, {}, {
                keepAlive: true,
            })
            `,
          },
          {
            name: 'Svelte',
            language: 'js',
            code: dedent`
              import { usePoll } from '@inertiajs/svelte'

              usePoll(2000, {}, {
                keepAlive: true,
              })
            `,
          },
        ]}
      />
    </>
  )
}
