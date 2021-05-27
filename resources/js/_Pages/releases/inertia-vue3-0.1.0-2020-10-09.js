import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-vue3@v0.1.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.1.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 9, 2020</div>
      This is the initial release of the new `@inertiajs/inertia-vue3` adapter. 🎉
      <H2>How to install</H2>
      ```bash
      npm install @inertiajs/inertia @inertiajs/inertia-vue3
      yarn add @inertiajs/inertia @inertiajs/inertia-vue3
      ```
      - This adapter requires version `0.4.0` of the `@inertiajs/inertia` package.
      - Vue 3 isn't supported in Laravel Mix 5. You'll need to use [Laravel Mix 6](https://github.com/JeffreyWay/laravel-mix/releases/tag/v6.0.0-alpha.0) (currently in alpha).
      <H2>How to setup</H2>
      ```js
      import { createApp, h } from 'vue'
      import { app, plugin } from '@inertiajs/inertia-vue3'

      const el = document.getElementById('app')

      createApp({
        render: () =>
          h(app, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: (name) => import(`@/Pages/${name}`).then((module) => module.default),
          }),
      })
        .use(plugin)
        .mount(el)
      ```
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
