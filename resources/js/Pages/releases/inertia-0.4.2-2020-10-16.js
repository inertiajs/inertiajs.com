import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Adds url hash support (<A href="https://github.com/inertiajs/inertia/pull/257">#257</A>).
      </Li>
      <Li>Fixed scroll restoration for offsite back/forward visits.</Li>
      <Li>
        Fixed <Code>sessionStorage</Code> issues for browsers that have it disabled.
      </Li>
      <Li>
        Fixed bug where location visits did not respect the <Code>preserveScroll</Code> option.
      </Li>
      <Li>Fixed bug where same-page location visits wouldn't cause a full page reload.</Li>
      <Li>Fixed issue where prop transforming could happen twice on the same props.</Li>
    </Ul>
  </>
)
