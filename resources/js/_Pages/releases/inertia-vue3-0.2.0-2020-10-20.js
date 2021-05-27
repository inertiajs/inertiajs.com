import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-vue3@v0.2.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue3@v0.2.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 20, 2020</div>
      <H2>Changes</H2>
      - Add Inertia link `as` option to render the component as a different element ([#271](https://github.com/inertiajs/inertia/pull/271)).
      - Update Inertia link `preserveState` default to be based on the method ([#263](https://github.com/inertiajs/inertia/pull/263)).
      - Update Inertia link to merge data into the URL query string (`href`) for `GET` requests ([#264](https://github.com/inertiajs/inertia/pull/264)).
      <H2>Deprecations</H2>
      Inertia now shows a console warning if you create an Inertia link that uses a method other than `GET` and you also don't change the link element to something other than an `<a>` tag. This is due to accessibility issues that come with using anchor links for non-GET requests, which you can read more about here: #268.
      To hide this console warning, use the new `as` option to set a more appropriate element, such as a `<button>`. For example:
      ```diff
      - <inertia-link href="/logout" method="post">Logout</inertia-link>
      + <inertia-link href="/logout" method="post" as="button" type="button">Logout</inertia-link>
      ```
      <H2>Breaking changes</H2>
      This release depends on changes made to the internals of Inertia, which requires updating `@inertiajs/inertia` to `^0.5.0`. The peer dependencies have been updated to reflect this.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
