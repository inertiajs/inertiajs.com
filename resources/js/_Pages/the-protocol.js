import dedent from 'dedent-js'
import Layout from '../Components/Layout'
import Notice from '../Components/Notice'
import Code from '../Components/Code'

const meta = {
  title: 'The protocol',
  links: [
    { url: '#html-responses', name: 'HTML responses' },
    { url: '#inertia-responses', name: 'Inertia responses' },
    { url: '#the-page-object', name: 'The page object' },
    { url: '#asset-versioning', name: 'Asset versioning' },
    { url: '#partial-reloads', name: 'Partial reloads' },
  ],
}

<H1>The protocol</H1>

The following is a detailed spec of the Inertia protocol. Be sure to read the [how it works](/how-it-works) page first for a high-level overview.

<H2>HTML responses</H2>

The very first request to an Inertia app is just a regular full-page browser request, with no special Inertia headers or data. For these requests, the server returns a full HTML document.

This HTML response includes the site assets (CSS, JavaScript) as well as a root `<div>` in the body. The root `<div>` serves as a mounting point for the client-side app, and includes a `data-page` attribute with a JSON encoded [page object](#the-page-object) for the initial page. Inertia uses this information to boot your client-side framework, and display the initial page component.

<div className="rounded overflow-hidden" style={{ background: '#202e59' }}>
  <div className="pt-6 px-6 text-white font-mono text-sm">
    <div className="text-gray-600 font-bold text-xs uppercase">Request</div>
    <div className="mt-1">
      <span className="text-blue-400">GET:</span> http://example.com/events/80
    </div>
    <div>
      <span className="text-blue-400">Accept:</span> text/html, application/xhtml+xml
    </div>
    <div className="mt-8 text-gray-600 font-bold text-xs uppercase">Response</div>
    <div className="mt-1">HTTP/1.1 200 OK</div>
    <div>
      <span className="text-blue-400">Content-Type:</span> text/html; charset=utf-8
    </div>
  </div>
  <Code className="p-6 leading-normal" language="html">
    {dedent`
      <html>
      <head>
          <title>My app</title>
          <link href="/css/app.css" rel="stylesheet">
          <script src="/js/app.js" defer></script>
      </head>
      <body>\n
      <div id="app" data-page='{"component":"Event","props":{"event":{"id":80,"title":"Birthday party","start_date":"2019-06-02","description":"Come out and celebrate Jonathan&apos;s 36th birthday party!"}},"url":"/events/80","version":"c32b8e4965f418ad16eaebba1d4e960f"}'></div>\n
      </body>
      </html>
    `}
  </Code>
</div>

<Notice>While the initial response is HTML, Inertia does not server-side render the JavaScript page components.</Notice>

<H2>Inertia responses</H2>

Once an Inertia app has been booted, all subsequent requests to the site are made via XHR with a special `X-Inertia` header set to `true`. This header indicates that the request is being made by Inertia, and isn't a standard full-page visit.

When the server detects the `X-Inertia` header, instead of responding with a full HTML document, it returns a JSON response with an encoded [page object](#the-page-object).

<div className="rounded overflow-hidden" style={{ background: '#202e59' }}>
  <div className="pt-6 px-6 text-white font-mono text-sm">
    <div className="text-gray-600 font-bold text-xs uppercase">Request</div>
    <div className="mt-1">
      <span className="text-blue-400">GET:</span> http://example.com/events/80
    </div>
    <div>
      <span className="text-blue-400">Accept:</span> text/html, application/xhtml+xml
    </div>
    <div>
      <span className="text-blue-400">X-Requested-With:</span> XMLHttpRequest
    </div>
    <div>
      <span className="text-blue-400">X-Inertia:</span> true
    </div>
    <div>
      <span className="text-blue-400">X-Inertia-Version:</span> 6b16b94d7c51cbe5b1fa42aac98241d5
    </div>
    <div className="mt-8 text-gray-600 font-bold text-xs uppercase">Response</div>
    <div className="mt-1">HTTP/1.1 200 OK</div>
    <div>
      <span className="text-blue-400">Content-Type:</span> application/json
    </div>
    <div>
      <span className="text-blue-400">Vary:</span> Accept
    </div>
    <div>
      <span className="text-blue-400">X-Inertia:</span> true
    </div>
  </div>
  <Code className="p-6 leading-normal" language="json">
    {dedent`
      {
        "component": "Event",
        "props": {
          "event": {
            "id": 80,
            "title": "Birthday party",
            "start_date": "2019-06-02",
            "description": "Come out and celebrate Jonathan's 36th birthday party!"
          }
        },
        "url": "/events/80",
        "version": "c32b8e4965f418ad16eaebba1d4e960f"
      }
    `}
  </Code>
</div>

<H2>The page object</H2>

Inertia shares data between the server and client via a page object. This object includes the necessary information required to render the page component, update the history state, and track the site's asset version. The page object includes the following four properties:

1. **component**: The name of the JavaScript page component.
2. **props**: The page props (data).
3. **url**: The page url.
4. **version**: The current asset version.

On standard full page visits, the page object is JSON encoded into the `data-page` attribute in the root `<div>`. On Inertia visits, the page object is returned as the JSON payload.

<H2>Asset versioning</H2>

One common challenge with single-page apps is refreshing site assets when they've been changed. Inertia makes this easy by optionally tracking the current version of the site's assets. In the event that an asset changes, Inertia will automatically make a hard (full) page visit instead of an XHR visit.

Included in the [page object](#the-page-object) is a `version` identifier. This version identifier is set server-side, and can be a number, string, file hash, whatever. It doesn't matter, as long as it changes when the site's assets have been updated.

Whenever an Inertia request is made, Inertia will include the current asset version in the `X-Inertia-Version` header. When the server receives the request, it compares the asset version provided in the `X-Inertia-Version` header with the current asset version. This is typically handled in a middleware layer.

If the asset versions are the same, the request simply continues as expected. However, if they are different, the server immediately returns a `409 Conflict` response, and includes the URL in a `X-Inertia-Location` header. This header is necessary, since server-side redirects may have occurred. This tells Inertia what the final intended destination URL is.

Note, `409 Conflict` responses are only sent for `GET` requests, and not for `POST/PUT/PATCH/DELETE` requests. That said, they will be sent in the event that a `GET` redirect occurs after one of these requests.

Finally, in the event that flash session data exists when a `409 Conflict` response occurs, the server will automatically reflash this data.

<div className="rounded overflow-hidden" style={{ background: '#202e59' }}>
  <div className="p-6 text-white font-mono text-sm">
    <div className="text-gray-600 font-bold text-xs uppercase">Request</div>
    <div className="mt-1">
      <span className="text-blue-400">GET:</span> http://example.com/events/80
    </div>
    <div>
      <span className="text-blue-400">Accept:</span> text/html, application/xhtml+xml
    </div>
    <div>
      <span className="text-blue-400">X-Requested-With:</span> XMLHttpRequest
    </div>
    <div>
      <span className="text-blue-400">X-Inertia:</span> true
    </div>
    <div>
      <span className="text-blue-400">X-Inertia-Version:</span> 6b16b94d7c51cbe5b1fa42aac98241d5
    </div>
    <div className="mt-8 text-gray-600 font-bold text-xs uppercase">Response</div>
    <div className="mt-1">409: Conflict</div>
    <div>
      <span className="text-blue-400">X-Inertia-Location:</span> http://example.com/events/80
    </div>
  </div>
</div>

<H2>Partial reloads</H2>

When making Inertia requests, the partial reloads option allows you to request a subset of the props (data) from the server on subsequent visits to the _same_ page component. This can be a helpful performance optimization if it's acceptable that some page data becomes stale.

When a partial reload request is made, Inertia includes two additional headers with the request: `X-Inertia-Partial-Data` and `X-Inertia-Partial-Component`.

The `X-Inertia-Partial-Data` header is a comma separated list of the desired props (data) keys that should be returned.

The `X-Inertia-Partial-Component` header includes the name of the component that is being partially reloaded. This is necessary, since partial reloads only work for requests made to the same page component. If the final destination is different for whatever reason (eg. the user was logged out and is now on the login page), then no partial reloading will occur.

<div className="rounded overflow-hidden" style={{ background: '#202e59' }}>
  <div className="pt-6 px-6 text-white font-mono text-sm">
    <div className="text-gray-600 font-bold text-xs uppercase">Request</div>
    <div className="mt-1">
      <span className="text-blue-400">GET:</span> http://example.com/events
    </div>
    <div>
      <span className="text-blue-400">Accept:</span> text/html, application/xhtml+xml
    </div>
    <div>
      <span className="text-blue-400">X-Requested-With:</span> XMLHttpRequest
    </div>
    <div>
      <span className="text-blue-400">X-Inertia:</span> true
    </div>
    <div>
      <span className="text-blue-400">X-Inertia-Version:</span> 6b16b94d7c51cbe5b1fa42aac98241d5
    </div>
    <div>
      <span className="text-blue-400">X-Inertia-Partial-Data:</span> events
    </div>
    <div>
      <span className="text-blue-400">X-Inertia-Partial-Component:</span> Events
    </div>
    <div className="mt-8 text-gray-600 font-bold text-xs uppercase">Response</div>
    <div className="mt-1">HTTP/1.1 200 OK</div>
    <div>
      <span className="text-blue-400">Content-Type:</span> application/json
    </div>
  </div>
  <Code className="p-6 leading-normal" language="json">
    {dedent`
      {
        "component": "Events",
        "props": {
          "auth": {...},       // NOT included
          "categories": [...], // NOT included
          "events": [...]      // included
        },
        "url": "/events/80",
        "version": "c32b8e4965f418ad16eaebba1d4e960f"
      }
    `}
  </Code>
</div>

const Page = () => {
  return (
    <>
    </>
  )
}

Page.layout = (page) => <Layout children={page} meta={meta} />

export default Page
