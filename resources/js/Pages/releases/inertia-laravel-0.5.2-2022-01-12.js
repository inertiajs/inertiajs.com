import React from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";

export default release(
  <Markdown content={dedent`
    ### Added

    - Laravel 9 Support ([#347](https://github.com/inertiajs/inertia-laravel/pull/347))

    ### Fixed

    - Respect \`X-Forwarded-For\` header ([#333](https://github.com/inertiajs/inertia-laravel/pull/333))
  `} />
)
