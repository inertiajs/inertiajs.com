import React from 'react'
import { A, Code, H1, Layout, Li, P, Ul } from '@/Components'

const meta = {
  title: 'inertia-react@0.6.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@0.6.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 25, 2021</div>
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
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
