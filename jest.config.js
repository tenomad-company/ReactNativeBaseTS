module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(@react-native-community|@unimodules/.*|native-base|react-native-code-push)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '/e2e', '@react-native'],
  setupFiles: ['<rootDir>/test/setup.ts'],
};
