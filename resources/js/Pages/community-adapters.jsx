import { A, H1, Li, P, Ul } from '@/Components'

export const meta = {
  title: 'Community adapters',
}

export default function () {
  return (
    <>
      <H1>Community adapters</H1>
      <P>
        In addition to the officially supported <A href="https://laravel.com/">Laravel</A> adapter, there are also
        numerous community built server-side adapters available:
      </P>
      <Ul>
        <Li>
          <A href="https://github.com/inertiajs/inertia-rails">Rails</A>
        </Li>
        <Li>
          <A href="https://docs.adonisjs.com/guides/inertia">AdonisJS</A>
        </Li>
        <Li>
          <A href="https://github.com/kapi2289/InertiaCore">ASP.NET</A>
        </Li>
        <Li>
          <A href="https://github.com/ishanvyas22/cakephp-inertiajs">CakePHP</A>
        </Li>
        <Li>
          <A href="https://github.com/cherifGsoul/inertia-can">CanJS</A>
        </Li>
        <Li>
          <A href="https://github.com/prestancedesign/inertia-clojure">Clojure</A>
        </Li>
        <Li>
          <A href="https://github.com/amiranagram/inertia-codeigniter-4">CodeIgniter4</A>
        </Li>
        <Li>
          <A href="https://github.com/elpete/cbInertia">ColdBox</A>
        </Li>
        <Li>
          <A href="https://pypi.org/project/inertia-django/">Django</A>
        </Li>
        <Li>
          <A href="https://github.com/j0ack/flask-inertia">Flask</A>
        </Li>
        <Li>
          <A href="https://github.com/petaki/inertia-go">Go (inertia-go)</A>
        </Li>
        <Li>
          <A href="https://github.com/romsar/gonertia">Go (gonertia)</A>
        </Li>
        <Li>
          <A href="https://github.com/tobimori/kirby-inertia">Kirby CMS</A>
        </Li>
        <Li>
          <A href="https://github.com/girardinsamuel/masonite-inertia/">Masonite</A>
        </Li>
        <Li>
          <A href="https://github.com/tbreuss/inertia-mithril">Mithril.js</A>
        </Li>
        <Li>
          <A href="https://github.com/inertiajs/inertia-phoenix">Phoenix</A>
        </Li>
        <Li>
          <A href="https://github.com/cherifGsoul/inertia-psr15">PSR-15</A>
        </Li>
        <Li>
          <A href="https://kaiofelps.github.io/inertia-rust/">Rust</A>
        </Li>
        <Li>
          <A href="https://github.com/skipthedragon/inertia-bundle">Symfony</A>
        </Li>
        <Li>
          <A href="https://github.com/evo-mark/inertia-wordpress">WordPress</A>
        </Li>
        <Li>
          <A href="https://github.com/tbreuss/yii2-inertia">Yii2</A>
        </Li>
      </Ul>
      <P>
        If you have an adapter you'd like listed here, please send a{' '}
        <A href="https://github.com/inertiajs/inertiajs.com/edit/master/resources/js/Pages/community-adapters.jsx">
          pull request
        </A>
        .
      </P>
    </>
  )
}
