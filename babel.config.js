module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        root: ['./'],
        alias: {
          '@': './src',
          '@Assets': './assets',
          '@Api': './src/api',
          '@Components': './src/components',
          '@Constants': './src/constants',
          '@Hooks': './src/hooks',
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
