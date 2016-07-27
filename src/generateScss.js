const mapIcons = require('./mapIcons');
const mapColors = require('./mapColors');

const fontFaceScss = fontName => `
  @font-face {
    font-family: "${fontName}";
    src: url('./${fontName}.woff');
  }
`;

const baseClassScss = (fontName, baseClass) => `
  .${baseClass}:before {
    font-family: "${fontName}" !important;
    font-style: normal;
    font-weight: normal !important;
    font-size: 1rem;
    vertical-align: top;
  }
`;

const iconScss = (icon, codepoint, color) => `
  .${icon} {
    ${
      color ? `color: ${color};\n    ` : ''
    }&:before {
      content: '\\${codepoint}';
      margin-right: .25em;
    }
  }
`;

const codepointsScss = codepoints =>
  Object.keys(codepoints).reduce(
    (scss, icon, index) => {
      const newIconScss = iconScss(icon, codepoints[icon], mapColors[icon]);
      const allIconScss = `${scss}${newIconScss}`;
      const mappedIcons = mapIcons[icon];
      if (mappedIcons) {
        const mappedIconsScss = mappedIcons.map(
          mappedIcon =>
            iconScss(
              mappedIcon,
              codepoints[icon],
              mapColors[mappedIcon] || mapColors[icon]
            )
        ).join('');
        return `${allIconScss}${mappedIconsScss}`;
      }

      return allIconScss;
    }, ''
  );

module.exports = ({ fontName, codepoints, baseClass }) => `
${fontFaceScss(fontName)}
${baseClassScss(fontName, baseClass)}
${codepointsScss(codepoints)}
`;
