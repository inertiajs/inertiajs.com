import FrameworkSpecific from './FrameworkSpecific'

const Vue2 = ({ children }) => {
  return <FrameworkSpecific frameworks={['Vue 2']}>{children}</FrameworkSpecific>
}

export default Vue2
