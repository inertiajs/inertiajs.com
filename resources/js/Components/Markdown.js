import { compiler } from 'markdown-to-jsx';
import { A, Code, H1, H2, H3, Li, Ul, } from '@/Components'
export default function Markdown({ content }) {
  const markdown = (content || '')

  return compiler(markdown, {
      overrides: {
        code: { component: Code },
        h1: { component: H1 },
        h2: { component: H2 },
        h3: { component: H3 },
        a: { component: A },
        li: { component: Li },
        ul: { component: Ul },
      }
    })
}
