import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {structure} from './structure'
import {schema} from './schemaTypes'

import {muxInput} from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'default',
  title: 'sebastian-brameshuber-studio',

  projectId: 'dr8rcph3',
  dataset: 'production',

  schema,

  plugins: [structureTool({structure}), visionTool(), muxInput()],
})
