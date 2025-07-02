import FrameworkSpecific from './FrameworkSpecific'

const Vue = ({ children }) => {
  return <FrameworkSpecific frameworks={['Vue']}>{children}</FrameworkSpecific>
}

export default Vue
