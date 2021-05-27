import Layout from '@/Components/Layout'

const meta = {
  title: 'inertia-laravel@v0.3.2',
}

const Page = () => {
  return (
    <>
      <H1>inertia-laravel@v0.3.2</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on October 21, 2020</div>
      Added a new `$rootView` property and `rootView()` method to the Inertia middleware for setting the root template.
      ```php
      class HandleInertiaRequests extends Middleware
      {
          // Set root template via property
          protected $rootView = 'app';

          // Set root template via method
          public function rootView(Request $request)
          {
              return 'app';
          }
      }
      ```
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
