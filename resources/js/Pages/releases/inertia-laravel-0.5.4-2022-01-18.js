import React from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";

export default release(
  <Markdown content={dedent`
      ### Added

      - \`.tsx\` extension is now included to the testing paths by default ([#354](https://github.com/inertiajs/inertia-laravel/pull/354))

      ### Fixed

      - Dot-notated props weren't being removed after unpacking ([507b0a](https://github.com/inertiajs/inertia-laravel/commit/507b0a0ad8321028b8651528099f73a88b158359))
  `} />
)
