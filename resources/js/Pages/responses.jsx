import { A, Code, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Responses',
  links: [
    { url: '#creating-responses', name: 'Creating responses' },
    { url: '#props', name: 'Props' },
    { url: '#provides-inertia-property', name: 'ProvidesInertiaProperty interface' },
    { url: '#provides-inertia-properties', name: 'ProvidesInertiaProperties interface' },
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
            description: 'Within Laravel applications, the Event/Show page would typically correspond to the file located at resources/js/Pages/Event/Show.(js|vue|svelte).',
          },
        ]}
      />
      <Notice>
        To ensure that pages load quickly, only return the minimum data required for the page. Also, be aware that all
        data returned from the controllers will be visible client-side, so be sure to omit sensitive information.
      </Notice>
      <H2>Props</H2>
      <P>
        To pass data from the server to your page components, you can use props. You can pass various types of values as
        props, including primitive types, arrays, objects, and several Laravel-specific types that are automatically resolved:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use App\\Models\\User;
              use Illuminate\\Http\\Resources\\Json\\JsonResource;

              Inertia::render('Dashboard', [
                  // Primitive values
                  'title' => 'Dashboard',
                  'count' => 42,
                  'active' => true,

                  // Arrays and objects
                  'settings' => ['theme' => 'dark', 'notifications' => true],

                  // Arrayable objects (Collections, Models, etc.)
                  'user' => auth()->user(), // Eloquent model
                  'users' => User::all(), // Eloquent collection

                  // API Resources
                  'profile' => new UserResource(auth()->user()),

                  // Responsable objects
                  'data' => new JsonResponse(['key' => 'value']),

                  // Closures
                  'timestamp' => fn() => now()->timestamp,
              ]);
            `,
          },
        ]}
      />
      <P>
        Arrayable objects like Eloquent models and collections are automatically converted using their <Code>toArray()</Code> method.
        Responsable objects like API resources and JSON responses are resolved through their <Code>toResponse()</Code> method.
      </P>
      <H2>ProvidesInertiaProperty interface</H2>
      <P>
        When passing props to your components, you may want to create custom classes that can transform themselves into the
        appropriate data format. You can do this by implementing the <Code>ProvidesInertiaProperty</Code> interface.
      </P>
      <P>
        This interface requires you to implement a <Code>toInertiaProperty</Code> method that returns the transformed value.
        The method receives a <Code>PropertyContext</Code> object which provides access to the property key, current props,
        and the request instance.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Inertia\\PropertyContext;
              use Inertia\\ProvidesInertiaProperty;

              class UserAvatar implements ProvidesInertiaProperty
              {
                  public function __construct(protected User $user, protected int $size = 64) {}

                  public function toInertiaProperty(PropertyContext $prop): mixed
                  {
                      return $this->user->avatar
                          ? Storage::url($this->user->avatar)
                          : "https://ui-avatars.com/api/?name={$this->user->name}&size={$this->size}";
                  }
              }
            `,
          },
        ]}
      />
      <P>
        You can use this class directly as a prop value:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              Inertia::render('Profile', [
                  'user' => $user,
                  'avatar' => new UserAvatar($user, 128),
              ]);
            `,
          },
        ]}
      />
      <P>
        The <Code>avatar</Code> prop will contain the full avatar URL.
      </P>
      <P>
        This is particularly useful when you need to create reusable prop transformations or when you need access to the
        property key or other props during transformation.
      </P>
      <H2>ProvidesInertiaProperties interface</H2>
      <P>
        In some situations you may want to group related props together for reusability across different pages. You can
        accomplish this by implementing the <Code>ProvidesInertiaProperties</Code> interface.
      </P>
      <P>
        This interface requires you to implement a <Code>toInertiaProperties</Code> method that returns an array of
        key-value pairs. The method receives a <Code>RenderContext</Code> object which contains the request instance
        and component name.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              use Inertia\\RenderContext;
              use Inertia\\ProvidesInertiaProperties;

              class UserPermissions implements ProvidesInertiaProperties
              {
                  public function __construct(protected User $user) {}

                  public function toInertiaProperties(RenderContext $context): array
                  {
                      return [
                          'canEdit' => $this->user->can('edit'),
                          'canDelete' => $this->user->can('delete'),
                          'canPublish' => $this->user->can('publish'),
                          'isAdmin' => $this->user->hasRole('admin'),
                      ];
                  }
              }
            `,
          },
        ]}
      />
      <P>
        You can use these prop classes directly in the <Code>render()</Code> and <Code>with()</Code> methods:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              public function index(UserPermissions $permissions)
              {
                  return Inertia::render('UserProfile', $permissions);

                  // or...

                  return Inertia::render('UserProfile')->with($permissions);
              }
            `,
          },
        ]}
      />
      <P>
        You can also combine multiple prop classes with other props in an array:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              public function index(UserPermissions $permissions)
              {
                  return Inertia::render('UserProfile', [
                      'user' => auth()->user(),
                      $permissions,
                  ]);

                  // or using method chaining...

                  return Inertia::render('UserProfile')
                      ->with('user', auth()->user())
                      ->with($permissions);
              }
            `,
          },
        ]}
      />
      <P>
        This approach helps organize your code and avoid repetition when the same props are needed across multiple pages.
      </P>
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
