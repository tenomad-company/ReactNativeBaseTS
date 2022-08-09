module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
          '@': './src',
          '@assets': 'assets',
          '@libs': 'libs',
          '@screens': './src/screens',
          '@components': './src/components',
          '@environment': './src/environments',
        },
      },
    ],
  ],
};
