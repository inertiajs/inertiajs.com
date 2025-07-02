import FrameworkSpecific from './FrameworkSpecific'

const Svelte4 = ({ children }) => {
  return <FrameworkSpecific frameworks={['Svelte 5']}>{children}</FrameworkSpecific>
}

export default Svelte4
