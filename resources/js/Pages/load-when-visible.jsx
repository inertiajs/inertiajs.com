import { Code, H1, H2, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Load when visible',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#loading-before-visible', name: 'Loading before visible' },
    { url: '#always-trigger', name: 'Always trigger' },
  ],
}

export default function () {
  return (
    <>
      <H1>Load when visible</H1>
      <P>
        Inertia supports lazy loading data on scroll using the Intersection Observer API. It provides the{' '}
        <Code>WhenVisible</Code> component as a convenient way to load data when an element becomes visible in the
        viewport.
      </P>
      <P>
        The <Code>WhenVisible</Code> component accepts a <Code>data</Code> prop that specifies the key of the prop to
        load. It also accepts a <Code>fallback</Code> prop that specifies a component to render while the data is
        loading. The <Code>WhenVisible</Code> component should wrap the component that depends on the data.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            <script setup>
            import { WhenVisible } from '@inertiajs/vue3'
            </script>

            <template>
                <WhenVisible data="permissions">
                    <template #fallback>
                        <div>Loading...</div>
                    </template>

                    <div v-for="permission in permissions">
                        <!-- ... -->
                    </div>
                </WhenVisible>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { WhenVisible } from '@inertiajs/react'

            export default () => (
                <WhenVisible data="permissions" fallback={() => <div>Loading...</div>}>
                    <PermissionsChildComponent />
                </WhenVisible>
            )
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            <script>
            import { WhenVisible } from '@inertiajs/svelte'

            export let permissions
            </script>

            <WhenVisible data="permissions">
                <svelte:fragment slot="fallback">
                    <div>Loading...</div>
                </svelte:fragment>

                {permissions}
            </WhenVisible>
            `,
          },
        ]}
      />
      <P>
        If you'd like to load multiple props when an element becomes visible, you can provide an array to the{' '}
        <Code>data</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            <script setup>
            import { WhenVisible } from '@inertiajs/vue3'
            </script>

            <template>
                <WhenVisible :data="['teams', 'users']">
                    <template #fallback>
                        <div>Loading...</div>
                    </template>

                    <!-- Props are now loaded -->
                </WhenVisible>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { WhenVisible } from '@inertiajs/react'

            export default () => (
                <WhenVisible data={['teams', 'users']} fallback={() => <div>Loading...</div>}>
                    <ChildComponent />
                </WhenVisible>
            )
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            <script>
            import { WhenVisible } from '@inertiajs/svelte'

            export let teams
            export let users
            </script>

            <WhenVisible data={['teams', 'users']}>
                <svelte:fragment slot="fallback">
                    <div>Loading...</div>
                </svelte:fragment>

                <!-- Props are now loaded -->
            </WhenVisible>
            `,
          },
        ]}
      />
      <H2>Loading before visible</H2>
      <P>
        If you'd like to start loading data before the element is visible, you can provide a value to the{' '}
        <Code>buffer</Code> prop. The buffer value is a number that represents the number of pixels before the element
        is visible.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            <script setup>
            import { WhenVisible } from '@inertiajs/vue3'
            </script>

            <template>
                <WhenVisible data="permissions" :buffer="500">
                    <template #fallback>
                        <div>Loading...</div>
                    </template>

                    <div v-for="permission in permissions">
                        <!-- ... -->
                    </div>
                </WhenVisible>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { WhenVisible } from '@inertiajs/react'

            export default () => (
                <WhenVisible data="permissions" buffer={500} fallback={() => <div>Loading...</div>}>
                    <PermissionsChildComponent />
                </WhenVisible>
            )
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            <script>
            import { WhenVisible } from '@inertiajs/svelte'

            export let permissions
            </script>

            <WhenVisible data="permissions" buffer={500}>
                <svelte:fragment slot="fallback">
                    <div>Loading...</div>
                </svelte:fragment>

                {permissions}
            </WhenVisible>
            `,
          },
        ]}
      />
      <P>In the above example, the data will start loading 500 pixels before the element is visible.</P>
      <P>
        By default, the <Code>WhenVisible</Code> component wraps the fallback template in a <Code>div</Code> element so
        it can ensure the element is visible in the viewport. If you want to customize the wrapper element, you can
        provide the <Code>as</Code> prop.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            <script setup>
            import { WhenVisible } from '@inertiajs/vue3'
            </script>

            <template>
                <WhenVisible data="products" as="span">
                    <!-- ... -->
                </WhenVisible>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { WhenVisible } from '@inertiajs/react'

            export default () => (
                <WhenVisible data="products" as="span">
                    <ProductsChildComponent />
                </WhenVisible>
            )
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            <script>
            import { WhenVisible } from '@inertiajs/svelte'

            export let products
            </script>

            <WhenVisible data="products" as="span">
                {products}
            </WhenVisible>
            `,
          },
        ]}
      />
      <H2>Always trigger</H2>
      <P>
        By default, the <Code>WhenVisible</Code> component will only trigger once when the element becomes visible. If
        you want to always trigger the data loading when the element is visible, you can provide the <Code>always</Code>{' '}
        prop.
      </P>
      <P>
        This is useful when you want to load data every time the element becomes visible, such as when the element is at
        the end of an infinite scroll list and you want to load more data.
      </P>
      <P>
        Note that if the data loading request is already in flight, the component will wait until it is finished to
        start the next request if the element is still visible in the viewport.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue 3',
            language: 'markup',
            code: dedent`
            <script setup>
            import { WhenVisible } from '@inertiajs/vue3'
            </script>

            <template>
                <WhenVisible data="products" always>
                    <!-- ... -->
                </WhenVisible>
            </template>
            `,
          },
          {
            name: 'React',
            language: 'jsx',
            code: dedent`
            import { WhenVisible } from '@inertiajs/react'

            export default () => (
                <WhenVisible data="products" always>
                    <ProductsChildComponent />
                </WhenVisible>
            )
            `,
          },
          {
            name: 'Svelte',
            language: 'jsx',
            code: dedent`
            <script>
            import { WhenVisible } from '@inertiajs/svelte'

            export let products
            </script>

            <WhenVisible data="products" always>
                {products}
            </WhenVisible>
            `,
          },
        ]}
      />
    </>
  )
}
