import React from 'react'
import release from '@/Utils/release'
import { A, Code, H2, Li, P, Ul } from '@/Components'

export default release(
  <>
    <H2>Changes</H2>
    <Ul>
      <Li>
        Updates the library to use the improved <Code>finish</Code> event handling in <Code>@inertiajs/inertia</Code>{' '}
        version <A href="/releases/inertia-0.6.0">0.6.0</A>).
      </Li>
      <Li>
        Made all internal methods private, leaving only <Code>InertiaProgress.init()</Code> public.
      </Li>
    </Ul>
    <H2>Upgrade instructions</H2>
    <P>
      Note, you must upgrade <Code>@inertiajs/inertia</Code> to <Code>^0.6.0</Code> to use this version.
    </P>
  </>
)
