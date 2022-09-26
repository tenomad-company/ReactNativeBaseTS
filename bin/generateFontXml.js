const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootDir = path.join(__dirname, '/..');
const androidDir = path.join(rootDir, '/android');
const androidFontDir = path.join(androidDir, '/app/src/main/res/font');
const androidMainDir = path.join(androidDir, '/app/src/main/java');
const androidAssetFontDir = path.join(androidDir, '/app/src/main/assets/fonts');

// -------------------------- GENERATE XML --------------------------

function generateFontXml(rawFontName) {
  const fontName = rawFontName.toLowerCase();
  const xmlContent = `
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:app="http://schemas.android.com/apk/res-auto">
    <font app:fontStyle="normal" app:fontWeight="100" app:font="@font/${fontName}_thin" />
    <font app:fontStyle="italic" app:fontWeight="100" app:font="@font/${fontName}_thinitalic"/>
    <font app:fontStyle="normal" app:fontWeight="200" app:font="@font/${fontName}_extralight" />
    <font app:fontStyle="italic" app:fontWeight="200" app:font="@font/${fontName}_extralightitalic"/>
    <font app:fontStyle="normal" app:fontWeight="300" app:font="@font/${fontName}_light" />
    <font app:fontStyle="italic" app:fontWeight="300" app:font="@font/${fontName}_lightitalic"/>
    <font app:fontStyle="normal" app:fontWeight="400" app:font="@font/${fontName}_regular" />
    <font app:fontStyle="italic" app:fontWeight="400" app:font="@font/${fontName}_italic"/>
    <font app:fontStyle="normal" app:fontWeight="500" app:font="@font/${fontName}_medium" />
    <font app:fontStyle="italic" app:fontWeight="500" app:font="@font/${fontName}_mediumitalic"/>
    <font app:fontStyle="normal" app:fontWeight="600" app:font="@font/${fontName}_semibold" />
    <font app:fontStyle="italic" app:fontWeight="600" app:font="@font/${fontName}_semibolditalic"/>
    <font app:fontStyle="normal" app:fontWeight="700" app:font="@font/${fontName}_bold" />
    <font app:fontStyle="italic" app:fontWeight="700" app:font="@font/${fontName}_bolditalic"/>
    <font app:fontStyle="normal" app:fontWeight="800" app:font="@font/${fontName}_extrabold" />
    <font app:fontStyle="italic" app:fontWeight="800" app:font="@font/${fontName}_extrabolditalic"/>
    <font app:fontStyle="normal" app:fontWeight="900" app:font="@font/${fontName}_black" />
    <font app:fontStyle="italic" app:fontWeight="900" app:font="@font/${fontName}_blackitalic"/>
</font-family>
`;

  const isExisted = fs.existsSync(`${androidFontDir}/${fontName}.xml`);
  if (!isExisted) {
    fs.writeFile(
      `${androidFontDir}/${fontName}.xml`,
      xmlContent,
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log(`${fontName}.xml is generated`);
      },
    );
  }
}

// -------------------------- ADD FONTS TO ANDROID --------------------------

function addFontToMainApplication(rawFontName) {
  const fontName = rawFontName.toLowerCase();
  const mainAppPath = `${androidMainDir}/**/MainApplication.java`;

  glob(mainAppPath, function (err, files) {
    if (err) {
      return console.error(err);
    }

    const mainAppFile = files[0];
    const data = fs.readFileSync(mainAppFile, 'utf8');
    let content = data;

    const addLine = `ReactFontManager.getInstance().addCustomFont(this, "${rawFontName}", R.font.${fontName});`;
    if (!content.includes(addLine)) {
      console.log('[Font] Add code', addLine);
      content = content.replace(
        'super.onCreate();',
        `super.onCreate();\n    ${addLine}`,
      );
    } else {
      console.log(
        `[Font] [${rawFontName}] is already exist in MainApplication.java`,
      );
      return;
    }

    const importLine = 'import com.facebook.react.views.text.ReactFontManager;';
    if (!content.includes(importLine)) {
      console.log('[Font] Import', importLine);
      content = content.replace(
        'import com.facebook.react.ReactApplication;',
        `import com.facebook.react.ReactApplication;\n${importLine}`,
      );
    }

    fs.writeFileSync(mainAppFile, content, 'utf8');

    console.log(`[Font] [${rawFontName}] is added to MainApplication.java`);
  });
}

// --------------------------

function deleteDupplicateFonts(rawFontName) {
  fs.readdir(androidAssetFontDir, (err, files) => {
    if (err) {
      throw err;
    }

    for (const file of files) {
      if (file.includes(rawFontName)) {
        const filePath = path.join(androidAssetFontDir, file);
        fs.unlink(filePath, () => {});
      }
    }
  });
}

// -------------------------- EXECUTE --------------------------

const data = fs.readFileSync(`${rootDir}/assets/assets.json`, 'utf8');
const json = JSON.parse(data);

if (!json || !json.fonts) {
  console.error('[Font] Fonts is not defined in app.json!');
  return;
}

for (const font of json.fonts) {
  generateFontXml(font);
  addFontToMainApplication(font);
  deleteDupplicateFonts(font);
}
