import React from 'react'
import { A, H1, H2, Layout } from '@/Components'

const meta = {
  title: 'Releases',
  links: [
    { url: '#inertia', name: 'inertia' },
    { url: '#inertia-vue', name: 'inertia-vue' },
    { url: '#inertia-vue3', name: 'inertia-vue3' },
    { url: '#inertia-react', name: 'inertia-react' },
    { url: '#inertia-svelte', name: 'inertia-svelte' },
    { url: '#inertia-laravel', name: 'inertia-laravel' },
    { url: '#progress', name: 'progress' },
  ],
}

const Page = ({ releases }) => {
  const libraries = [
    'inertia',
    'inertia-vue',
    'inertia-vue3',
    'inertia-react',
    'inertia-svelte',
    'inertia-laravel',
    'progress',
  ]

  return (
    <>
      <H1>Releases</H1>
      {libraries.map(library => (
        <div key={library}>
          <H2>{library}</H2>
          <ul>
            {releases
              .filter(release => release.library === library)
              .map(release => (
                <li key={release.slug}>
                  <A href={`/releases/${release.slug}`}>v{release.version}</A>
                  <span className="ml-2 text-sm text-gray-600">({release.date})</span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
