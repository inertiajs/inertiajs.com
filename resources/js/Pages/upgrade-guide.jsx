import { A, Code, CodeBlock, H1, H2, Notice, P, Strong, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Upgrade guide',
  links: [
    { url: '#whats-new', name: "What's new" },
    { url: '#new-dependencies', name: 'New dependencies' },
    { url: '#renamed-imports', name: 'Renamed imports' },
    { url: '#progress', name: 'Progress indicator' },
    { url: '#setup-arguments', name: 'Setup arguments' },
    { url: '#simplified-use-page', name: 'Simplified usePage' },
  ],
}

export default function () {
  return (
    <>
      <H1>Upgrade guide</H1>
      <P>Inertia.js v1.0 has been released! 🥳</P>
      <H2 id="whats-new">What's new</H2>
      <P>
        This release focuses on simplifying the overall architecture of the project with the goal of making Inertia
        easier to maintain and easier to use.
      </P>
      <P>
        It includes a number of breaking changes, mostly related to package names and updated named exports. This guide
        explains how to upgrade your project to v1.0.
      </P>
      <P>
        For a complete list of all the changes, see the{' '}
        <A href="https://github.com/inertiajs/inertia/releases/tag/v1.0.0">release notes</A>.
      </P>
      <H2>New dependencies</H2>
      <P>
        To use previous Inertia releases, you had to install a number of libraries, including the core library (
        <Code>@inertiajs/inertia</Code>), the adapter of your choice (
        <Code>@inertiajs/inertia-vue|vue3|react|svelte</Code>), the progress library (<Code>@inertiajs/progress</Code>
        ), and if you were using server-side rendering, the server library (<Code>@inertiajs/server</Code>).
      </P>
      <P>
        <Strong>Moving forward you are now only required to install a single library</Strong> — the adapter of your
        choice (Vue, React, or Svelte), and all other core libraries are automatically installed for you.
      </P>
      <P>
        To get started, remove <em>all</em> of the old Inertia libraries.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'bash',
            code: dedent`
              npm remove @inertiajs/inertia @inertiajs/inertia-vue @inertiajs/progress @inertiajs/server
            `,
          },
          {
            name: 'Vue 3',
            language: 'bash',
            code: dedent`
              npm remove @inertiajs/inertia @inertiajs/inertia-vue3 @inertiajs/progress @inertiajs/server
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm remove @inertiajs/inertia @inertiajs/inertia-react @inertiajs/progress @inertiajs/server
            `,
          },
          {
            name: 'Svelte',
            language: 'bash',
            code: dedent`
              npm remove @inertiajs/inertia @inertiajs/inertia-svelte @inertiajs/progress @inertiajs/server
            `,
          },
        ]}
      />
      <P>
        Next, install the new Inertia adapter of your choice. The new adapter libraries have been renamed, and no longer
        include <Code>inertia-</Code> in them.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/vue2
            `,
          },
          {
            name: 'Vue 3',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/vue3
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/react
            `,
          },
          {
            name: 'Svelte',
            language: 'bash',
            code: dedent`
              npm install @inertiajs/svelte
            `,
          },
        ]}
      />
      <H2>Renamed imports</H2>
      <P>
        Next, update all the Inertia related imports in your project to use the new adapter library name. All imports
        are now available from the adapter library, meaning you no longer import anything from the Inertia core library,
        progress library, or server library.
      </P>
      <P>
        Additionally, some exports have been renamed and previously deprecated exports have been removed. For example,
        the <Code>Inertia</Code> export has been renamed to <Code>router</Code>.
      </P>
      <P>Here is a complete list of all the import changes:</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'diff',
            code: dedent`
              - import { Inertia } from '@inertiajs/inertia'
              + import { router } from '@inertiajs/vue2'

              - import createServer from '@inertiajs/server'
              + import createServer from '@inertiajs/vue2/server'

              - import { createInertiaApp } from '@inertiajs/inertia-vue'
              - import { App } from '@inertiajs/inertia-vue'
              - import { app } from '@inertiajs/inertia-vue'
              - import { InertiaApp } from '@inertiajs/inertia-vue'
              - import { plugin } from '@inertiajs/inertia-vue'
              + import { createInertiaApp } from '@inertiajs/vue2'

              - import { Head } from '@inertiajs/inertia-vue'
              - import { InertiaHead } from '@inertiajs/inertia-vue'
              + import { Head } from '@inertiajs/vue2'

              - import { Link } from '@inertiajs/inertia-vue'
              - import { link } from '@inertiajs/inertia-vue'
              - import { InertiaLink } from '@inertiajs/inertia-vue'
              + import { Link } from '@inertiajs/vue2'
            `,
          },
          {
            name: 'Vue 3',
            language: 'diff',
            code: dedent`
              - import { Inertia } from '@inertiajs/inertia'
              + import { router } from '@inertiajs/vue3'

              - import createServer from '@inertiajs/server'
              + import createServer from '@inertiajs/vue3/server'

              - import { createInertiaApp } from '@inertiajs/inertia-vue3'
              - import { App } from '@inertiajs/inertia-vue3'
              - import { app } from '@inertiajs/inertia-vue3'
              - import { plugin } from '@inertiajs/inertia-vue3'
              - import { InertiaApp } from '@inertiajs/inertia-vue3'
              + import { createInertiaApp } from '@inertiajs/vue3'

              - import { usePage } from '@inertiajs/inertia-vue3'
              + import { usePage } from '@inertiajs/vue3'

              - import { useForm } from '@inertiajs/inertia-vue3'
              + import { useForm } from '@inertiajs/vue3'

              - import { useRemember } from '@inertiajs/inertia-vue3'
              + import { useRemember } from '@inertiajs/vue3'

              - import { Head } from '@inertiajs/inertia-vue3'
              - import { InertiaHead } from '@inertiajs/inertia-vue3'
              + import { Head } from '@inertiajs/vue3'

              - import { Link } from '@inertiajs/inertia-vue3'
              - import { link } from '@inertiajs/inertia-vue3'
              - import { InertiaLink } from '@inertiajs/inertia-vue3'
              + import { Link } from '@inertiajs/vue3'
            `,
          },
          {
            name: 'React',
            language: 'diff',
            code: dedent`
              - import { Inertia } from '@inertiajs/inertia'
              + import { router } from '@inertiajs/react'

              - import createServer from '@inertiajs/server'
              + import createServer from '@inertiajs/react/server'

              - import { createInertiaApp } from '@inertiajs/inertia-react'
              - import { App } from '@inertiajs/inertia-react'
              - import { app } from '@inertiajs/inertia-react'
              - import { InertiaApp } from '@inertiajs/inertia-react'
              + import { createInertiaApp } from '@inertiajs/react'

              - import { usePage } from '@inertiajs/inertia-react'
              + import { usePage } from '@inertiajs/react'

              - import { useForm } from '@inertiajs/inertia-react'
              + import { useForm } from '@inertiajs/react'

              - import { useRemember } from '@inertiajs/inertia-react'
              - import { useRememberedState } from '@inertiajs/inertia-react'
              + import { useRemember } from '@inertiajs/react'

              - import { Head } from '@inertiajs/inertia-react'
              - import { InertiaHead } from '@inertiajs/inertia-react'
              + import { Head } from '@inertiajs/react'

              - import { Link } from '@inertiajs/inertia-react'
              - import { link } from '@inertiajs/inertia-react'
              - import { InertiaLink } from '@inertiajs/inertia-react'
              + import { Link } from '@inertiajs/react'
            `,
          },
          {
            name: 'Svelte',
            language: 'diff',
            code: dedent`
              - import { Inertia } from '@inertiajs/inertia'
              + import { router } from '@inertiajs/svelte'

              - import { createInertiaApp } from '@inertiajs/inertia-svelte'
              - import { App } from '@inertiajs/inertia-svelte'
              - import { app } from '@inertiajs/inertia-svelte'
              - import { InertiaApp } from '@inertiajs/inertia-svelte'
              + import { createInertiaApp } from '@inertiajs/svelte'

              - import { page } from '@inertiajs/inertia-svelte'
              + import { page } from '@inertiajs/svelte'

              - import { inertia } from '@inertiajs/inertia-svelte'
              + import { inertia } from '@inertiajs/svelte'

              - import { useForm } from '@inertiajs/inertia-svelte'
              + import { useForm } from '@inertiajs/svelte'

              - import { useRemember } from '@inertiajs/inertia-svelte'
              - import { remember } from '@inertiajs/inertia-svelte'
              + import { remember } from '@inertiajs/svelte'

              - import { Link } from '@inertiajs/inertia-svelte'
              - import { link } from '@inertiajs/inertia-svelte'
              - import { InertiaLink } from '@inertiajs/inertia-svelte'
              + import { Link } from '@inertiajs/svelte'

            `,
          },
        ]}
      />
      <Notice>
        It is no longer possible to manually configure Inertia using the <Code color="orange">App</Code> export.
        Instead, you should use the <Code color="orange">createInertiaApp()</Code> helper. See the{' '}
        <A href="/client-side-setup#initialize-the-inertia-app">client-side setup</A> documentation for more
        information.
      </Notice>
      <H2>Progress</H2>
      <P>
        Previously, the progress indicator was available as a separate plugin (<Code>@inertiajs/progress</Code>). It is
        now installed and enabled by default.
      </P>
      <P>If you haven't yet, remove the old progress library.</P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 2',
            language: 'bash',
            code: dedent`
              npm remove @inertiajs/progress
            `,
          },
          {
            name: 'Vue 3',
            language: 'bash',
            code: dedent`
              npm remove @inertiajs/progress
            `,
          },
          {
            name: 'React',
            language: 'bash',
            code: dedent`
              npm remove @inertiajs/progress
            `,
          },
          {
            name: 'Svelte',
            language: 'bash',
            code: dedent`
              npm remove @inertiajs/progress
            `,
          },
        ]}
      />
      <P>
        Next, remove the <Code>InertiaProgress</Code> import and <Code>InertiaProgress.init()</Code> call, as they are
        no longer required.
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
          - import { InertiaProgress } from '@inertiajs/progress'

          - InertiaProgress.init()
        `}
      />
      <P>
        Finally, if you have defined any progress customizations, you can move them to the <Code>progress</Code>{' '}
        property of the <Code>createInertiaApp()</Code> helper.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          createInertiaApp({
            progress: {
              color: '#29d',
            },
            // ...
          })
        `}
      />
      <P>
        If you're using a custom progress indicator, you can disable the default progress indicator by setting the{' '}
        <Code>progress</Code> property to <Code>false</Code>.
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
      <H2>Setup arguments</H2>
      <P>
        We've removed the previously deprecated lowercase <Code>app</Code> argument from the <Code>setup()</Code> method
        in <Code>createInertiaApp()</Code>. Use <Code>App</Code> instead.
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
          createInertiaApp({
            // ...
        -   setup({ app, props }) {
        +   setup({ App, props }) {
              // ...
            },
          })
        `}
      />
      <H2>Simplified usePage</H2>
      <P>
        In the Vue 3 adapter, we simplified the <Code>usePage()</Code> hook to no longer require adding{' '}
        <Code>.value</Code> after the <Code>component</Code>, <Code>props</Code>, <Code>url</Code> and{' '}
        <Code>version</Code> properties.
      </P>
      <P>
        If you're using the <Code>usePage()</Code> hook, remove all instances of <Code>.value</Code>.
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
          import { computed } from 'vue'

        - const appName = computed(() => usePage().props.value.appName)
        + const appName = computed(() => usePage().props.appName)
        `}
      />
    </>
  )
}
