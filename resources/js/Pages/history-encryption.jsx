import { A, Code, H1, H2, H3, Notice, P, TabbedCode } from '@/Components'
import dedent from 'dedent-js'

export const meta = {
  title: 'History encryption',
  links: [
    { url: '#top', name: 'Introduction' },
    { url: '#how-it-works', name: 'How it works' },
    { url: '#opting-in', name: 'Opting in' },
    { url: '#clearing-history', name: 'Clearing history' },
  ],
}

export default function () {
  return (
    <>
      <H1>History encryption</H1>
      <P>
        Imagine a scenario where your user is authenticated, browses privileged information on your site, then logs
        out. If they press the back button, they can still see the privileged information that is stored in the window's
        history state. This is a security risk. To prevent this, Inertia.js provides a history encryption feature.
      </P>
      <H2>How it works</H2>
      <P>
        When you instruct Inertia to encrypt your app's history, it uses the browser's built-in{' '}
        <A target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto">
          <Code>crypto</Code> api
        </A>{' '}
        to encrypt the current page's data before pushing it to the history state. We store the corresponding key in the
        browser's session storage. When the user navigates back to a page, we decrypt the data using the key stored in
        the session storage.
      </P>
      <P>
        Once you instruct Inertia to clear your history state, we simply clear the existing key from session storage
        roll a new one. If we attempt to decrypt the history state with the new key, it will fail and Inertia will make
        a fresh request back to your server for the page data.
      </P>
      <Notice>
        History encryption relies on <Code>window.crypto.subtle</Code> which is only available in secure environments
        (sites with SSL enabled).
      </Notice>
      <H2>Opting in</H2>
      <P>History encryption is an opt-in feature. There are several methods for enabling it:</P>
      <H3>Global encryption</H3>
      <P>
        If you'd like to enable history encryption globally, set the <Code>inertia.history.encrypt</Code> config value
        to <Code>true</Code>.
      </P>
      <P>
        You are able to opt out of encryption on specific pages by calling the <Code>encryptHistory</Code> method before
        returning the response:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              Inertia::encryptHistory(false);
            `,
          },
        ]}
      />
      <H3>Per-request encryption</H3>
      <P>
        To encrypt the history of an individual request, simply call the <Code>encryptHistory</Code> method before
        returning the response:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
              Inertia::encryptHistory();
            `,
          },
        ]}
      />
      <H3>Encrypt middleware</H3>
      <P>
        To encrypt a group of routes, Inertia provides the <Code>EncryptHistoryMiddleware</Code> as a convenience.
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
            Route::middleware([Inertia\\EncryptHistoryMiddleware::class])->get('/', function() {
                //
            });

            Route::middleware(['inertia::encrypt'])->get('/', function() {
                //
            });
            `,
          },
        ]}
      />
      <H2>Clearing history</H2>
      <P>
        To clear the history state, you can call the <Code>clearHistory</Code> method before returning the response:
      </P>
      <TabbedCode
        examples={[
          {
            name: 'Laravel',
            language: 'php',
            code: dedent`
                  Inertia::clearHistory();
                `,
          },
        ]}
      />
      <P>
        Once the response has rendered on the client, the encryption key will be rotated, rendering the previous history
        state unreadable.
      </P>
      <P>
        You can also clear history on the client site by calling <Code>router.clearHistory()</Code>.
      </P>
    </>
  )
}
