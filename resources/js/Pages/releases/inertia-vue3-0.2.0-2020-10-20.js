import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Li, P, Ul } from '@/Components'

const meta = {
  title: 'inertia-vue3@v0.2.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.2.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 20, 2020</div>
      <H2>Changes</H2>
      <Ul>
        <Li>
          Add Inertia link <Code>as</Code> option to render the component as a different element (
          <A href="https://github.com/inertiajs/inertia/pull/271">#271</A>).
        </Li>
        <Li>
          Update Inertia link <Code>preserveState</Code> default to be based on the method (
          <A href="https://github.com/inertiajs/inertia/pull/263">#263</A>).
        </Li>
        <Li>
          Update Inertia link to merge data into the URL query string (<Code>href</Code>) for <Code>GET</Code> requests
          (<A href="https://github.com/inertiajs/inertia/pull/264">#264</A>).
        </Li>
      </Ul>
      <H2>Deprecations</H2>
      <P>
        Inertia now shows a console warning if you create an Inertia link that uses a method other than <Code>GET</Code>{' '}
        and you also don't change the link element to something other than an <Code>{'<a>'}</Code> tag. This is due to
        accessibility issues that come with using anchor links for non-GET requests, which you can read more about here:
        #268.
      </P>
      <P>
        To hide this console warning, use the new <Code>as</Code> option to set a more appropriate element, such as a{' '}
        <Code>{'<button>'}</Code>. For example:
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
          - <inertia-link href="/logout" method="post">Logout</inertia-link>
          + <inertia-link href="/logout" method="post" as="button" type="button">Logout</inertia-link>
        `}
      />
      <H2>Breaking changes</H2>
      <P>
        This release depends on changes made to the internals of Inertia, which requires updating{' '}
        <Code>@inertiajs/inertia</Code> to <Code>^0.5.0</Code>. The peer dependencies have been updated to reflect this.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
