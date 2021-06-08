import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Updated form helper to automatically remember form data (
        <A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
      </Li>
      <Li>
        Updated form helper to be reactive (<A href="https://github.com/inertiajs/inertia/issues/432">#432</A>),{' '}
        <A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
      </Li>
      <Li>
        Added new form helper options (<A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
      </Li>
      <Li>
        Fixed bug with remembering <Code>null</Code> form data (
        <A href="https://github.com/inertiajs/inertia/issues/417">#417</A>),{' '}
        <A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
      </Li>
      <Li>
        Fixed bug with accessing form state in visit callbacks (
        <A href="https://github.com/inertiajs/inertia/pull/410">#410</A>).
      </Li>
      <Li>
        Fixed bug with deep cloning default form data (
        <A href="https://github.com/inertiajs/inertia/issues/455">#455</A>),{' '}
        <A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
      </Li>
      <Li>
        Fixed bug with remembering array form values (<A href="https://github.com/inertiajs/inertia/issues/552">#552</A>
        ), <A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
      </Li>
      <Li>
        Fixed bug with resetting array form values (<A href="https://github.com/inertiajs/inertia/issues/553">#553</A>
        ), <A href="https://github.com/inertiajs/inertia/pull/575">#575</A>).
      </Li>
      <Li>
        Added typescript definitions (<A href="https://github.com/inertiajs/inertia/pull/502">#502</A>).
      </Li>
      <Li>
        Fixed bug with self-closing Inertia links (<A href="https://github.com/inertiajs/inertia/pull/306">#306</A>).
      </Li>
    </Ul>
    <H2>Automatic remembering of form data</H2>
    <P>The form helper now automatically remembers form data and errors. Previously you had to do this manually:</P>
    <CodeBlock
      language="js"
      children={dedent`
        // Options API
        remember: 'form'\n
        // Composition API
        useRemember(useForm({ ... }))
      `}
    />
    <P>Doing this automatically is not only easier, but it's also more in line with default browser behaviour.</P>
    <P>
      If you need to disable this behaviour, you can do that using the new <Code>remember</Code> form helper option (see
      below).
    </P>
    <H2>Form helper options</H2>
    <P>
      The form helper now accepts a second "options" argument. This lets you set a form <Code>key</Code>, needed if
      there are multiple forms on the page. You can also disable the automatic remember behaviour by setting the{' '}
      <Code>remember</Code> option to <Code>false</Code>.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        let form = useForm({
          email: null,
          password: null,
        }, {
          key: 'login',
          remember: false,
        })
      `}
    />
    <H2>Fixed issue with accessing form state in visit callbacks</H2>
    <P>
      This release fixes a tricky, edge case issue with the form helper, where the <Code>preserveState</Code> and{' '}
      <Code>preserveScroll</Code> visit callbacks didn't have access to the updated form state until it was too late.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        preserveScroll: () => this.form.hasErrors, // old form values
        preserveState: () => this.form.hasErrors,  // old form values
      `}
    />
    <P>
      The workaround was to use the <Code>page</Code> object passed to these callbacks instead. Unfortunately, this is
      kind of verbose.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        preserveScroll: (page) => Object.keys(page.props.errors).length > 0,
        preserveState: (page) => Object.keys(page.props.errors).length > 0,
      `}
    />
    <P>
      This issue has now been corrected, and you can reference the form helper methods and properties directly within
      these callbacks without issue.
    </P>
  </>
)
