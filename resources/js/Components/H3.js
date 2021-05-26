function kebabCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('-')
    .toLowerCase()
}

export default function H3(props) {
  return (
    <h3
      {...props}
      id={props.id || kebabCase(props.children)}
      className="mt-16 mb-4 text-xl font-bold text-gray-700 leading-none"
    />
  )
}
