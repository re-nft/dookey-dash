const path = require('path');

module.exports = {
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/': path.resolve(__dirname, '../'),
    };
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  stories: [
    //'../__stories__/**/*.stories.mdx',
    //'../__stories__/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/__stories__/**/*.mdx',
    '../components/**/__stories__/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../public'],
};
