import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, P } from '@/Components'

export default release(
  <>
    <P>
      Inertia.js now automatically shares validation errors (
      <A href="https://github.com/inertiajs/inertia-laravel/pull/135">#135</A>) via the <Code>errors</Code> prop.
    </P>
    <P>Previously you had to manually share these in your app service provider, like this:</P>
    <CodeBlock
      language="php"
      children={dedent`
        Inertia::share([
            'errors' => function () {
                return Session::get('errors')
                    ? Session::get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
        ]);
      `}
    />
    <P>
      However, unlike the above implementation, the automatically shared errors are flattened to one error per field:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        errors: {
          name: 'The name field is required.',
          email: 'The email field is required.',
        }
      `}
    />
    <P>
      This is done to prevent having to always pick the first error from an array (<Code>errors.name[0]</Code>). We
      decided to do it this way based on feedback from the community{' '}
      <A href="https://twitter.com/reinink/status/1300516500105842689">via Twitter</A>).
    </P>
    <P>
      This is a non-breaking change, meaning if you prefer the old behaviour (multiple errors per field), you can
      continue manually sharing the validation errors in your app service provider. Inertia.js will only automatically
      share the errors if the <Code>errors</Code> key is not already registered.
    </P>
    <P>
      This update also supports named error bags, which are automatically scoped using the error bag name. For example:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        errors: {
          createUser: {
            name: 'The name field is required.',
            email: 'The email field is required.',
          }
        }
      `}
    />
    <P>
      Named error bags are useful when you have multiple forms on the same page, and need a way to differentiate between
      the errors for one form and another. Also, coming is Laravel 8 is the ability to define error bags client-side (
      <A href="https://github.com/laravel/framework/commit/3624a82ea5e36dbad1645975e558dfd8c063d730">see here</A>),
      instead of having to do this in your controllers. Here's an example of how you could use this:
    </P>
    <CodeBlock
      language="js"
      children={dedent`
        this.$inertia.post('/users', {
          ...this.form,
          _error_bag: 'CreateUser',
        })
      `}
    />
    <P>
      By providing the <Code>_error_bag</Code> value here, Laravel and Inertia.js will automatically scope the
      validation errors to the <Code>CreateUser</Code> key.
    </P>
  </>
)
