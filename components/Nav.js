import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ className }) => {
  const router = useRouter()

  function linkClass(path) {
    return router.pathname === path
      ? `block px-2 py-2 rounded font-medium bg-indigo-200 text-blue-800`
      : `inline-block px-2 py-2 hover:text-blue-700 hover:underline font-medium text-gray-700`
  }

  return (
    <nav className={className}>
      <div className="mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Getting started</div>
      <ul>
        <li className="-ml-2 md:pr-4">
          <Link href="/">
            <a className={linkClass('/')}>Introduction</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/how-it-works">
            <a className={linkClass('/how-it-works')}>How it works</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/installation">
            <a className={linkClass('/installation')}>Installation</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/server-side-setup">
            <a className={linkClass('/server-side-setup')}>Server-side setup</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/client-side-setup">
            <a className={linkClass('/client-side-setup')}>Client-side setup</a>
          </Link>
        </li>
      </ul>
      <div className="mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Core concepts</div>
      <ul>
        <li className="-ml-2 md:pr-4">
          <Link href="/routing">
            <a className={linkClass('/routing')}>Routing</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/responses">
            <a className={linkClass('/responses')}>Responses</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/requests">
            <a className={linkClass('/requests')}>Requests</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/redirects">
            <a className={linkClass('/redirects')}>Redirects</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/pages">
            <a className={linkClass('/pages')}>Pages</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/links">
            <a className={linkClass('/links')}>Links</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/forms">
            <a className={linkClass('/forms')}>Forms</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/shared-data">
            <a className={linkClass('/shared-data')}>Shared data</a>
          </Link>
        </li>
      </ul>
      <div className="mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Advanced</div>
      <ul>
        <li className="-ml-2 md:pr-4">
          <Link href="/security">
            <a className={linkClass('/security')}>Security</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/error-handling">
            <a className={linkClass('/error-handling')}>Error handling</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/asset-versioning">
            <a className={linkClass('/asset-versioning')}>Asset versioning</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/local-state-caching">
            <a className={linkClass('/local-state-caching')}>Local state caching</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/transforming-props">
            <a className={linkClass('/transforming-props')}>Transforming props</a>
          </Link>
        </li>
        <li className="-ml-2 md:pr-4">
          <Link href="/server-side-rendering">
            <a className={linkClass('/server-side-rendering')}>Server-side rendering</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
