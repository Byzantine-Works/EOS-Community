// dependencies
const fs = window.require('fs');
const path = window.require('path');
const util = window.require('util');

/**
 * We use the JSON5 library instead of JavaScript's default JSON object for JSON5 support (allows commenting)
 */
const JSON5 = require('json5');

// exports
export const Themes = {
  cobalt2: 'cobalt2.json',
};

export const loadTheme = (theme) => {
  console.log(path.join(__dirname));

  // const pathresolveP = util.promisify(path.resolve);

  const filePath = path.resolve(`./src/themes/${theme}`);
  console.log('filePath in generator.js: ', filePath)
  // const filePath = `./src/themes/${theme}`;
  // const filePath = path.resolve(__dirname,`${theme}`);
  // const filePath = path.join(__dirname,`${theme}`);
  const original = JSON5.parse(fs.readFileSync(filePath));


  const parsed = {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: original.colors,
  };

  for (let i = 0; i < original.tokenColors.length; i += 1) {
    const tokenInfo = original.tokenColors[i];
    const scopeArr = Array.isArray(tokenInfo.scope) ? tokenInfo.scope : [tokenInfo.scope];
    for (let j = 0; j < scopeArr.length; j += 1) {
      const scope = scopeArr[j];
      // console.log(`scope: ${scope}`);

      let rule = Object.assign({}, tokenInfo.settings);
      rule = JSON.parse(JSON.stringify(rule).replace('#', ''));
      rule.token = scope;

      parsed.rules.push(rule);
    }
  }

  return parsed;
};
