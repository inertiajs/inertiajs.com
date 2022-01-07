import React from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";

export default release(
  <Markdown content={dedent`
    ### Added

    - Visits and \`Link\` components now accept a 'queryStringArrayFormat' option ([#994](https://github.com/inertiajs/inertia/pull/994))
    - Add \`setError\` method to Form helper to manually set errors ([#999](https://github.com/inertiajs/inertia/pull/999))
    - Add \`defaults\` method to Form helper to 'redefine' the defaults ([#1019](https://github.com/inertiajs/inertia/pull/1019))

    ### Changed

    - We now keep a changelog here on GitHub :tada: For earlier releases, please see [the releases page of inertiajs.com](https://inertiajs.com/releases?all=true#inertia-svelte).

    ### Fixed

    - \`onSuccess\` event no longer automatically resets the "default" values ([\`eee2a5\`](https://github.com/inertiajs/inertia/commit/eee2a5849bb107f34fe48672091e2b63ff15a8f7))

  `} />
)
