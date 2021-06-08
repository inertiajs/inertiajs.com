import React from 'react'
import release from '@/Utils/release'
import { Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>Add scroll regions to allow scroll resetting of custom scroll containers.</Li>
      <Li>Fix remember bug caused by missing cache property.</Li>
    </Ul>
  </>
)
