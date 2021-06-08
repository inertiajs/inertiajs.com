import React from 'react'
import dedent from 'dedent-js'
import release from '@/Utils/release'
import { A, CodeBlock, P } from '@/Components'

export default release(
  <>
    <P>
      This release adds the ability to nest props using dot notation (
      <A href="https://github.com/inertiajs/inertia-laravel/commit/f316b80d55f51e0bf6f69803ddfb5aa14a142d8b">commit</A>
      ). This allows you to modify a globally shared prop from within a specific controller.
    </P>
    <CodeBlock
      language="php"
      children={dedent`
        class ProjectsController
        {
            public function index()
            {
                return Inertia::render('Projects/Index', [
                    'projects' => Project::all(),\n
                    // Add a new permission check to the shared "auth.user" object for this endpoint.
                    'auth.user.can.create_projects' => Auth::user()->can('create', Project::class),
                ]);
            }
        }
      `}
    />
  </>
)
