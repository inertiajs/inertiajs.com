import React from 'react'
import release from '@/Utils/release'
import { A, Code, Li, Ul } from '@/Components'

export default release(
  <>
    <Ul>
      <Li>
        Added <Code>Arrayable</Code> support for props (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/39">#39</A>).
      </Li>
      <Li>
        Replaced <Code>array_only</Code> with <Code>Arr::only</Code> (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/68">#68</A>).
      </Li>
      <Li>
        Fixed wildcard URLs used with route macro (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/69">#69</A>).
      </Li>
      <Li>
        Updated to always return a response object (
        <A href="https://github.com/inertiajs/inertia-laravel/pull/44">#44</A>).
      </Li>
    </Ul>
  </>
)
