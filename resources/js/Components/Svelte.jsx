import FrameworkSpecific from './FrameworkSpecific'

const Svelte = ({ children }) => {
  return <FrameworkSpecific frameworks={['Svelte', 'Svelte 4', 'Svelte 5']}>{children}</FrameworkSpecific>
}

export default Svelte
