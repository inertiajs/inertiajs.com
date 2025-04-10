import { A, Code, H1, H2, P, Strong, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Merging props',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#server-side', name: 'Server side' },
    { url: '#resetting-props', name: 'Resetting props' },
  ],
}

export default function () {
  return (
    <>
      <H1>Merging props</H1>
      <P>
        By default, Inertia overwrites props with the same name when reloading a page. However, there are instances,
        such as pagination or infinite scrolling, where that is not the desired behavior. In these cases, you can merge
        props instead of overwriting them.
      </P>
      <H2>Server side</H2>
      <P>
        To specify that a prop should be merged, you can use the <Code>merge</Code> or <Code>deepMerge</Code> method on
        the prop value.
      </P>
      <P>
        Use <Code>merge</Code> when merging simple arrays, and <Code>deepMerge</Code> when working with nested objects
        that contain arrays or complex structures, such as pagination objects.
      </P>

      <TabbedCode
        examples={[
          {
            name: 'Pagination object',
            language: 'php',
            code: dedent`
            Route::get('/users', function () {
                $page = request()->input('page', 1);
                $per_page = request()->input('per_page', 10);

                return Inertia::render('Users/Index', [
                    'results' => Inertia::deepMerge(User::paginate($per_page, page: $page)),
                ]);
            });
            `,
          },
          {
            name: 'Simple array',
            language: 'php',
            code: dedent`
            Route::get('/items', function () {
                // Static array of tags
                $allTags = [
                    'Laravel', 'React', 'Vue', 'Tailwind', 'Inertia',
                    'PHP', 'JavaScript', 'TypeScript', 'Docker', 'Vite',
                ];

                // Load chunk by page
                $page = request()->input('page', 1);
                $perPage = 5;
                $offset = ($page - 1) * $perPage;
                $tags = array_slice($allTags, $offset, $perPage);

                return Inertia::render('Tags/Index', [
                    'tags' => Inertia::merge($tags),
                ]);
            });
            `,
          },
        ]}
      />

      <P>
        On the client side, Inertia detects that this prop should be merged. If the prop returns an array, it will
        append the response to the current prop value. If it's an object, it will merge the response with the current
        prop value. If you have opted to <Code>deepMerge</Code>, Inertia ensures a deep merge of the entire structure.
      </P>
      <P>
        <Strong>Of note:</Strong> During the merging process, if the value is an array, the incoming items will be{' '}
        <em>appended</em> to the existing array, not merged by index.
      </P>
      <P>
        You can also combine <A href="/deferred-props">deferred props</A> with mergeable props to defer the loading of
        the prop and ultimately mark it as mergeable once it's loaded.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
            Route::get('/users', function () {
                $page = request()->input('page', 1);
                $per_page = request()->input('per_page', 10);

                return Inertia::render('Users/Index', [
                    'results' => Inertia::defer(fn() => User::paginate($per_page, page: $page))->deepMerge(),
                ]);
            });
            `,
          },
        ]}
      />
      <H2>Resetting props</H2>
      <P>
        On the client side, you can indicate to the server that you would like to reset the prop. This is useful when
        you want to clear the prop value before merging new data, such as when the user enters a new search query on a
        paginated list.
      </P>
      <P>
        The <Code>reset</Code> request option accepts an array of the props keys you would like to reset.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'js',
            code: dedent`
            router.reload({
                reset: ['results'],
                //...
            })
            `,
          },
        ]}
      />
    </>
  )
}
