import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-svelte@v0.5.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia-svelte@v0.5.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 20, 2020</div>
      <H2>Changes</H2>
      - Update Inertia link `preserveState` default to be based on the method ([#263](https://github.com/inertiajs/inertia/pull/263)).
      - Update Inertia link to merge data into the URL query string (`href`) for `GET` requests ([#264](https://github.com/inertiajs/inertia/pull/264)).
      <H2>Deprecations</H2>
      Inertia now shows a console warning if you create an Inertia link that uses a method other than `GET`. This is due to accessibility issues that come with using anchor links for non-GET requests, which you can read more about here: #268.
      To hide this console warning, use the `inertia` directive instead to set a more appropriate element, such as a `<button>`. For example:
      ```diff
      - <InertiaLink href="/logout" method="post">Logout</InertiaLink>
      + <button use:inertia={{ method: 'post', href: '/logout' }} type="button">Logout</button>
      ```
      <H2>Breaking changes</H2>
      This release depends on changes made to the internals of Inertia, which requires updating `@inertiajs/inertia` to `^0.5.0`. The peer dependencies have been updated to reflect this.
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
