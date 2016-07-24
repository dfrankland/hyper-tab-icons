const glob = require('glob');
const { resolve: resolvePath } = require('path');
const webfontsGenerator = require('webfonts-generator');
const { emptyDirSync, writeFileSync } = require('fs-extra');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const generateScss = require('../src/generateScss');

const NAME = require('../package.json').name;
const DIST = resolvePath(__dirname, '../dist');
const TMP = resolvePath(__dirname, '../tmp');
const SRC = resolvePath(__dirname, '../src');

const OPTIONS = {
  fontName: NAME,
  fixedWidth: true,
  cssTemplate: resolvePath(SRC, `./generateCodepoints.hbs`),
  types: ['woff'],
  dest: '',
  writeFiles: false,
};

const throwError = err => {
  if (err) throw err;
};

const bundle = () => {
  const newWebpackConfig = Object.assign(
    {},
    webpackConfig,
    {
      context: TMP,
      entry: `./${NAME}.js`,
      output: {
        filename: `./${NAME}.js`,
        libraryTarget: 'commonjs2',
        path: DIST,
        publicPath: TMP,
      },
    }
  );
  emptyDirSync(DIST);
  webpack(newWebpackConfig)
    .run(
      (webpackError, stats) => {
        throwError(webpackError);
        console.log(stats.toString(webpackConfig.stats));
      }
    );
};

const generateFonts = () => {
  webfontsGenerator(
    OPTIONS,
    (webfontsGeneratorError, results) => {
      throwError(webfontsGeneratorError);
      emptyDirSync(TMP);
      writeFileSync(
        resolvePath(TMP, `./${NAME}.woff`),
        results.woff
      );
      const codepoints = eval(`(${results.generateCss()})`);
      const scss = generateScss({
        fontName: NAME,
        codepoints,
        baseClass: 'ti',
      });
      writeFileSync(
        resolvePath(TMP, `./${NAME}.scss`),
        scss
      );
      writeFileSync(
        resolvePath(TMP, `./${NAME}.js`),
        `module.exports = require('./${NAME}.scss');`
      );
      bundle();
    }
  );
};

glob(
  resolvePath(SRC, './icons/*.svg'),
  (globError, matches) => {
    throwError(globError);
    OPTIONS.files = matches;
    generateFonts();
  }
);
