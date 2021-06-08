import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        This release adds a new optional <Code>resolveErrors</Code> setting.
      </Li>
      <Li>
        You can read more about this in the corresponding <A href="/releases/inertia-0.8.0">Inertia release</A>).
      </Li>
      <Li>
        When upgrading to this release, be sure to also upgrade <Code>@inertiajs/inertia</Code> to <Code>v0.8.0</Code>.
      </Li>
    </Ul>
  </>
)
