import React from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";

export default release(
  <Markdown content={dedent`
    ### Fixed

    - When the SSR Server crashes, a \`null\` response will be returned, which wasn't being handled properly ([7d7d89](https://github.com/inertiajs/inertia-laravel/commit/7d7d891d72792f6cab6b616d5bbbb48f0526d65f))
  `} />
)
