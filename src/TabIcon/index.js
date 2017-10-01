import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter } from 'fuzzaldrin';
import * as icons from '../icons';
import defaultMapIcons from '../constants/mapIcons';
import tabIconHoc from './tabIconHoc';

const DEFAULT_PROCESS = 'shell';

const mapConfigToState = (newConfig = {}) => {
  const { tabIcons: config = {} } = newConfig;

  const mapIcons = {
    ...defaultMapIcons,
    ...(config.mapIcons || {}),
  };

  const mappedTabIcons = Object.keys(icons).reduce(
    (allMappedTabIcons, nextIconKey) => {
      const icon = icons[nextIconKey];
      return {
        ...allMappedTabIcons,
        [nextIconKey]: tabIconHoc(config)(nextIconKey, icon),
        ...(
          (mapIcons[nextIconKey] || []).reduce(
            (allMappedIcons, nextMappedIconKey) => ({
              ...allMappedIcons,
              [nextMappedIconKey]: tabIconHoc(config)(nextMappedIconKey, icon),
            }),
            {},
          )
        ),
      };
    },
    {},
  );

  return {
    mappedTabIcons,
    mappedIconKeys: Object.keys(mappedTabIcons),
    processNameMatch: config.processNameMatch || 1,
    processNameRegex: typeof config.processNameRegex === 'object' ? (
      new RegExp(
        config.processNameRegex.source || /^(.*?) /,
        config.processNameRegex.flags || '',
      )
    ) : (
      /^(.*?) /
    ),
  };
};

export default class extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = mapConfigToState(window.config.getConfig());
  }

  componentDidMount() {
    window.config.subscribe(() => {
      this.setState((
        mapConfigToState((
          window.config.getConfig()
        ))
      ));
    });
  }

  render() {
    const { title } = this.props;
    const {
      mappedTabIcons,
      mappedIconKeys,
      processNameMatch,
      processNameRegex,
    } = this.state;

    // Get mapped default icon
    const {
      [DEFAULT_PROCESS]: DEFAULT_ICON = icons[DEFAULT_PROCESS],
    } = mappedTabIcons;

    // Set the process name
    let processName = DEFAULT_PROCESS;
    const processNameMatches = title.match(processNameRegex);
    if (
      Array.isArray(processNameMatches) &&
      processNameMatches[processNameMatch]
    ) processName = processNameMatches[processNameMatch];

    // Find icon name matching process name
    let match = DEFAULT_PROCESS;
    const results = filter(mappedIconKeys, processName, { maxResults: 1 });
    if (results[0]) match = results[0];

    // Retrieve icon component from matched icon name
    const { [match]: Icon = DEFAULT_ICON } = mappedTabIcons;

    return <Icon />;
  }
}
