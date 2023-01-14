import FrameworkSpecific from './FrameworkSpecific'

const Svelte = ({ children }) => {
  return <FrameworkSpecific frameworks={['Svelte']}>{children}</FrameworkSpecific>
}

export default Svelte
