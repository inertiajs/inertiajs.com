import React from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";

export default release(
  <Markdown content={dedent`
    ### Added

    - Support \`@inertiajs/inertia\` \`^0.11.0\`
  `} />
)
