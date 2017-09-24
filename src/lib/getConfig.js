export default () => {
  if (
    typeof window === 'object' &&
    typeof window.config === 'object' &&
    typeof window.config.getConfig === 'function'
  ) {
    const { tabIcons: config = {} } = window.config.getConfig();
    return config;
  }

  return {};
};
