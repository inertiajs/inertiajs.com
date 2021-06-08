import React from 'react'
import release from '@/Utils/release'
import { Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Add <Code>useRemember</Code> hook.
      </Li>
      <Li>
        Fix <Code>remember</Code> serialization.
      </Li>
      <Li>
        Add <Code>GET</Code> support to the form helper.
      </Li>
    </Ul>
  </>
)
