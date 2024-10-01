export default function Code({ color, ...props }) {
  const bgClass = color === 'orange' ? 'bg-orange-300' : 'bg-gray-200 dark:bg-gray-800/80'
  return <code {...props} className={`whitespace-nowrap rounded p-1 font-mono text-sm ${bgClass}`} />
}
