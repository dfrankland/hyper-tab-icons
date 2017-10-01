import React from 'react';
import PropTypes from 'prop-types';
import defaultMapColors from '../constants/mapColors';

const DEFAULT_ACTIVE_STYLE = {
  display: 'inline-block',
  marginRight: '0.25rem',
  transition: 'opacity 200ms ease-in',
  verticalAlign: 'middle',
  width: '1rem',
};

const DEFAULT_INACTIVE_STYLE = {
  ...DEFAULT_ACTIVE_STYLE,
  opacity: 0.3,
};

const getMappedActiveStyle = (config, name) => (active) => {
  const {
    activeStyle = DEFAULT_ACTIVE_STYLE,
    inactiveStyle = DEFAULT_INACTIVE_STYLE,
    disableColors = false,
  } = config;

  const mappedColors = {
    ...defaultMapColors,
    ...config.mapColors,
  };

  let iconActiveColor = mappedColors[name];
  let iconInactiveColor = mappedColors[name];

  if (disableColors && typeof window !== 'undefined') {
    iconActiveColor = '#fff';
    iconInactiveColor = '#ccc';
    let activeElement = document.querySelector('.tabs_title > span > span');
    let inactiveElement = activeElement;

    if (!activeElement) {
      activeElement = document.querySelector(
        '.tab_textActive > .tab_textInner > span > span',
      );
      inactiveElement = document.querySelector(
        '.tab_text:not(.tab_textActive) > .tab_textInner > span > span',
      );
    }

    if (activeElement) {
      iconActiveColor = window.getComputedStyle(activeElement).getPropertyValue('color');
    }

    if (inactiveElement) {
      iconInactiveColor = window.getComputedStyle(inactiveElement).getPropertyValue('color');
    }
  }

  return active ? {
    ...activeStyle,
    ...(iconActiveColor ? { fill: iconActiveColor } : {}),
  } : {
    ...inactiveStyle,
    ...(iconInactiveColor ? { fill: iconInactiveColor } : {}),
  };
};

export default config => (name, Component) => {
  const getActiveStyle = getMappedActiveStyle(config, name);

  const TabIcon = ({ active, ...props }) => (
    <Component {...props} style={getActiveStyle(active)} />
  );

  TabIcon.propTypes = {
    active: PropTypes.bool,
  };

  TabIcon.defaultProps = {
    active: true,
  };

  return TabIcon;
};
