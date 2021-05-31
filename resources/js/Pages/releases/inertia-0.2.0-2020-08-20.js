import React from 'react'
import { Code, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia@v0.2.0',
}

const Page = () => {
  return (
    <>
      <H1>inertia@v0.2.0</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on August 20, 2020</div>
      <P>This release adds scroll region restoration to Inertia.js. 🎉</P>
      <P>
        This is useful if your application uses persistent layouts with scrollable content areas (as opposed to the
        whole document being scrollable). Previously, if you navigated back (or forward) in history, the scroll position
        of all scroll regions would be reset back to the top. This makes for a poor user experience, since users loose
        their context when navigating through their history.
      </P>
      <P>
        With this release Inertia now keeps track of the scroll position for each scroll region, and then automatically
        resets them as you navigate back (or forward) in your history. To define a scroll region in your application,
        add a <Code>scroll-region="true"</Code> attribute to your scrollable content area, and Inertia will
        automatically keep track of it. You can even have more than one scroll region on your page.
      </P>
      <P>
        What's really cool is that Inertia will even restore these scroll positions if you leave to a different website,
        and then hit back in your history. This is because the scroll positions are saved in the history state, and not
        the local memory of the website.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
