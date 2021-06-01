import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Li, P, Ul } from '@/Components'

const meta = {
  title: 'inertia-vue3@0.4.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@0.4.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 25, 2021</div>
      <Ul>
        <Li>
          Disable page attribute inheritance (<A href="https://github.com/inertiajs/inertia/pull/681">#681</A>).
        </Li>
        <Li>
          Add name to the <Code>{'<inertia-link>'}</Code> component (
          <A href="https://github.com/inertiajs/inertia/pull/638">#638</A>).
        </Li>
        <Li>
          Fix <Code>{'<inertia-link>'}</Code> component to not change the URL path (
          <A href="https://github.com/inertiajs/inertia/pull/556">#556</A>).
        </Li>
        <Li>
          Add <Code>isDirty</Code> property to the form helper (
          <A href="https://github.com/inertiajs/inertia/pull/660">#660</A>).
        </Li>
        <Li>
          Reset form helper on visit exception (<A href="https://github.com/inertiajs/inertia/pull/682">#682</A>).
        </Li>
        <Li>
          Fix bug with using custom <Code>onCancelToken</Code> callbacks in form helper (
          <A href="https://github.com/inertiajs/inertia/pull/645">#645</A>).
        </Li>
        <Li>Update adapter to be SSR compatible.</Li>
        <Li>
          Update TypeScript definitions (<A href="https://github.com/inertiajs/inertia/pull/661">#661</A>).
        </Li>
        <Li>
          Add new <Code>{'<inertia-head>'}</Code> component (
          <A href="https://github.com/inertiajs/inertia/commit/2753c8a5f98854057641f9df8e10e1fbd7b0d8b3#diff-02c5d1ad73d8251389d94cdfd89c432dcac44926214668f513ca6a6abaa3c76c">
            commit
          </A>
          ).
        </Li>
        <Li>
          Make page props available to persistent layouts as props (
          <A href="https://github.com/inertiajs/inertia/pull/602">#602</A>).
        </Li>
        <Li>
          Remove <Code>transformProps()</Code> and <Code>resolveErrors()</Code> (
          <A href="https://github.com/inertiajs/inertia/pull/693">#693</A>).
        </Li>
      </Ul>
      <P>
        This is a breaking change that requires also updating to{' '}
        <A href="/releases/inertia-0.9.0-2021-05-25">inertia@0.9.0</A>.
      </P>
      <H2 id="new-inertia-head-component">New Inertia head component</H2>
      <P>
        This release adds a new <Code>{'<inertia-head>'}</Code> component, intended to make working with the document{' '}
        <Code>{'<head>'}</Code> easier. This is a first-class alternative to libraries like Vue Meta. It works both in
        the browser, and also when server-side rendering (SSR).
      </P>
      <P>
        To use it, add the <Code>{'<inertia-head>'}</Code> component to your pages:
      </P>
      <CodeBlock
        language="html"
        children={dedent`
          <inertia-head>
            <title>Your page title</title>
            <meta name="description" content="Your page description">
          </inertia-head>
        `}
      />
      <P>
        See the <A href="/title-and-meta">title & meta page</A> for full documentation.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
