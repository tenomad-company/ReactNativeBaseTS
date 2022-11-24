module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',

      {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        root: ['./'],
        alias: {
          '@Assets': './assets',
          '@Api': './src/api',
          '@Components': './src/components',
          '@Constants': './src/constants',
          '@Hooks': './src/hooks',
          '@Language': './src/language',
          '@Models': './src/models',
          '@Navigations': './src/navigations',
          '@Redux': './src/redux',
          '@Screens': './src/screens',
          '@Styles': './src/styles',
          '@Utils': './src/utils',
        },
      },
    ],
  ],
};
