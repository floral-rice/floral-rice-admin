import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import path from 'node:path'

const tsconfigRootDir = path.resolve()

export default [
  // 忽略的文件
  {
    ignores: [
      'node_modules/**',
      '.ignored_node_modules/**',
      'dist/**',
      '*.d.ts',
      '*.config.js',
      '*.config.ts',
      '.prettierrc.js',
    ],
  },

  // JS 推荐规则
  js.configs.recommended,

  // TypeScript type-checked 推荐规则
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        project: ['./tsconfig.eslint.json'], // 指向包含 .vue 的 tsconfig
        tsconfigRootDir,
        extraFileExtensions: ['.vue'],
      },
    },
  })),

  // Vue 推荐规则
  ...vue.configs['flat/recommended'],

  // Vue 文件 parser 配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir,
        extraFileExtensions: ['.vue'],
      },
    },
  },

  // 自定义规则
  {
    rules: {
      // JS/TS
      'no-console': 'off',
      'no-param-reassign': 'off',
      'no-useless-assignment': 'off', // 关闭 no-useless-assignment 规则，因为 Vue 模板中使用的变量会被误报
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/await-thenable': 'error',

      // TypeScript unsafe 系列只提示 warn
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // 关闭默认 JS unused-vars，TS 用 warn
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],

      // Vue 模板绑定变量检查
      'vue/no-unused-vars': 'warn',
      
      // Vue 组件命名规则：允许单字组件名（如 index.vue）
      'vue/multi-word-component-names': 'off',
      
      // Vue 模板根节点规则：允许多个根节点（Vue 3 支持）
      'vue/valid-template-root': 'off',
    },
  },
]
