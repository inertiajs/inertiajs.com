import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'

let theme = {
  ...tomorrow,
  ...{
    "pre[class*=\"language-\"]": {
      padding: '1.5rem',
      fontSize: '.875rem',
      background: '#202e59',
    },
  }
}

export default ({ className, height, children }) => (
  <SyntaxHighlighter
    language={className.replace('language-', '')}
    className={className}
    style={theme}
    css={{ height: `${height}px`, overflowY: 'auto' }}
    children={children}
  />
)
