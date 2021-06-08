import React from 'react'
import release from '@/Utils/release'
import { A, Code, P } from '@/Components'

export default release(
  <>
    <P>
      Add new <Code>Inertia::location($url)</Code> method for performing full page visits, client-side, using{' '}
      <Code>location.href</Code> (<A href="https://github.com/inertiajs/inertia-laravel/pull/154">#154</A>).
    </P>
  </>
)
