import FrameworkSpecific from './FrameworkSpecific'

const Vue3 = ({ children }) => {
  return <FrameworkSpecific frameworks={['Vue 3']}>{children}</FrameworkSpecific>
}

export default Vue3
