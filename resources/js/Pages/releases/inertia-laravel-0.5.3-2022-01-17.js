import React from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";

export default release(
  <Markdown content={dedent`
    ### Fixed

    - Incorrect \`Arrayable\` type-hint ([#353](https://github.com/inertiajs/inertia-laravel/pull/353))
    - Pagination with API Resources and other nested props weren't resolving properly ([#342](https://github.com/inertiajs/inertia-laravel/pull/342), [#298](https://github.com/inertiajs/inertia-laravel/pull/298))
  `} />
)
