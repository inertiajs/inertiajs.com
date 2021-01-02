import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = ({ className }) => {
  const router = useRouter()

  function linkClass(path) {
    return router.pathname === path
      ? `block -ml-3 pl-3 pr-2 py-1 md:py-2 font-medium border-l-4 rounded-r border-purple-400 bg-purple-100 text-purple-700`
      : `inline-block py-1 md:py-2 hover:text-blue-700 hover:underline font-medium text-gray-700`
  }

  return (
    <nav className={className}>
      <div className="flex justify-center md:hidden -mx-6 mt-4 mb-6 pb-4 border-b">
        <a
          className="block flex items-center text-gray-500 hover:text-gray-700 mr-5"
          href="https://github.com/inertiajs"
        >
          <svg className="fill-current w-5 h-5" viewBox="0 0 20 20">
            <title>GitHub</title>
            <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0" />
          </svg>
        </a>
        <a
          className="block flex items-center text-gray-500 hover:text-gray-700 mr-5"
          href="https://twitter.com/inertiajs"
        >
          <svg className="fill-current w-5 h-5" viewBox="0 0 20 20">
            <title>Twitter</title>
            <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84" />
          </svg>
        </a>
        <a className="block flex items-center text-gray-500 hover:text-gray-700" href="https://discord.gg/gwgxN8Y">
          <svg className="fill-current w-5 h-5" viewBox="0 0 146 146">
            <title>Discord</title>
            <path
              d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
              fillRule="nonzero"
            />
          </svg>
        </a>
      </div>
      <ul>
        <li className="md:pr-3">
          <Link href="/">
            <a className={linkClass('/')}>Introduction</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/demo-application">
            <a className={linkClass('/demo-application')}>Demo app</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/sponsors">
            <a className={linkClass('/sponsors')}>Sponsors</a>
          </Link>
        </li>
      </ul>
      <div className="mt-8 md:mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Core concepts</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/who-is-it-for">
            <a className={linkClass('/who-is-it-for')}>Who is it for</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/how-it-works">
            <a className={linkClass('/how-it-works')}>How it works</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/the-protocol">
            <a className={linkClass('/the-protocol')}>The protocol</a>
          </Link>
        </li>
      </ul>
      <div className="mt-8 md:mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Installation</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/server-side-setup">
            <a className={linkClass('/server-side-setup')}>Server-side</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/client-side-setup">
            <a className={linkClass('/client-side-setup')}>Client-side</a>
          </Link>
        </li>
      </ul>
      <div className="mt-8 md:mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">The basics</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/routing">
            <a className={linkClass('/routing')}>Routing</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/responses">
            <a className={linkClass('/responses')}>Responses</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/pages">
            <a className={linkClass('/pages')}>Pages</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/links">
            <a className={linkClass('/links')}>Links</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/manual-visits">
            <a className={linkClass('/manual-visits')}>Manual visits</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/redirects">
            <a className={linkClass('/redirects')}>Redirects</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/forms">
            <a className={linkClass('/forms')}>Forms</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/validation">
            <a className={linkClass('/validation')}>Validation</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/shared-data">
            <a className={linkClass('/shared-data')}>Shared data</a>
          </Link>
        </li>
      </ul>
      <div className="mt-8 md:mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Advanced</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/events">
            <a className={linkClass('/events')}>Events</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/partial-reloads">
            <a className={linkClass('/partial-reloads')}>Partial reloads</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/scroll-management">
            <a className={linkClass('/scroll-management')}>Scroll management</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/authentication">
            <a className={linkClass('/authentication')}>Authentication</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/authorization">
            <a className={linkClass('/authorization')}>Authorization</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/csrf-protection">
            <a className={linkClass('/csrf-protection')}>CSRF protection</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/error-handling">
            <a className={linkClass('/error-handling')}>Error handling</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/asset-versioning">
            <a className={linkClass('/asset-versioning')}>Asset versioning</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/progress-indicators">
            <a className={linkClass('/progress-indicators')}>Progress indicators</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/remembering-state">
            <a className={linkClass('/remembering-state')}>Remembering state</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/transforming-props">
            <a className={linkClass('/transforming-props')}>Transforming props</a>
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/server-side-rendering">
            <a className={linkClass('/server-side-rendering')}>Server-side rendering</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
