import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, H2, Layout, Li, Ol, P, Ul } from '@/Components'

const meta = {
  title: 'inertia@v0.6.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.6.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 27, 2020</div>
      <H2>Changes</H2>
      <Ul>
        <Li>
          Fixed issue where the <Code>finish</Code> event was firing in the wrong sequence for cancelled visits (
          <A href="https://github.com/inertiajs/inertia/pull/290">#290</A>).
        </Li>
        <Li>
          Added new <Code>before</Code> global event and <Code>onBefore()</Code> event callback (
          <A href="https://github.com/inertiajs/inertia/pull/290">#290</A>).
        </Li>
        <Li>
          Removed the ability to cancel the <Code>start</Code> global event and <Code>onStart()</Code> event callback (
          <A href="https://github.com/inertiajs/inertia/pull/290">#290</A>).
        </Li>
        <Li>
          Updated the <Code>Inertia.reload()</Code> method to always preserve the state and scroll position (
          <A href="https://github.com/inertiajs/inertia/pull/293">#293</A>).
        </Li>
        <Li>
          Added a deprecation notice for <Code>Inertia.replace()</Code> method (
          <A href="https://github.com/inertiajs/inertia/pull/294">#294</A>).
        </Li>
      </Ul>
      <H2>Start event is no longer cancelable (breaking change)</H2>
      <P>
        Previously, to cancel a visit, you would call <Code>event.preventDefault()</Code> from a <Code>start</Code>{' '}
        global event listener. You could also cancel a visit by returning <Code>false</Code> from the{' '}
        <Code>onStart()</Code> event callback. This is no longer possible with the <Code>start</Code> event. Instead,
        you can now do this with the <Code>before</Code> event:
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          import { Inertia } from '@inertiajs/inertia'\n
          Inertia.on('before', (event) => {
            return confirm('Are you sure you want to navigate away?')
          })
        `}
      />
      <P>
        This can also be done from the new <Code>onBefore()</Code> event callback:
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          Inertia.delete(\`/users/\${user.id}\`, {
            onBefore: () => confirm('Are you sure you want to delete this user?'),
          })
        `}
      />
      <P>As well as from the Inertia link:</P>
      <CodeBlock
        language="twig"
        children={dedent`
          <inertia-link :href="\`/users/\${user.id}\`" method="post" @before="confirmDelete">Delete user<inertia-link>
        `}
      />
      <H2>Inertia.reload() now always preserves state and scroll position (low risk)</H2>
      <P>
        The <Code>Inertia.reload()</Code> method exists as a shortcut to reload a page's props, similar to how{' '}
        <Code>location.reload()</Code> works. However, unlike <Code>location.reload()</Code>, this method was previously
        not preserving the scroll position. This release updates this method to now always preserve the scroll position.
        We've also updated the method to always preserve the component state. Previously this method had{' '}
        <Code>preserveState</Code> set <Code>true</Code> by default, but it could be overwritten via the{' '}
        <Code>options</Code>. This is no longer possible.
      </P>
      <P>
        The goal here is to underline the purpose of this method, which is to reload the current URL while maintaining
        the current component state (<Code>preserveState: true</Code>) as well as the current scroll position (
        <Code>preserveScroll: true</Code>). If you need different behaviour than this, simply use one of the other
        methods, such as <Code>Inertia.get()</Code>, and manually set these options.
      </P>
      <H2>Inertia.replace() deprecated</H2>
      <P>
        This release deprecates the <Code>Inertia.replace()</Code> method. This method has numerous issues with it:
      </P>
      <Ol>
        <Li>
          This method signature is different than the other methods, in that it doesn't have a second argument for{' '}
          <Code>data</Code>.
        </Li>
        <Li>
          This method arbitrarily sets <Code>preserveState: true</Code>, without any indication that it's doing this.
        </Li>
        <Li>
          The amount of times you need to set <Code>replace: true</Code> (the whole purpose of this method) is actually
          very rare, since Inertia automatically does this for visits made to the same URL.
        </Li>
      </Ol>
      <P>
        For these reasons, we have deprecated it and will be removing it in an upcoming release. Here's how to update
        your apps:
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          //  Before
          Inertia.replace('/users', { data: { search: 'John' } })\n
          // If you're visiting the same endpoint:
          Inertia.get('/users', { search: 'John' })\n
          // If you're visiting a different endpoint:
          Inertia.get('/users', { search: 'John' }, { replace: true })\n
          // If you need state preserved:
          Inertia.get('/users', { search: 'John' }, { preserveState: true })
        `}
      />
      <H2>Progress improvements (breaking change)</H2>
      <P>
        This release corresponds to the <Code>@inertiajs/progress</Code> version <Code>0.2.0</Code> release, which
        updates the progress library to take advantage of the improved "finish" event handling. If you're using{' '}
        <Code>@inertiajs/progress</Code>, be sure to upgrade to <Code>^0.2.0</Code> at the same time, otherwise you'll
        run into issues with the progress bar not being removed properly.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
