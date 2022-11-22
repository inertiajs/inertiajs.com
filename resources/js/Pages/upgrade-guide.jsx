import { A, Code, CodeBlock, H1, H2, Layout, Li, Notice, Ol, P, Strong } from '@/Components'
import dedent from 'dedent-js'

const meta = {
  title: 'Upgrade guide',
  links: [{ url: '#add', name: 'Add' }],
}

const Page = () => {
  return (
    <>
      <H1>Upgrade guide</H1>
      <P>Add...</P>
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
