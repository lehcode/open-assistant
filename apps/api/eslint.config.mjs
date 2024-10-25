import nestjs from "eslint-plugin-nestjs";
import baseConfig from '../eslint.config.js';

const config = [...baseConfig];

config.plugins = { ...baseConfig.plugins, nestjs }

config.rules = {
  ...baseConfig.rules,
  ...nestjs.rules['flat/recommended'],
  '@nx/enforce-module-boundaries': [
    'error',
    {
      enforceBuildableLibDependency: true,
      allow: [
        '^../libs/(.+)$',
      ],
      depConstraints: [
        {
          sourceTag: '*',
          onlyDependOnLibsWithTags: ['*'],
        },
      ],
    },
  ]
}

export default config
