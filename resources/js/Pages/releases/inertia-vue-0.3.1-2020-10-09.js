import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Add deprecation notice when registering the Inertia Vue plugin via the <Code>app</Code> component (
      <A href="https://github.com/inertiajs/inertia/commit/1764fd50f46f092e41012bb9846daa07b8a62b15">commit</A>.
    </P>
  </>
)
