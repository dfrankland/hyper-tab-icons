const React = require('react');
const { filter } = require('fuzzaldrin');

const NAME = require('./package.json').name;

// Register at least 1 service... Won't load without this.
exports.decorateConfig = config => config;

let activeStyle = { transition: 'opacity 200ms ease-in' };
let inactiveStyle = Object.assign({}, activeStyle, { opacity: 0.3 });
let mapIcons = {};
let mapColors = {};
let disableColors = false;
let processNameMatch = 1;
let processNameRegex = /^(.*?) /;
const loadConfig = () => {
  const config = window.config.getConfig();
  if (config.tabIcons) {
    if (config.tabIcons.activeStyle) activeStyle = config.tabIcons.activeStyle;
    if (config.tabIcons.inactiveStyle) inactiveStyle = config.tabIcons.inactiveStyle;
    if (config.tabIcons.mapIcons) mapIcons = config.tabIcons.mapIcons;
    if (config.tabIcons.mapColors) mapColors = config.tabIcons.mapColors;
    if (config.tabIcons.disableColors) disableColors = true;
    if (config.tabIcons.processNameMatch) processNameMatch = config.tabIcons.processNameMatch;
    if (config.tabIcons.processNameRegex) {
      processNameRegex = new RegExp(
        config.tabIcons.processNameRegex.source,
        config.tabIcons.processNameRegex.flags
      );
    }
  }
};

let icons;
let classes;
const loadIcons = () => {
  if (!icons) {
    loadConfig();
    icons = require(`./dist/${NAME}.js`);
    Object.keys(mapIcons).forEach(
      mapIcon => {
        mapIcons[mapIcon].forEach(
          icon => {
            icons[icon] = icons[mapIcon];
            if (!mapColors[icon]) {
              mapColors[icon] = mapColors[mapIcon];
            }
          }
        );
      }
    );
  }

  if (!classes) classes = Object.keys(icons);
};

const getIcon = title => {
  loadIcons();
  const processNameMatches = title.match(processNameRegex);
  let processName = 'shell';
  if (
    Array.isArray(processNameMatches) &&
    processNameMatches[processNameMatch]
  ) processName = processNameMatches[processNameMatch];
  const results = filter(classes, processName, { maxResults: 1 });
  const match = results.length === 0 ? 'shell' : results[0];
  return { class: icons[match], name: match };
};

const getCustomTitle = (title, active) => {
  const icon = getIcon(title);

  let iconActiveColor = mapColors[icon.name];
  let iconInactiveColor = mapColors[icon.name];
  if (disableColors) {
    iconActiveColor = '#fff';
    iconInactiveColor = '#ccc';
    let activeElement = document.querySelector('.tabs_title > span > span');
    let inactiveElement = activeElement;

    if (!activeElement) {
      activeElement = document.querySelector('.tab_textActive > .tab_textInner > span > span');
      inactiveElement = document.querySelector('.tab_text:not(.tab_textActive) > .tab_textInner > span > span');
    }

    if (activeElement) {
      iconActiveColor = window.getComputedStyle(activeElement).getPropertyValue('color');
    }

    if (inactiveElement) {
      iconInactiveColor = window.getComputedStyle(inactiveElement).getPropertyValue('color');
    }
  }

  return React.createElement(
    'span',
    {},
    React.createElement(
      'i',
      {
        className: `${icons.ti} ${icon.class}`,
        style: active ?
          Object.assign(
            {},
            activeStyle,
            iconActiveColor ? { color: iconActiveColor } : {}
          ) :
          Object.assign(
            {},
            inactiveStyle,
            iconInactiveColor ? { color: iconInactiveColor } : {}
          ),
      }
    ),
    React.createElement(
      'span',
      {},
      title
    )
  );
};

exports.getTabProps = (uid, parentProps, props) => {
  const newProps = Object.assign({}, props);
  newProps.text = getCustomTitle(props.text, props.isActive);
  return newProps;
};

exports.getTabsProps = (parentProps, props) => {
  if (props.tabs.length !== 1 || typeof props.tabs[0].title !== 'string') return props;
  const newProps = Object.assign({}, props);
  newProps.tabs[0].title = getCustomTitle(props.tabs[0].title, true);
  return newProps;
};
