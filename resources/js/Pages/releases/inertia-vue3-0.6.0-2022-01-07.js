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

    - We now keep a changelog here on GitHub :tada: For earlier releases, please see [the releases page of inertiajs.com](https://inertiajs.com/releases?all=true#inertia-vue3).
    - Types: Use \`@inertiajs/inertia\`'s new 'Progress' type ([#877](https://github.com/inertiajs/inertia/pull/877))

    ### Fixed

    - \`resolveComponent\` should be able to occur asynchronously ([#911](https://github.com/inertiajs/inertia/pull/911))
    - Console warnings still referenced \`<inertia-link>\` instead of \`<Link>\` ([#916](https://github.com/inertiajs/inertia/pull/916))
    - Type regression with Vue 3 ([#849](https://github.com/inertiajs/inertia/pull/849))

  `} />
)
