import { A, Code, CodeBlock, H1, H2, P } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Testing',
  links: [
    { url: '#end-to-end-tests', name: 'End-to-end tests' },
    { url: '#client-side-unit-tests', name: 'Client-side unit tests' },
    { url: '#endpoint-tests', name: 'Endpoint tests' },
  ],
}

export default function () {
  return (
    <>
      <H1>Testing</H1>
      <P>
        There are many different ways to test an Inertia application. This page provides a quick overview of the tools
        available.
      </P>
      <H2>End-to-end tests</H2>
      <P>
        One popular approach to testing your JavaScript page components is to use an end-to-end testing tool like{' '}
        <A href="https://www.cypress.io/">Cypress</A> or <A href="https://laravel.com/docs/dusk">Laravel Dusk</A>. These
        are browser automation tools that allow you to run real simulations of your app in the browser. These tests are
        known to be slower; however, since they test your application at the same layer as your end users, they can
        provide a lot of confidence that your app is working correctly. And, since these tests are run in the browser,
        your JavaScript code is actually executed and tested as well.
      </P>
      <H2>Client-side unit tests</H2>
      <P>
        Another approach to testing your page components is using a client-side unit testing framework, such as{' '}
        <A href="https://jestjs.io/">Jest</A> or <A href="https://mochajs.org/">Mocha</A>. This approach allows you to
        test your JavaScript page components in isolation using Node.js.
      </P>
      <H2>Endpoint tests</H2>
      <P>
        In addition to testing your JavaScript page components, you will likely want to also test the Inertia responses
        that are returned by your server-side framework. A popular approach to doing this is using endpoint tests, where
        you make requests to your application and examine the responses. Laravel{' '}
        <A href="https://laravel.com/docs/http-tests">provides tooling</A> for executing these types of tests.
      </P>
      <P>
        However, to make this process even easier, Inertia's Laravel adapter provides additional HTTP testing tools.
        Let's take a look at an example.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          use Inertia\\Testing\\AssertableInertia as Assert;

          class PodcastsControllerTest extends TestCase
          {
              public function test_can_view_podcast()
              {
                  $this->get('/podcasts/41')
                      ->assertInertia(fn (Assert $page) => $page
                          ->component('Podcasts/Show')
                          ->has('podcast', fn (Assert $page) => $page
                              ->where('id', $podcast->id)
                              ->where('subject', 'The Laravel Podcast')
                              ->where('description', 'The Laravel Podcast brings you Laravel and PHP development news and discussion.')
                              ->has('seasons', 4)
                              ->has('seasons.4.episodes', 21)
                              ->has('host', fn (Assert $page) => $page
                                  ->where('id', 1)
                                  ->where('name', 'Matt Stauffer')
                              )
                              ->has('subscribers', 7, fn (Assert $page) => $page
                                  ->where('id', 2)
                                  ->where('name', 'Claudio Dekker')
                                  ->where('platform', 'Apple Podcasts')
                                  ->etc()
                                  ->missing('email')
                                  ->missing('password')
                              )
                          )
                      );
              }
          }
        `}
      />
      <P>
        As you can see in the example above, you may use these assertion methods to assert against the content of the
        data provided to the Inertia response. In addition, you may assert that array data has a given length as well as
        scope your assertions.
      </P>
      <P>
        Let's dig into the available assertions in detail. First, to assert that the Inertia response has a property,
        you may use the <Code>has</Code> method. You can think of this method as being similar to PHP's{' '}
        <Code>isset</Code> function.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          $response->assertInertia(fn (Assert $page) => $page
              // Checking a root-level property...
              ->has('podcast')

              // Checking nested properties using "dot" notation...
              ->has('podcast.id')
          );
        `}
      />
      <P>
        To assert that an Inertia property has a specified amount of items, you may provide the expected size as the
        second argument to the <Code>has</Code> method.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          $response->assertInertia(fn (Assert $page) => $page
              // Checking if a root-level property has 7 items...
              ->has('podcasts', 7)

              // Checking nested properties using "dot" notation...
              ->has('podcast.subscribers', 7)
          );
        `}
      />
      <P>
        The <Code>has</Code> method may also be used to scope properties in order to lessen repetition when asserting
        against nested properties.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          $response->assertInertia(fn (Assert $page) => $page
              // Creating a single-level property scope...
              ->has('message', fn (Assert $page) => $page
                  // We can now continue chaining methods...
                  ->has('subject')
                  ->has('comments', 5)

                  // And can even create a deeper scope using "dot" notation...
                  ->has('comments.0', fn (Assert $page) => $page
                      ->has('body')
                      ->has('files', 1)
                      ->has('files.0', fn (Assert $page) => $page
                          ->has('url')
                      )
                  )
              )
          );
        `}
      />
      <P>
        When scoping into Inertia properties that are arrays or collections, you may also assert that a specified number
        of items are present in addition to scoping into the first item.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          $response->assertInertia(fn (Assert $page) => $page
              // Assert that there are 5 comments and automatically scope into the first comment...
              ->has('comments', 5, fn (Assert $page) => $page
                  ->has('body')
                  // ...
              )
          );
        `}
      />
      <P>
        To assert that an Inertia property has an expected value, you may use the <Code>where</Code> assertion.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          $response->assertInertia(fn (Assert $page) => $page
              ->has('message', fn (Assert $page) => $page
                  // Assert that the subject prop matches the given message...
                  ->where('subject', 'This is an example message')

                  // Or, assert against deeply nested values...
                  ->where('comments.0.files.0.name', 'example-attachment.pdf')
              )
          );
        `}
      />
      <P>
        Inertia's testing methods will automatically fail when you haven't interacted with at least one of the props in
        a scope. While this is generally useful, you might run into situations where you're working with unreliable data
        (such as from an external feed), or with data that you really don't want interact with in order to keep your
        test simple. For these situations, the <Code>etc</Code> method exists.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          $response->assertInertia(fn (Assert $page) => $page
              ->has('message', fn (Assert $page) => $page
                  ->has('subject')
                  ->has('comments')
                  ->etc()
              )
          );
        `}
      />
      <P>
        The <Code>missing</Code> method is the exact opposite of the <Code>has</Code> method, ensuring that the property
        does not exist. This method makes a great companion to the <Code>etc</Code> method.
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          $response->assertInertia(fn (Assert $page) => $page
              ->has('message', fn (Assert $page) => $page
                  ->has('subject')
                  ->missing('published_at')
                  ->etc()
              )
          );
        `}
      />
    </>
  )
}
