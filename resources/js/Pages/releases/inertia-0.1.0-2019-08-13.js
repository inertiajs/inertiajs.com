import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Li, P, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.1.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.1.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 13, 2019</div>
      <P>
        So yes, to answer your question, Inertia.js is now safe to use in production. 🎉 Of course, we're still working
        toward a 1.0 release, and the API is subject to change. However, you can now lock in your dependency versions
        and use the library safely.
      </P>
      <P>
        You'll need to update your applications. Please review the instructions below. You can also see an example of
        this update on the Ping CRM demo app{' '}
        <A href="https://github.com/inertiajs/pingcrm/commit/14352710ad577e45062a49d19a6a6d441e958fb6">here</A>.
      </P>
      <H2>1. Update your JavaScript dependencies</H2>
      <P>First, you'll need to update your existing dependency to use the new NPM package name:</P>
      <Ul>
        <Li>
          <Code>inertia/inertia-vue</Code> becomes <Code>@inertiajs/inertia-vue</Code>
        </Li>
        <Li>
          <Code>inertia/inertia-react</Code> becomes <Code>@inertiajs/inertia-react</Code>
        </Li>
      </Ul>
      <P>
        Be sure to lock these in at <Code>^0.1.0</Code>. For example:
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          "@inertiajs/inertia-vue": "^0.1.0",
        `}
      />
      <P>
        Second, you need to add <Code>@inertiajs/inertia</Code> as a dependency as well. It's no longer automatically
        included with the adapters.
      </P>
      <CodeBlock
        language="sh"
        children={dedent`
          npm install @inertiajs/inertia
        `}
      />
      <H2>2. Update your imports</H2>
      <P>We've removed all default exports and are now using named exports.</P>
      <CodeBlock
        language="js"
        children={dedent`
          // Before
          import Inertia from 'inertia-vue'
          import Inertia from 'inertia-react'\n
          // After
          import { InertiaApp } from '@inertiajs/inertia-vue'
          import { InertiaApp } from '@inertiajs/inertia-react'
        `}
      />
      <P>If you're using Vue, you'll need to update the plugin:</P>
      <CodeBlock
        language="js"
        children={dedent`
          // Before
          Vue.use(Inertia)\n
          // After
          Vue.use(InertiaApp)
        `}
      />
      <P>If you were previously importing Inertia from one of the adapters, you now need to import that directly.</P>
      <CodeBlock
        language="js"
        children={dedent`
          // Before
          import { Inertia } from 'inertia-vue'
          import { Inertia } from 'inertia-react'\n
          // After
          import { Inertia } from 'inertia'
        `}
      />
      <H2>3. Update your PHP dependencies</H2>
      <P>
        If you are currently using the <Code>inertiajs/inertia-laravel</Code> adapter, be sure to set your version to{' '}
        <Code>^0.1</Code>. This library has now been tagged as well. Note, there were some breaking changes made
        recently to how <Code>Inertia::share()</Code> works.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
