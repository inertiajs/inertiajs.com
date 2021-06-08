import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, P } from '@/Components'

export default release(
  <>
    <P>
      This release adds the ability to define "lazy props". (
      <A href="https://github.com/inertiajs/inertia-laravel/pull/175">#175</A>))
    </P>
    <P>
      Lazy props are data that's not included on the initial visit to a page. These properties only get included on
      partial reloads, using the <Code>only</Code> option. This is useful for "expensive" data, such as requests to 3rd
      party APIs, that are not needed on the initial visit to a page.
    </P>
    <P>
      You can mark a prop as lazy using the new <Code>Inertia::lazy()</Code> method:
    </P>
    <CodeBlock
      language="php"
      children={dedent`
        return Inertia::render('Users/Index', [
            'users' => User::paginate('id', 'name', 'email'),
            'companies' => Inertia::lazy(fn () => Company::get('id', 'name')),
        ]);
      `}
    />
    <P>Then, to load this prop later on, you perform a partial reload from your page component, either using a link:</P>
    <CodeBlock
      language="js"
      children={dedent`
        <inertia-link class="hover:underline" href="/users" :only="['companies']">Load companies</inertia-link>
      `}
    />
    <P>Or by doing this programatically:</P>
    <CodeBlock
      language="js"
      children={dedent`
        Inertia.reload({ only: ['companies'] })
      `}
    />
  </>
)
