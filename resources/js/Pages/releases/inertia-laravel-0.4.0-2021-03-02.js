import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, Code, CodeBlock, H2, Li, Ol, P } from '@/Components'

export default release(
  <>
    <P>
      This release merges <A href="https://github.com/claudiodekker">@claudiodekker</A>'s excellent{' '}
      <A href="https://github.com/claudiodekker/inertia-laravel-testing">Inertia Laravel Testing Helpers</A> package
      into this adapter (<A href="https://github.com/inertiajs/inertia-laravel/pull/220">#220</A>).
    </P>
    <H2>Example usage</H2>
    <CodeBlock
      language="php"
      children={dedent`
        use Inertia\\Testing\\Assert;\n
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
    <H2>Documentation</H2>
    <P>
      Until we're able to add the documentation for these testing helpers to this website, please see the old docs{' '}
      <A href="https://github.com/claudiodekker/inertia-laravel-testing/tree/a5ac8d372e456534f5ad2e07a6875e0f27c6a73d">
        here
      </A>
      ).
    </P>
    <H2>Migrating</H2>
    <P>
      To migrate from <Code>inertia-laravel-testing</Code> to the <Code>inertia-laravel</Code> adapter, follow these
      steps:
    </P>
    <Ol>
      <Li>
        In your <Code>composer.json</Code> file, remove the <Code>claudiodekker/inertia-laravel-testing</Code>{' '}
        dependency.
      </Li>
      <Li>
        In your <Code>composer.json</Code> file, update the <Code>inertiajs/inertia-laravel</Code> version to{' '}
        <Code>^0.4.0</Code>.
      </Li>
      <Li>
        Run <Code>composer update</Code>.
      </Li>
      <Li>
        Search and replace <Code>use ClaudioDekker\Inertia\Assert;</Code> with <Code>use Inertia\Testing\Assert;</Code>{' '}
        in your project.
      </Li>
    </Ol>
    <P>That's it. All your tests should still be passing.</P>
  </>
)
