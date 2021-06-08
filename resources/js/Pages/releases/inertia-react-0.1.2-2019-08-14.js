import React from 'react'
import release from '@/Utils/release'
import { Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>Update dependencies.</Li>
      <Li>Remove Inertia core export from typings.</Li>
    </Ul>
  </>
)
