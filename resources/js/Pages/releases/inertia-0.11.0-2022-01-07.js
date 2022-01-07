import React from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";

export default release(
  <Markdown content={dedent`
    ### Added

    - Allow choosing query string 'array' formatters ([#994](https://github.com/inertiajs/inertia/pull/994))
    - New \`Progress\` type ([#877](https://github.com/inertiajs/inertia/pull/877))
    - New \`InertiaAppResponse\` type for use in [\`@inertiajs/server\`](https://github.com/inertiajs/server/) ([\`199423\`](https://github.com/inertiajs/inertia/commit/19942367b4f728e58decf581cdd93f674c7b35e5))

    ### Changed

    - Types: Use a ProgressEvent instead of a generic object ([#877](https://github.com/inertiajs/inertia/pull/877))

    ### Fixed

    - \`<Link>\` Component automatically added \`http://localhost\` as a prefix when it contains 'http' in it's path ([#964](https://github.com/inertiajs/inertia/pull/964))
    - "rememberedState of undefined" occurred on visits where \`useRemember\` was used ([#949](https://github.com/inertiajs/inertia/pull/949))
    - Forms with remember keys were giving \`ReferenceError: window is not defined\` during SSR ([#1036](https://github.com/inertiajs/inertia/pull/1036))
    - Certain events always required 'bool' return types, while 'void' (falsy) should be possible too ([#1037](https://github.com/inertiajs/inertia/pull/1037))
  `} />
)
