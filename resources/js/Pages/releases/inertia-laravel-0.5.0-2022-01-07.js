import React from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";

export default release(
  <Markdown content={dedent`
    ### Added

    - PHP 8.1 Support ([#327](https://github.com/inertiajs/inertia-laravel/pull/327))
    - Allow \`Inertia::location\` to be called with a \`RedirectResponse\` ([#302](https://github.com/inertiajs/inertia-laravel/pull/302))
    - Support Guzzle Promises ([#316](https://github.com/inertiajs/inertia-laravel/pull/316))
    - Server-side rendering support (\`@inertiaHead\` directive) ([#339](https://github.com/inertiajs/inertia-laravel/pull/339))
    - Allow custom \`@inertia\` root element ID (e.g. \`@inertia('foo')\` -> \`<div id="foo" data-page="...\`) ([#339](https://github.com/inertiajs/inertia-laravel/pull/339))

    ### Changed

    - We now keep a changelog here on GitHub :tada: For earlier releases, please see [the releases page of inertiajs.com](https://inertiajs.com/releases?all=true#inertia-laravel).
    - Add PHP native type declarations ([#301](https://github.com/inertiajs/inertia-laravel/pull/301), [#337](https://github.com/inertiajs/inertia-laravel/pull/337))

    ### Deprecated

    - Deprecate \`Assert\` library in favor of Laravel's AssertableJson ([#338](https://github.com/inertiajs/inertia-laravel/pull/338))

    ### Removed

    - Laravel 5.4 Support ([#327](https://github.com/inertiajs/inertia-laravel/pull/327))

    ### Fixed

    - Transform Responsable props to arrays instead of objects ([#265](https://github.com/inertiajs/inertia-laravel/pull/265))
    - \`Inertia::location()\`: Fall back to regular redirects when a direct (non-Inertia) visit was made ([#312](https://github.com/inertiajs/inertia-laravel/pull/312))
    - Use correct types for Resources ([#214](https://github.com/inertiajs/inertia-laravel/issues/214))
  `} />
)
