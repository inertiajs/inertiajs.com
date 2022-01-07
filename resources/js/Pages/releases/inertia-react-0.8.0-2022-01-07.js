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
    - Add Types for \`<Head>\` component ([#855](https://github.com/inertiajs/inertia/pull/855))

    ### Changed

    - We now keep a changelog here on GitHub :tada: For earlier releases, please see [the releases page of inertiajs.com](https://inertiajs.com/releases?all=true#inertia-react).
    - Types: Use \`@inertiajs/inertia\`'s new 'Progress' type ([#877](https://github.com/inertiajs/inertia/pull/877))

    ### Fixed

    - Console warnings still referenced \`<inertia-link>\` instead of \`<Link>\` ([#916](https://github.com/inertiajs/inertia/pull/916))
    - "rememberedState of undefined" occurred on visits where \`useRemember\` was used ([#949](https://github.com/inertiajs/inertia/pull/949))
    - \`useForm\` overload types were incorrect for remember key ([#949](https://github.com/inertiajs/inertia/pull/949), [\`b98ee6\`](https://github.com/inertiajs/inertia/commit/b98ee69339a6f3af3bc7d331b5add726e5405ea0))
    - Incorrect types for \`createInertiaApp\` ([#847](https://github.com/inertiajs/inertia/pull/847))
    - Incorrect types for \`useForm\` methods ([#922](https://github.com/inertiajs/inertia/pull/922))

  `} />
)
