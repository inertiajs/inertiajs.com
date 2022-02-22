import React from 'react'
import dedent from 'dedent-js'
import { A, Code, H1, H2, Layout, Notice, P, TabbedCode } from '@/Components'

const meta = {
  title: 'Responses',
  links: [
    { url: '#creating-responses', name: 'Creating responses' },
    { url: '#root-template-data', name: 'Root template data' },
    { url: '#maximum-response-size', name: 'Maximum response size' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Responses</H1>
      <H2>Creating responses</H2>
      <P>
        In your controller, provide both the name of the JavaScript page component, as well as any props (data) for the
        page.
      </P>
      <P>
        In this example we're passing a single prop, called <Code>event</Code>, which contains four attributes (
        <Code>id</Code>, <Code>title</Code>, <Code>start_date</Code> and <Code>description</Code>) to the{' '}
        <Code>Event/Show</Code> page component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Inertia\\Inertia;\n
              class EventsController extends Controller
              {
                  public function show(Event $event)
                  {
                      return Inertia::render('Event/Show', [
                          'event' => $event->only('id', 'title', 'start_date', 'description'),
                      ]);\n
                      // Alternatively, you can use the inertia() helper
                      return inertia('Event/Show', [
                          'event' => $event->only('id', 'title', 'start_date', 'description'),
                      ]);\n
                  }
              }
            `,
            description: `To make an Inertia response, use the Inertia render function. This method takes the component name, and allows you to pass props and view data.`,
          },
          {
            name: 'Rails',
            language: 'ruby',
            code: dedent`
              class EventsController < ApplicationController
                def show
                  event = Event.find(params[:id])\n
                  render inertia: 'Event/Show',
                    props: {
                      event: event.as_json(
                        only: [ :id, :title, :start_date, :description ]
                      )
                    }
                end
              end
            `,
            description: `To make an Inertia response, use the inertia renderer. This renderer takes the component name, and allows you to pass props and view_data as an options hash.`,
          },
        ]}
      />
      <Notice>
        To ensure that pages load quickly, only return the minimum data required for the page. Also, be aware that all
        data returned from the controllers will be visible client-side, so be sure to omit sensitive information.
      </Notice>
      <H2>Root template data</H2>
      <P>
        There are situations where you may want to access your prop data in your root Blade template. For example, you
        may want to add a meta description tag, Twitter card meta tags, or Facebook Open Graph meta tags.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'twig',
            code: dedent`
              <meta name="twitter:title" content="{{ $page['props']['event']->title }}">
            `,
            description: `These props are available via the $page variable.`,
          },
          {
            name: 'Rails',
            language: 'erb',
            code: dedent`
              <meta name="twitter:title" content="<%= page['props']['event'].title %>">
            `,
            description: `These props are available via the page variable.`,
          },
        ]}
      />
      <P>Sometimes you may even want to provide data that will not be sent to your JavaScript component.</P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              return Inertia::render('Event', ['event' => $event])
                  ->withViewData(['meta' => $event->meta]);
            `,
            description: `Do this using the withViewData() method.`,
          },
          {
            name: 'Rails',
            language: 'ruby',
            code: dedent`
              render inertia: 'Event', props: {event: event}, view_data: {meta: event.meta}
            `,
            description: `Do this using the "view_data" option`,
          },
        ]}
      />
      <P>You can then access this variable like a regular template variable.</P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'twig',
            code: dedent`
              <meta name="description" content="{{ $meta }}">
            `,
          },
          {
            name: 'Rails',
            language: 'erb',
            code: dedent`
              <meta name="description" content="<%= meta %>">
            `,
          },
        ]}
      />
      <H2>Maximum response size</H2>
      <P>
        To enable client-side history navigation, all Inertia server responses are stored in the browser's history
        state. It's good to be aware that some browsers impose a size limit on how much data can be saved there. For
        example, <A href="https://developer.mozilla.org/en-US/docs/Web/API/History/pushState">Firefox</A> has a size
        limit of 2M characters (and throws a <Code>NS_ERROR_ILLEGAL_VALUE</Code> error if you exceed it). This is
        generally much more than you'll ever need, but it's good to be aware of this when building an Inertia
        application.
      </P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
