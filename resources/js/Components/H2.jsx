function kebabCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('-')
    .toLowerCase()
}

export default function H2(props) {
  const slot = Array.isArray(props.children) && props.children.length === 1 ? props.children[0] : props.children

  return (
    <h2
      {...props}
      id={props.id || kebabCase(slot)}
      className="mt-16 mb-4 text-2xl font-bold leading-tight text-gray-700"
    />
  )
}
