import { Code, H1, H2, H3, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Deferred props',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#server-side', name: 'Server side' },
    { url: '#client-side', name: 'Client side' },
  ],
}

export default function () {
  return (
    <>
      <H1>Deferred props</H1>
      <P>
        Inertia's deferred props feature allows you to defer the loading of certain page data until after the initial
        page render. This can be useful for improving the perceived performance of your app by allowing the initial page
        render to happen as quickly as possible.
      </P>
      <H2>Server side</H2>
      <P>
        To defer a prop, you can use the <Code>defer</Code> method when returning your response. This method receives a
        callback that returns the prop data. The callback will be executed in a separate request after the initial page
        render.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
            Route::get('/users', function () {
                return Inertia::render('Users/Index', [
                    'users' => User::all(),
                    'roles' => Role::all(),
                    'permissions' => Inertia::defer(fn () => Permission::all()),
                ]);
            });
            `,
          },
        ]}
      />
      <H3>Grouping requests</H3>
      <P>
        By default, all deferred props get fetched in one request after the initial page is rendered, but you can choose
        to fetch data in parallel by grouping props together.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
            Route::get('/users', function () {
                return Inertia::render('Users/Index', [
                    'users' => User::all(),
                    'roles' => Role::all(),
                    'permissions' => Inertia::defer(fn () => Permission::all()),
                    'teams' => Inertia::defer(fn () => Team::all(), 'attributes'),
                    'projects' => Inertia::defer(fn () => Project::all(), 'attributes'),
                    'tasks' => Inertia::defer(fn () => Task::all(), 'attributes'),
                ]);
            });
            `,
          },
        ]}
      />
      <P>
        In the example above, the <Code>teams</Code>, <Code>projects</Code>, and <Code>tasks</Code> props will be
        fetched in one request, while the <Code>permissions</Code> prop will be fetched in a separate request in
        parallel. Group names are arbitrary strings and can be anything you choose.
      </P>
      <H2>Client side</H2>
      <P>
        On the client side, Inertia provides the <Code>Deferred</Code> component to help you manage deferred props. This
        component will automatically wait for the specified deferred props to be available before rendering its
        children.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
            <script setup>
            import { Deferred } from '@inertiajs/vue3'
            </script>

            <template>
                <Deferred data="permissions">
                    <template #fallback>
                        <div>Loading...</div>
                    </template>

                    <div v-for="permission in permissions">
                        <!-- ... -->
                    </div>
                </Deferred>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Deferred } from '@inertiajs/react'

            export default () => (
                <Deferred data="permissions" fallback={<div>Loading...</div>}>
                    <PermissionsChildComponent />
                </Deferred>
            )
            `,
          },
          {
            name: 'Svelte 4',
            language: 'jsx',
            code: dedent`
            <script>
                import { Deferred } from '@inertiajs/svelte'

                export let permissions
            </script>

            <Deferred data="permissions">
                <svelte:fragment slot="fallback">
                    <div>Loading...</div>
                </svelte:fragment>

                {#each permissions as permission}
                    <!-- ... -->
                {/each}
            </Deferred>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'jsx',
            code: dedent`
            <script>
                import { Deferred } from '@inertiajs/svelte'

                let { permissions } = $props()
            </script>

            <Deferred data="permissions">
                {#snippet fallback()}
                    <div>Loading...</div>
                {/snippet}

                {#each permissions as permission}
                    <!-- ... -->
                {/each}
            </Deferred>
            `,
          },
        ]}
      />
      <P>
        If you need to wait for multiple deferred props to become available, you can specify an array to the{' '}
        <Code>data</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'markup',
            code: dedent`
            <script setup>
            import { Deferred } from '@inertiajs/vue3'
            </script>

            <template>
                <Deferred :data="['teams', 'users']">
                    <template #fallback>
                        <div>Loading...</div>
                    </template>

                    <!-- Props are now loaded -->
                </Deferred>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { Deferred } from '@inertiajs/react'

            export default () => (
                <Deferred data={['teams', 'users']} fallback={<div>Loading...</div>}>
                    <ChildComponent />
                </Deferred>
            )
            `,
          },
          {
            name: 'Svelte 4',
            language: 'jsx',
            code: dedent`
            <script>
                import { Deferred } from '@inertiajs/svelte'

                export let teams
                export let users
            </script>

            <Deferred data={['teams', 'users']}>
                <svelte:fragment slot="fallback">
                    <div>Loading...</div>
                </svelte:fragment>

                <!-- Props are now loaded -->
            </Deferred>
            `,
          },
          {
            name: 'Svelte 5',
            language: 'jsx',
            code: dedent`
            <script>
                import { Deferred } from '@inertiajs/svelte'

                let { teams, users } = $props()
            </script>

            <Deferred data={['teams', 'users']}>
                {#snippet fallback()}
                    <div>Loading...</div>
                {/snippet}

                <!-- Props are now loaded -->
            </Deferred>
            `,
          },
        ]}
      />
    </>
  )
}
