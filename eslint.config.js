import { config as baseConfig } from './eslint/base.js'
import { config as reactConfig } from './eslint/react.js'

export default [
  { ignores: ['.history/**'] },
  ...baseConfig,
  ...reactConfig,
]
