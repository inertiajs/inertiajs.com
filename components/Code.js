import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const theme = {
  comment: { color: '#999' },
  'block-comment': { color: '#999' },
  prolog: { color: '#999' },
  doctype: { color: '#999' },
  cdata: { color: '#999' },
  punctuation: { color: '#ccc' },
  tag: { color: '#e2777a' },
  'attr-name': { color: '#e2777a' },
  namespace: { color: '#e2777a' },
  deleted: { color: '#e2777a' },
  'function-name': { color: '#6196cc' },
  boolean: { color: '#f08d49' },
  number: { color: '#f08d49' },
  function: { color: '#f08d49' },
  property: { color: '#f8c555' },
  'class-name': { color: '#f8c555' },
  constant: { color: '#f8c555' },
  symbol: { color: '#f8c555' },
  selector: { color: '#cc99cd' },
  important: { color: '#cc99cd', 'font-weight': 'bold' },
  atrule: { color: '#cc99cd' },
  keyword: { color: '#cc99cd' },
  builtin: { color: '#cc99cd' },
  string: { color: '#7ec699' },
  char: { color: '#7ec699' },
  'attr-value': { color: '#7ec699' },
  regex: { color: '#7ec699' },
  variable: { color: '#7ec699' },
  operator: { color: '#67cdcc' },
  entity: { color: '#67cdcc', cursor: 'help' },
  url: { color: '#67cdcc' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  inserted: { color: 'green' },
}

export default ({ className, language, height, children }) => (
  <SyntaxHighlighter
    className={className}
    language={language}
    children={children}
    style={theme}
    customStyle={{
      color: 'white',
      fontSize: '.85rem',
      overflow: 'auto',
      background: '#202e59',
      height: height ? `${height}px` : 'auto',
    }}
  />
)
