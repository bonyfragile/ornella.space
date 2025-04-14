import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import { media } from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'ornella-studio',

  projectId: 'f588b6e1',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), media(),],

  schema: {
    types: schemaTypes,
  },
})
