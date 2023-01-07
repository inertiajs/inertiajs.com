import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'

const CodeBlock = ({ className = 'my-8 p-6 leading-normal rounded', language, height, children }) => (
  <pre>
    <code
      style={{ height: height ? `${height}px` : 'auto' }}
      className={`${className} block overflow-auto bg-[#202e59] text-[.85rem] text-white`}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(children, Prism.languages[language] || Prism.languages.text),
      }}
    />
  </pre>
)

export default CodeBlock
