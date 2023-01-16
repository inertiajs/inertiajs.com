import FrameworkSpecific from './FrameworkSpecific'

const Vue = ({ children }) => {
  return <FrameworkSpecific frameworks={['Vue 2', 'Vue 3']}>{children}</FrameworkSpecific>
}

export default Vue
