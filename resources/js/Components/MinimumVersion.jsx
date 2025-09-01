import P from './P'

export default function MinimumVersion({ version }) {
  return <P>
    <strong>Requires Inertia &gt;= {version}</strong>
  </P>
}