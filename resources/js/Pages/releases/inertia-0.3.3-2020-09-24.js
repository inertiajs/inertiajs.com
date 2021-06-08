import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Added the ability to <Code>return false</Code> from events to prevent default (
        <A href="https://github.com/inertiajs/inertia/pull/232">#232</A>).
      </Li>
      <Li>
        Updated the "start" event to call "finish" if cancelled (
        <A href="https://github.com/inertiajs/inertia/commit/dc1a958b5ceeaa1e3a5266e53d98300fd1f636b3">commit</A>).
      </Li>
      <Li>
        Fixed bug with scroll region tracking when scrolling the document (
        <A href="https://github.com/inertiajs/inertia/commit/132399154ef4a70366de1a624f39ef44a9de3f76">commit</A>).
      </Li>
    </Ul>
  </>
)
