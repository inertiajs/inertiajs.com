import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <H2>Automatic FormData conversion</H2>
    <P>
      Previously to upload files via with Inertia, you had to manually convert your data from an object to a{' '}
      <Code>FormData</Code> object, since that's what's required to submit a <Code>multipart/form-data</Code> request.
      This process was particularly painful, as it meant manually converting booleans, null values, and more to a{' '}
      <Code>FormData</Code> compatible version.
    </P>
    <P>
      Inertia now handles this all for you automatically. Simply pass your data as an object, and Inertia will detect if
      any files are present (even nested files), and it will automatically convert the data to a <Code>FormData</Code>{' '}
      object.
    </P>
    <CodeBlock
      language="diff"
      children={dedent`
        - const data = new FormData()
        - data.append('name', form.name || '')
        - data.append('email', form.email || '')
        - data.append('is_admin', form.is_admin ? '1' : '0')
        - data.append('photo', form.photo || '')\n
        + Inertia.post('/users', data)
      `}
    />
    <H2>Improved validation error handling - BREAKING CHANGE ⚠️</H2>
    <P>
      This release of Inertia improves on how validation errors are handled. In particular, the <Code>onSuccess</Code>{' '}
      callback is no longer called when validation errors are present. We've also added a new <Code>onError</Code>{' '}
      callback, which runs when validation errors are present.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        Inertia.post('/users', data, {
          onSuccess() {
            // Only called when no validation errors are present
          },
          onError(errors) {
            // Called when validation errors are present
          },
        })
      `}
    />
    <P>
      By default, Inertia detects if validation errors are present by looking at the <Code>$page.prop.errors</Code>{' '}
      property. This can be customized using a new (optional) <Code>resolveErrors</Code> setting, applied at the adapter
      level.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        new Vue({
          render: (h) =>
            h(App, {
              props: {
                initialPage: JSON.parse(el.dataset.page),
                resolveComponent: (name) => require(\`./Pages/\${name}\`).default,
                resolveErrors: (page) => page.props.errors || {}, // Customize if needed
              },
            }),
        }).$mount(el)
      `}
    />
    <P>
      To maintain parity between the visit callbacks and the global events, we've repurposed the existing global{' '}
      <Code>error</Code> event for validation errors, and the previous global <Code>error</Code> event has been renamed
      to <Code>exception</Code>, which in hindsight is a more appropriate name anyway.
    </P>
    <P>
      Finally, we've added a new <Code>errorBag</Code> option when making Inertia visits. The purpose of this feature is
      to allow you to automatically scope the validation errors returned from the server within a key you specify. For
      example, instead of getting <Code>$page.props.errors</Code>, you can get{' '}
      <Code>$page.props.loginCredentialsForm.errors</Code>. This can be really helpful in situations where you have
      multiple forms on a single page, and don't want validation errors from one form to leak into another.
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        Inertia.put('/profile', data, {
          errorBag: loginCredentialsForm,
        })
      `}
    />
    <P>
      Note that your server-side adapter must also support this feature in order for this to work. The Laravel adapter
      has already been updated to support this, so be sure to upgrade to{' '}
      <A href="https://github.com/inertiajs/inertia-laravel/releases/tag/v0.3.5">version 0.3.5</A>.
    </P>
    <H2>Adapter upgrade required - BREAKING CHANGE ⚠️</H2>
    <P>
      When upgrading to this release, be sure to also upgrade your Vue/React/Svelte adapter to the following version:
    </P>
    <Ul>
      <Li>
        <Code>"@inertiajs/inertia-react": "0.5.0"</Code>
      </Li>
      <Li>
        <Code>"@inertiajs/inertia-svelte": "0.6.0"</Code>
      </Li>
      <Li>
        <Code>"@inertiajs/inertia-vue": "0.5.0"</Code>
      </Li>
      <Li>
        <Code>"@inertiajs/inertia-vue3": "0.3.0"</Code>
      </Li>
    </Ul>
  </>
)
