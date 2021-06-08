import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Fix <Code>InertiaLink</Code> component to not change the URL path (
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
        Fix "Can't perform a React state update on an unmounted component" error in form helper (
        <A href="https://github.com/inertiajs/inertia/pull/680">#680</A>).
      </Li>
      <Li>
        Fix bug with using custom <Code>onCancelToken</Code> callbacks in form helper (
        <A href="https://github.com/inertiajs/inertia/pull/645">#645</A>).
      </Li>
      <Li>Update adapter to be SSR compatible.</Li>
      <Li>
        Update TypeScript definitions (<A href="https://github.com/inertiajs/inertia/pull/677">#677</A>).
      </Li>
      <Li>
        Add new <Code>InertiaHead</Code> component (<A href="https://github.com/inertiajs/inertia/pull/688">#688</A>).
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
      This release adds a new <Code>InertiaHead</Code> component, intended to make working with the document{' '}
      <Code>{'<head>'}</Code> easier. This is a first-class alternative to libraries like React Helmet. It works both in
      the browser, and also when server-side rendering (SSR).
    </P>
    <P>
      To use it, add the <Code>InertiaHead</Code> component to your pages:
    </P>
    <CodeBlock
      language="jsx"
      children={dedent`
        import { InertiaHead } from '@inertiajs/inertia-react'\n
        <InertiaHead>
          <title>Your page title</title>
          <meta name="description" content="Your page description" />
        </InertiaHead>
      `}
    />
    <P>
      See the <A href="/title-and-meta">title & meta page</A> for full documentation.
    </P>
  </>
)
