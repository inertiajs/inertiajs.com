import Link from 'next/link'

export default ({ className }) => (
  <nav className={className}>
    <div className="text-xs font-bold uppercase text-gray-500 tracking-widest">Getting started</div>
    <ul>
      <li className="mt-4">
        <Link href="/">
          <a className="hover:underline font-medium text-gray-700">Introduction</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/installation">
          <a className="hover:underline font-medium text-gray-700">Installation</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/server-side-setup">
          <a className="hover:underline font-medium text-gray-700">Server-side setup</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/client-side-setup">
          <a className="hover:underline font-medium text-gray-700">Client-side setup</a>
        </Link>
      </li>
    </ul>
    <div className="mt-12 text-xs font-bold uppercase text-gray-500 tracking-widest">Core concepts</div>
    <ul>
      <li className="mt-4">
        <Link href="/routing">
          <a className="hover:underline font-medium text-gray-700">Routing</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/responses">
          <a className="hover:underline font-medium text-gray-700">Responses</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/requests">
          <a className="hover:underline font-medium text-gray-700">Requests</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/redirects">
          <a className="hover:underline font-medium text-gray-700">Redirects</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/pages">
          <a className="hover:underline font-medium text-gray-700">Pages</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/links">
          <a className="hover:underline font-medium text-gray-700">Links</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/forms">
          <a className="hover:underline font-medium text-gray-700">Forms</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/file-uploads">
          <a className="hover:underline font-medium text-gray-700">File uploads</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/shared-data">
          <a className="hover:underline font-medium text-gray-700">Shared data</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/csrf-protection">
          <a className="hover:underline font-medium text-gray-700">CSRF protection</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/authorization">
          <a className="hover:underline font-medium text-gray-700">Authorization</a>
        </Link>
      </li>
    </ul>
    <div className="mt-12 text-xs font-bold uppercase text-gray-500 tracking-widest">Advanced</div>
    <ul>
      <li className="mt-4">
        <Link href="/error-handling">
          <a className="hover:underline font-medium text-gray-700">Error handling</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/asset-versioning">
          <a className="hover:underline font-medium text-gray-700">Asset versioning</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/local-state-caching">
          <a className="hover:underline font-medium text-gray-700">Local state caching</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/transforming-props">
          <a className="hover:underline font-medium text-gray-700">Transforming props</a>
        </Link>
      </li>
      <li className="mt-4">
        <Link href="/server-side-rendering">
          <a className="hover:underline font-medium text-gray-700">Server-side rendering</a>
        </Link>
      </li>
    </ul>
  </nav>
)
