import React from 'react'
import dedent from 'dedent-js'
import { A, CodeBlock, H1, H2, Layout, Notice, P } from '@/Components'

const meta = {
  title: 'Testing',
  links: [
    { url: '#end-to-end-tests', name: 'End-to-end tests' },
    { url: '#client-side-unit-tests', name: 'Client-side unit tests' },
    { url: '#endpoint-tests', name: 'Endpoint tests' },
  ],
}

const Page = () => {
  return (
    <>
      <H1>Testing</H1>
      <P>
        There are many different ways to test an Inertia.js app. This page provides a quick overview of the tools
        available.
      </P>
      <H2>End-to-end tests</H2>
      <P>
        One popular approach to testing your JavaScript page components, is to use an end-to-end testing tool like{' '}
        <A href="https://www.cypress.io/">Cypress</A> or <A href="https://laravel.com/docs/8.x/dusk">Laravel Dusk</A>.
        These are browser automation tools that allow you to run real simulations of your app in the browser. These
        tests are known to be slower, and sometimes brittle, but since they test your application at the same layer as
        your end users, they can provide a lot of confidence that your app is working correctly. And, since these tests
        are run in the browser your JavaScript code is actually executed and tested as well.
      </P>
      <H2>Client-side unit tests</H2>
      <P>
        Another approach to testing your page components is using a client-side unit testing framework, such as{' '}
        <A href="https://jestjs.io/">Jest</A> or <A href="https://mochajs.org/">Mocha</A>. This approach allows you to
        test your JavaScript page components in isolation using Node.js.
      </P>
      <H2>Endpoint tests</H2>
      <P>
        In addition to testing your JavaScript page components, you'll also want to test the Inertia responses that come
        back from your server-side framework. A popular approach to doing this is using endpoint tests, where you make
        requests to your application and examine the responses. Frameworks, such as Laravel (
        <A href="https://laravel.com/docs/8.x/http-tests">see here</A>), provide tooling for this.
      </P>
      <P>
        However, to make this process even easier, in our Laravel adapter we've provided additional HTTP testing tools.
        Here's an example:
      </P>
      <CodeBlock
        language="php"
        children={dedent`
          use Inertia\\Testing\\Assert;

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
      <Notice>
        Note, until we're able to add the documentation for these testing helpers to this website, please see the{' '}
        <A
          href="https://github.com/claudiodekker/inertia-laravel-testing/tree/a5ac8d372e456534f5ad2e07a6875e0f27c6a73d"
          color="orange"
        >
          old docs
        </A>
        .
      </Notice>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
