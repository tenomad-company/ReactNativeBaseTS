#!/usr/bin/env node
/**
 * Do all things that need to be done after installing packages (with yarn, npm, pnpm).
 *
 * Yes, it slows down package installation a little, but it's nice to not
 * have to remember these extra steps.
 */

// Run husky - enable git hook
run('npx husky install');

// Patch any packages that need patching
run('npx patch-package');

// Kill the metro bundler if it's running.
if (['darwin', 'linux'].includes(process.platform)) {
  run('pkill -f "cli.js start" || set exit 0');
}

// Make sure our Android native modules are androidX-happy
run('npx jetify');

run('react-native link');
run('./bin/setupAndroidFonts');

// On iOS, make sure CocoaPods are installed
if (process.platform === 'darwin') {
  run('if [ -d "ios" ]; then cd ios && pod install && cd -; fi');
}

// Run command
function run(command) {
  console.log(`* [PostInstall] running: ${command}`);

  try {
    require('child_process').execSync(command, {stdio: 'inherit'});
  } catch (error) {
    console.error(`* [PostInstall] failed on command:\n  ${command}`);
    process.exit(error.status);
  }
}
