import { A, H1, H2, Li, Notice, P, Ul } from '@/Components'

export const meta = {
  title: 'Demo application',
  links: [
    { url: '#top', name: 'Official' },
    { url: '#third-party', name: 'Third party' },
  ],
}

export default function () {
  return (
    <>
      <H1>Demo application</H1>
      <P>
        We've setup a demo app for Inertia.js called <A href="https://demo.inertiajs.com">Ping CRM</A>. This application
        is built using Laravel and Vue. You can find the source code on{' '}
        <A href="https://github.com/inertiajs/pingcrm">GitHub</A>.
      </P>
      <Notice>
        The Ping CRM demo is hosted on Heroku and the database is reset every hour. Please be respectful when editing
        data.
      </Notice>
      <a href="https://demo.inertiajs.com">
        <img className="h-auto w-full rounded" src="/pingcrm.png" alt="Ping CRM" />
      </a>
      <P>
        In addition to the Vue version of Ping CRM, we also maintain a Svelte version of the application, which you can
        find <A href="https://github.com/inertiajs/pingcrm-svelte">on GitHub</A>.
      </P>
      <H2>Third party</H2>
      <P>
        Beyond our official demo app, Ping CRM has also been translated into numerous different languages and
        frameworks.
      </P>
      <Ul>
        <Li>
          <A href="https://github.com/ledermann/pingcrm/">Ruby on Rails/Vue</A> by Georg Ledermann
        </Li>
        <Li>
          <A href="https://github.com/Landish/pingcrm-react">Laravel/React</A> by Lado Lomidze
        </Li>
        <Li>
          <A href="https://github.com/zgabievi/pingcrm-svelte">Laravel/Svelte</A> by Zura Gabievi
        </Li>
        <Li>
          <A href="https://github.com/tbreuss/pingcrm-mithril">Laravel/Mithril.js</A> by Thomas Breuss
        </Li>
        <Li>
          <A href="https://github.com/tbreuss/pingcrm-yii2">Yii 2/Vue</A> by Thomas Breuss
        </Li>
        <Li>
          <A href="https://github.com/aleksblendwerk/pingcrm-symfony">Symfony/Vue</A> by Aleks Seltenreich
        </Li>
        <Li>
          <A href="https://github.com/prestancedesign/pingcrm-clojure">Clojure/React</A> by Michaël Salihi
        </Li>
      </Ul>
    </>
  )
}
