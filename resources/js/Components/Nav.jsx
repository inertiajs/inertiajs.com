import { Link, usePage } from '@inertiajs/react'

const Nav = ({ className }) => {
  const page = usePage()

  function linkClass(path) {
    return (path === '/' && path === page.url) || (path !== '/' && page.url.startsWith(path))
      ? `block -ml-3 pl-3 pr-2 py-1 md:py-2 font-medium border-l-4 rounded-r border-purple-400 bg-purple-100 text-purple-700`
      : `inline-block py-1 md:py-2 hover:text-blue-700 hover:underline font-medium text-gray-700`
  }

  return (
    <nav className={className}>
      <div className="-mx-6 mt-4 mb-6 flex justify-center border-b pb-4 md:hidden">
        <a className="mr-5 flex items-center text-gray-500 hover:text-gray-700" href="https://github.com/inertiajs">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <title>GitHub</title>
            <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0" />
          </svg>
        </a>
        <a className="mr-5 flex items-center text-gray-500 hover:text-gray-700" href="https://twitter.com/inertiajs">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <title>Twitter</title>
            <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84" />
          </svg>
        </a>
        <a className="flex items-center text-gray-500 hover:text-gray-700" href="https://discord.gg/gwgxN8Y">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 146 146">
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
          <Link href="/" className={linkClass('/')}>
            Introduction
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/demo-application" className={linkClass('/demo-application')}>
            Demo app
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/upgrade-guide" className={linkClass('/upgrade-guide')}>
            Upgrade guide
          </Link>
        </li>
      </ul>
      <div className="mt-8 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 md:mt-12">Installation</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/server-side-setup" className={linkClass('/server-side-setup')}>
            Server-side
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/client-side-setup" className={linkClass('/client-side-setup')}>
            Client-side
          </Link>
        </li>
      </ul>
      <div className="mt-8 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 md:mt-12">Core concepts</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/who-is-it-for" className={linkClass('/who-is-it-for')}>
            Who is it for
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/how-it-works" className={linkClass('/how-it-works')}>
            How it works
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/the-protocol" className={linkClass('/the-protocol')}>
            The protocol
          </Link>
        </li>
      </ul>
      <div className="mt-8 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 md:mt-12">The basics</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/pages" className={linkClass('/pages')}>
            Pages
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/responses" className={linkClass('/responses')}>
            Responses
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/redirects" className={linkClass('/redirects')}>
            Redirects
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/routing" className={linkClass('/routing')}>
            Routing
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/title-and-meta" className={linkClass('/title-and-meta')}>
            Title & meta
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/links" className={linkClass('/links')}>
            Links
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/manual-visits" className={linkClass('/manual-visits')}>
            Manual visits
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/forms" className={linkClass('/forms')}>
            Forms
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/file-uploads" className={linkClass('/file-uploads')}>
            File uploads
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/validation" className={linkClass('/validation')}>
            Validation
          </Link>
        </li>
      </ul>
      <div className="mt-8 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 md:mt-12">
        Data &amp; Props
      </div>
      <ul>
        <li className="md:pr-3">
          <Link href="/shared-data" className={linkClass('/shared-data')}>
            Shared data
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/partial-reloads" className={linkClass('/partial-reloads')}>
            Partial reloads
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/deferred-props" className={linkClass('/deferred-props')}>
            Deferred props
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/polling" className={linkClass('/polling')}>
            Polling
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/prefetching" className={linkClass('/prefetching')}>
            Prefetching
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/load-when-visible" className={linkClass('/load-when-visible')}>
            Load when visible
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/merging-props" className={linkClass('/merging-props')}>
            Merging props
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/remembering-state" className={linkClass('/remembering-state')}>
            Remembering state
          </Link>
        </li>
      </ul>
      <div className="mt-8 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 md:mt-12">Security</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/authentication" className={linkClass('/authentication')}>
            Authentication
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/authorization" className={linkClass('/authorization')}>
            Authorization
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/csrf-protection" className={linkClass('/csrf-protection')}>
            CSRF protection
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/history-encryption" className={linkClass('/history-encryption')}>
            History encryption
          </Link>
        </li>
      </ul>
      <div className="mt-8 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 md:mt-12">Advanced</div>
      <ul>
        <li className="md:pr-3">
          <Link href="/asset-versioning" className={linkClass('/asset-versioning')}>
            Asset versioning
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/error-handling" className={linkClass('/error-handling')}>
            Error handling
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/events" className={linkClass('/events')}>
            Events
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/progress-indicators" className={linkClass('/progress-indicators')}>
            Progress indicators
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/scroll-management" className={linkClass('/scroll-management')}>
            Scroll management
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/server-side-rendering" className={linkClass('/server-side-rendering')}>
            Server-side rendering
          </Link>
        </li>
        <li className="md:pr-3">
          <Link href="/testing" className={linkClass('/testing')}>
            Testing
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
