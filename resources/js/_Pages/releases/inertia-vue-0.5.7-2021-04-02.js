import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-vue@v0.5.7',
}

const Page = () => {
  return (
    <>
      <H1>inertia-vue@v0.5.7</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on April 2, 2021</div>
      - Disabled automatic remembering of form data and errors in history state ([#597](https://github.com/inertiajs/inertia/pull/597)).
      <H2>Disabled automatic remembering of form data</H2>
      This release reverts a recent change that updated the form helper to automatically remember form data and errors in history state. While that behaviour was nice, it caused unexpected issues when there are multiple forms on a single page.
      The way to avoid these issues was to provide a unique form key. With this change, form data and errors are only remembered when a key is provided.
      ```js
      // Not remembered
      this.inertia.$form(data)

      // Remembered
      this.inertia.$form('CreateUser', data)
      ```
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
