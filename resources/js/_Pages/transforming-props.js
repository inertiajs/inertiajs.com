import dedent from 'dedent-js'
import Layout from '../Components/Layout'
import TabbedCode from '../Components/TabbedCode'

const meta = { title: 'Transforming props' }

<H1>Transforming props</H1>

Sometimes it can be useful to transform the props client-side before they are passed to the page component. For example, you may have a collection of errors that you want to convert into a custom `Error` object. You can do this using the `transformProps` callback.

<TabbedCode
  examples={[
    {
      name: 'Vue 2',
      language: 'js',
      code: dedent`
        new Vue({
          render: h => h(App, {
            props: {
              initialPage: JSON.parse(el.dataset.page),
              resolveComponent: name => require(\`./Pages/\${name}\`).default,
              transformProps: props => {
                return {
                  ...props,
                  errors: new Errors(props.errors),
                }
              },
            },
          }),
        }).$mount(el)
      `,
    },
    {
      name: 'Vue 3',
      language: 'js',
      code: dedent`
        createApp({
          render: () => h(App, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: name => require(\`./Pages/\${name}\`).default,
            transformProps: props => {
              return {
                ...props,
                errors: new Errors(props.errors),
              }
            },
          }),
        }).mount(el)
      `,
    },
    {
      name: 'React',
      language: 'jsx',
      code: dedent`
        render(
          <App
            initialPage={JSON.parse(el.dataset.page)}
            resolveComponent={name => require(\`./Pages/\${name}\`).default}
            transformProps={props => {
              return {
                ...props,
                errors: new Errors(props.errors),
              }
            }}
          />,
          el
        )
      `,
    },
    {
      name: 'Svelte',
      language: 'js',
      code: dedent`
        new App({
          target: el,
          props: {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: name => require(\`./Pages/\${name}.svelte\`),
            transformProps: props => {
              return {
                ...props,
                errors: new Errors(props.errors),
              }
            }
          },
        })
      `,
    },
  ]}
/>

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
