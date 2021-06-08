import React from 'react'
import release from '@/Utils/release'
import { Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Add support for new <Code>onBefore()</Code> event callback in the Inertia link component.
      </Li>
      <Li>
        Note, you must upgrade <Code>@inertiajs/inertia</Code> to <Code>^0.6.0</Code> to take advantage of the new{' '}
        <Code>onBefore()</Code> event callback.
      </Li>
    </Ul>
  </>
)
