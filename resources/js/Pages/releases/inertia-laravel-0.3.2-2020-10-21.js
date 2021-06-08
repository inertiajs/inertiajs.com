import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { Code, CodeBlock, P } from '@/Components'

export default release(
  <>
    <P>
      Added a new <Code>$rootView</Code> property and <Code>rootView()</Code> method to the Inertia middleware for
      setting the root template.
    </P>
    <CodeBlock
      language="php"
      children={dedent`
        class HandleInertiaRequests extends Middleware
        {
            // Set root template via property
            protected $rootView = 'app';\n
            // Set root template via method
            public function rootView(Request $request)
            {
                return 'app';
            }
        }
      `}
    />
  </>
)
