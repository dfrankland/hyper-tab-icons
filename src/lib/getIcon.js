import { filter } from 'fuzzaldrin';
import * as icons from '../icons';
import defaultMapIcons from '../constants/mapIcons';
import getConfig from './getConfig';
import tabIconHoc from './tabIconHoc';

const config = getConfig();

const { processNameMatch = 1 } = config;

const mapIcons = {
  ...defaultMapIcons,
  ...config.mapIcons,
};

const mappedTabIcons = Object.keys(icons).reduce(
  (allMappedTabIcons, nextIconKey) => {
    const icon = icons[nextIconKey];
    return {
      ...allMappedTabIcons,
      [nextIconKey]: tabIconHoc(nextIconKey, icon),
      ...(
        (mapIcons[nextIconKey] || []).reduce(
          (allMappedIcons, nextMappedIconKey) => ({
            ...allMappedIcons,
            [nextMappedIconKey]: tabIconHoc(nextMappedIconKey, icon),
          }),
          {},
        )
      ),
    };
  },
  {},
);
const mappedIconKeys = Object.keys(mappedTabIcons);

let processNameRegex = /^(.*?) /;
if (config.processNameRegex) {
  processNameRegex = new RegExp(
    config.tabIcons.processNameRegex.source,
    config.tabIcons.processNameRegex.flags,
  );
}

const DEFAULT_PROCESS = 'shell';
const {
  [DEFAULT_PROCESS]: DEFAULT_ICON = icons[DEFAULT_PROCESS],
} = mappedTabIcons;

export default (title) => {
  let processName = DEFAULT_PROCESS;
  const processNameMatches = title.match(processNameRegex);
  if (
    Array.isArray(processNameMatches) &&
    processNameMatches[processNameMatch]
  ) processName = processNameMatches[processNameMatch];

  let match = DEFAULT_PROCESS;
  const results = filter(mappedIconKeys, processName, { maxResults: 1 });
  if (results[0]) match = results[0];

  const {
    [match]: icon = DEFAULT_ICON,
  } = mappedTabIcons;

  return icon;
};
