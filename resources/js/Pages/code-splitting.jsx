import { A, Code, CodeBlock, H1, H2, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'Code splitting',
  links: [
    { url: '#using-vite', name: 'Using Vite' },
    { url: '#using-webpack', name: 'Using Webpack' },
  ],
}

export default function () {
  return (
    <>
      <H1>Code splitting</H1>
      <P>
        Code splitting breaks apart the various pages of your application into smaller bundles, which are then loaded on
        demand when visiting new pages. This can significantly reduce the size of the initial JavaScript bundle loaded
        by the browser, improving the time to first render.
      </P>
      <P>
        While code splitting is helpful for very large projects, it does require extra requests when visiting new pages.
        Generally speaking, if you're able to use a single bundle, your app is going to feel snappier.
      </P>
      <P>
        To enable code splitting you'll need to tweak the <Code>resolve</Code> callback in your{' '}
        <Code>createInertiaApp()</Code> configuration, and how you do this is different depending on which bundler
        you're using.
      </P>
      <H2>Using Vite</H2>
      <P>
        Vite enables code splitting (or lazy-loading as they call it) by default when using their{' '}
        <Code>import.meta.glob()</Code> function, so simply omit the <Code>{`{ eager: true }`}</Code> option, or set it
        to <Code>false</Code>, to disable eager loading.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'diff',
            code: dedent`
               resolve: name => {
             -   const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
             -   return pages[\`./Pages/\${name}.vue\`]
             +   const pages = import.meta.glob('./Pages/**/*.vue')
             +   return pages[\`./Pages/\${name}.vue\`]()
               },
            `,
          },
          {
            name: 'React',
            language: 'diff',
            code: dedent`
               resolve: name => {
             -   const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
             -   return pages[\`./Pages/\${name}.jsx\`]
             +   const pages = import.meta.glob('./Pages/**/*.jsx')
             +   return pages[\`./Pages/\${name}.jsx\`]()
               },
            `,
          },
          {
            name: 'Svelte',
            language: 'diff',
            code: dedent`
               resolve: name => {
             -   const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
             -   return pages[\`./Pages/\${name}.svelte\`]
             +   const pages = import.meta.glob('./Pages/**/*.svelte')
             +   return pages[\`./Pages/\${name}.svelte\`]()
               },
            `,
          },
        ]}
      />
      <H2>Using Webpack</H2>
      <P>
        To use code splitting with Webpack, you will first need to enable{' '}
        <A href="https://github.com/tc39/proposal-dynamic-import">dynamic imports</A> via a Babel plugin. Let's install
        it now.
      </P>
      <CodeBlock
        language="bash"
        children={dedent`
          npm install @babel/plugin-syntax-dynamic-import
        `}
      />
      <P>
        Next, create a <Code>.babelrc</Code> file in your project with the following configuration:
      </P>
      <CodeBlock
        language="json"
        children={dedent`
          {
            "plugins": ["@babel/plugin-syntax-dynamic-import"]
          }
        `}
      />
      <Notice>
        If you're using Laravel Mix, the dynamic imports Babel plugin is already installed and configured, and you can
        skip these steps. We recommend using Laravel Mix 6 or above, as there are known issues with older versions.
      </Notice>
      <P>
        Finally, update the <Code>resolve</Code> callback in your app's initialization code to use <Code>import</Code>{' '}
        instead of <Code>require</Code>.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Vue',
            language: 'diff',
            code: dedent`
              - resolve: name => require(\`./Pages/\${name}\`),
              + resolve: name => import(\`./Pages/\${name}\`),
            `,
          },
          {
            name: 'React',
            language: 'diff',
            code: dedent`
              - resolve: name => require(\`./Pages/\${name}\`),
              + resolve: name => import(\`./Pages/\${name}\`),
            `,
          },
          {
            name: 'Svelte',
            language: 'diff',
            code: dedent`
              - resolve: name => require(\`./Pages/\${name}.svelte\`),
              + resolve: name => import(\`./Pages/\${name}.svelte\`),
            `,
          },
        ]}
      />
      <P>
        You should also consider using cache busting to force browsers to load the latest version of your assets. To
        accomplish this, add the following configuration to your webpack configuration file.
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          output: {
            chunkFilename: 'js/[name].js?id=[chunkhash]',
          }
        `}
      />
    </>
  )
}
