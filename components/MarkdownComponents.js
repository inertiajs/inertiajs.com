import Code from './Code'
import TabbedCodeExamples from './TabbedCodeExamples'

function kebabCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('-')
    .toLowerCase()
}

export default {
  h1: (props) => (
    <h1
      {...props}
      className="mb-12 text-4xl font-bold text-gray-700 leading-none"
    />
  ),
  h2: (props) => (
    <h2
      id={kebabCase(props.children)}
      className="mt-16 mb-4 text-2xl font-bold text-gray-700 leading-none"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      id={kebabCase(props.children)}
      className="mt-16 mb-4 text-xl font-bold text-gray-700 leading-none"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-6"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-blue-700 hover:text-orange-700 font-medium underline"
      {...props}
    />
  ),
  pre: ({ children }) => (
    children
  ),
  code: ({ className, children }) => (
    <Code
      className="my-8 p-6 leading-normal rounded"
      language={className.replace('language-', '')}
      children={children}
    />
  ),
  TabbedCodeExamples: (props) => (
    <TabbedCodeExamples
      className="my-8 rounded overflow-hidden"
      {...props}
    />
  ),
  inlineCode: (props) => (
    <code
      className="font-mono text-sm font-bold bg-gray-200 rounded p-1"
      {...props}
    />
  ),
}