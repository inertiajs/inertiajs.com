import React from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { SponsorNav } from '@/Components/Sponsors/SponsorNav'

const Nav = ({ className }) => {
  const page = usePage()

  function linkClass(path) {
    return (path === '/' && path === page.url) || (path !== '/' && page.url.startsWith(path))
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
        <a
          className="block flex items-center text-gray-500 hover:text-gray-700 mr-5"
          href="https://www.reddit.com/r/inertiajs"
        >
          <svg className="fill-current w-5 h-5" viewBox="0 0 24 24">
            <title>Reddit</title>
            <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
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
          <InertiaLink href="/" className={linkClass('/')}>
            Introduction
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/demo-application" className={linkClass('/demo-application')}>
            Demo app
          </InertiaLink>
        </li>
        {!page.props.userIsSponsor && (
          <li className="md:pr-3">
            <InertiaLink href="/sponsors" className={linkClass('/sponsors')}>
              Sponsors
            </InertiaLink>
          </li>
        )}
        <li className="md:pr-3">
          <InertiaLink href="/releases" className={linkClass('/releases')}>
            Releases
          </InertiaLink>
        </li>
      </ul>
      <SponsorNav />
      <div className="mt-8 md:mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Core concepts</div>
      <ul>
        <li className="md:pr-3">
          <InertiaLink href="/who-is-it-for" className={linkClass('/who-is-it-for')}>
            Who is it for
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/how-it-works" className={linkClass('/how-it-works')}>
            How it works
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/the-protocol" className={linkClass('/the-protocol')}>
            The protocol
          </InertiaLink>
        </li>
      </ul>
      <div className="mt-8 md:mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Installation</div>
      <ul>
        <li className="md:pr-3">
          <InertiaLink href="/server-side-setup" className={linkClass('/server-side-setup')}>
            Server-side
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/client-side-setup" className={linkClass('/client-side-setup')}>
            Client-side
          </InertiaLink>
        </li>
      </ul>
      <div className="mt-8 md:mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">The basics</div>
      <ul>
        <li className="md:pr-3">
          <InertiaLink href="/routing" className={linkClass('/routing')}>
            Routing
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/responses" className={linkClass('/responses')}>
            Responses
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/pages" className={linkClass('/pages')}>
            Pages
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/title-and-meta" className={linkClass('/title-and-meta')}>
            Title & meta
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/links" className={linkClass('/links')}>
            Links
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/manual-visits" className={linkClass('/manual-visits')}>
            Manual visits
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/redirects" className={linkClass('/redirects')}>
            Redirects
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/forms" className={linkClass('/forms')}>
            Forms
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/file-uploads" className={linkClass('/file-uploads')}>
            File uploads
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/validation" className={linkClass('/validation')}>
            Validation
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/shared-data" className={linkClass('/shared-data')}>
            Shared data
          </InertiaLink>
        </li>
      </ul>
      <div className="mt-8 md:mt-12 mb-3 text-xs font-bold uppercase text-gray-500 tracking-widest">Advanced</div>
      <ul>
        <li className="md:pr-3">
          <InertiaLink href="/events" className={linkClass('/events')}>
            Events
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/testing" className={linkClass('/testing')}>
            Testing
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/partial-reloads" className={linkClass('/partial-reloads')}>
            Partial reloads
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/scroll-management" className={linkClass('/scroll-management')}>
            Scroll management
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/authentication" className={linkClass('/authentication')}>
            Authentication
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/authorization" className={linkClass('/authorization')}>
            Authorization
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/csrf-protection" className={linkClass('/csrf-protection')}>
            CSRF protection
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/error-handling" className={linkClass('/error-handling')}>
            Error handling
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/asset-versioning" className={linkClass('/asset-versioning')}>
            Asset versioning
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/progress-indicators" className={linkClass('/progress-indicators')}>
            Progress indicators
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/remembering-state" className={linkClass('/remembering-state')}>
            Remembering state
          </InertiaLink>
        </li>
        <li className="md:pr-3">
          <InertiaLink href="/server-side-rendering" className={linkClass('/server-side-rendering')}>
            Server-side rendering
          </InertiaLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
