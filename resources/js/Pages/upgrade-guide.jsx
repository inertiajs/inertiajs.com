import { A, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Upgrade guide',
  links: [
    { url: '#whats-new', name: "What's new" },
    { url: '#upgrade-dependencies', name: 'Upgrade dependencies' },
    { url: '#dropped-vue-2-support', name: 'Dropped Vue 2 support' },
  ],
}

export default function () {
  return (
    <>
      <H1>Upgrade guide for v2.0</H1>
      <Notice>
        Inertia.js v2.0 is still in beta. Please report bugs on{' '}
        <A color="orange" href="https://github.com/inertiajs/inertia">
          GitHub
        </A>
        .
      </Notice>
      <H2 id="whats-new">What's new</H2>
      <P>Add...</P>
      <H2 id="whats-new">Upgrading</H2>
      <P>Update NPM packages...</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/vue3@next
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/react@next
            `,
          },
          {
            name: 'Svelte',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/svelte@next
            `,
          },
        ]}
      />
      <P>Update Laravel...</P>
      <H2>Dropped Vue 2 support</H2>
      <P>Add...</P>
    </>
  )
}
