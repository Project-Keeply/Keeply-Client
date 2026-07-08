import { config as baseConfig } from './eslint/base.js'
import { config as reactConfig } from './eslint/react.js'

export default [
  { ignores: ['.history/**', 'src/shared/types/schema.d.ts'] },
  ...baseConfig,
  ...reactConfig,
]
