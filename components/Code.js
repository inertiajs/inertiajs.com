import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default ({ className, height, children }) => (
  <SyntaxHighlighter
    language={className.replace('language-', '')}
    className="text-xs sm:text-sm"
    children={children}
    style={tomorrow}
    customStyle={{
      background: '#202e59',
      margin: '0',
      padding: '1.5rem',
      height: height ? `${height}px` : 'auto',
      overflowY: 'auto',
    }}
  />
)
