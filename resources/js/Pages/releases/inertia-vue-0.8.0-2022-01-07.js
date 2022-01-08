import React, { Fragment } from 'react'
import release from '@/Utils/release'
import Markdown from "@/Components/Markdown"
import dedent from "dedent-js";
import { CodeBlock, H2, P } from '@/Components'

export default release(
  <Fragment>
    <H2>Removed Inertia "plugin" auto-registration - BREAKING CHANGE ⚠️</H2>
    <P>
      This release removes the auto-registration of the Inertia "plugin",
      this means you now have to register the plugin yourself within the setup method:
    </P>
    <CodeBlock
      language="diff"
      children={dedent`
        import Vue from 'vue'
        import { createInertiaApp } from '@inertiajs/inertia-vue'\n
        createInertiaApp({
          resolve: name => require(\`./Pages/\${name}\`),
        +  setup({ el, App, props, plugin }) {
        +    Vue.use(plugin)\n
            new Vue({
              render: h => h(App, props),
            }).$mount(el)
          },
        })
      `}
    />
    <Markdown content={dedent`
      ### Added

      - Visits and \`Link\` components now accept a 'queryStringArrayFormat' option ([#994](https://github.com/inertiajs/inertia/pull/994))
      - Add \`setError\` method to Form helper to manually set errors ([#999](https://github.com/inertiajs/inertia/pull/999))
      - Add \`defaults\` method to Form helper to 'redefine' the defaults ([#1019](https://github.com/inertiajs/inertia/pull/1019))

      ### Changed

      - We now keep a changelog here on GitHub :tada: For earlier releases, please see [the releases page of inertiajs.com](https://inertiajs.com/releases?all=true#inertia-vue).
      - Types: Use \`@inertiajs/inertia\`'s new 'Progress' type ([#877](https://github.com/inertiajs/inertia/pull/877))
      - Push Inertia "plugin" to userland instead of auto-registering, similar to Vue 3 ([\`425663\`](https://github.com/inertiajs/inertia/commit/4256638b215e5a67d951baeab89aa6043c27e85d))

      ### Fixed

      - Console warnings still referenced \`<inertia-link>\` instead of \`<Link>\` ([#916](https://github.com/inertiajs/inertia/pull/916))
    `} />
  </Fragment>
)
