import FrameworkSpecific from './FrameworkSpecific'

const React = ({ children }) => {
  return <FrameworkSpecific frameworks={['React']}>{children}</FrameworkSpecific>
}

export default React
