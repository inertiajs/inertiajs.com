import { A, Code, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Responses',
  links: [
    { url: '#creating-responses', name: 'Creating responses' },
    { url: '#root-template-data', name: 'Root template data' },
    { url: '#maximum-response-size', name: 'Maximum response size' },
  ],
}

export default function () {
  return (
    <>
      <H1>Responses</H1>
      <H2>Creating responses</H2>
      <P>
        Creating an Inertia response is simple. To get started, invoke the <Code>Inertia::render()</Code> method within
        your controller or route, providing both the name of the <A href="/pages">JavaScript page component</A> that you
        wish to render, as well as any props (data) for the page.
      </P>
      <P>
        In the example below, we will pass a single prop (<Code>event</Code>) which contains four attributes (
        <Code>id</Code>, <Code>title</Code>, <Code>start_date</Code> and <Code>description</Code>) to the{' '}
        <Code>Event/Show</Code> page component.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Inertia\\Inertia;

              class EventsController extends Controller
              {
                  public function show(Event $event)
                  {
                      return Inertia::render('Event/Show', [
                          'event' => $event->only(
                            'id',
                            'title',
                            'start_date',
                            'description'
                          ),
                      ]);

                      // Alternatively, you can use the inertia() helper...
                      return inertia('Event/Show', [
                          'event' => $event->only(
                            'id',
                            'title',
                            'start_date',
                            'description'
                          ),
                      ]);
                  }
              }
            `,
            description: `Within Laravel applications, the Event/Show page would typically correspond to the file located at resources/js/Pages/Event/Show.(js|vue|svelte).`,
          },
        ]}
      />
      <Notice>
        To ensure that pages load quickly, only return the minimum data required for the page. Also, be aware that all
        data returned from the controllers will be visible client-side, so be sure to omit sensitive information.
      </Notice>
      <H2>Root template data</H2>
      <P>
        There are situations where you may want to access your prop data in your application's root Blade template. For
        example, you may want to add a meta description tag, Twitter card meta tags, or Facebook Open Graph meta tags.
        You can access this data via the <Code>$page</Code> variable.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'markup',
            code: dedent`
              <meta name="twitter:title" content="{{ $page['props']['event']->title }}">
            `,
          },
        ]}
      />
      <P>
        Sometimes you may even want to provide data to the root template that will not be sent to your JavaScript page /
        component. This can be accomplished by invoking the <Code>withViewData</Code> method.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              return Inertia::render('Event', ['event' => $event])
                  ->withViewData(['meta' => $event->meta]);
            `,
          },
        ]}
      />
      <P>
        After invoking the <Code>withViewData</Code> method, you can access the defined data as you would typically
        access a Blade template variable.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'markup',
            code: dedent`
              <meta name="description" content="{{ $meta }}">
            `,
          },
        ]}
      />
      <H2>Maximum response size</H2>
      <P>
        To enable client-side history navigation, all Inertia server responses are stored in the browser's history
        state. However, keep in mind that some browsers impose a size limit on how much data can be saved within the
        history state.
      </P>
      <P>
        For example, <A href="https://developer.mozilla.org/en-US/docs/Web/API/History/pushState">Firefox</A> has a size
        limit of 16 MiB and throws a <Code>NS_ERROR_ILLEGAL_VALUE</Code> error if you exceed this limit.
        Typically, this is much more data than you'll ever practically need when building applications.
      </P>
    </>
  )
}
