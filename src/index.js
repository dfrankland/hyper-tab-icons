import React from 'react';
import getIcon from './lib/getIcon';

export const getTabProps = (uid, parentProps, props) => {
  const newProps = { ...props };
  const Icon = getIcon(props.text, props.isActive);
  newProps.text = (
    <span>
      <Icon active={props.isActive} />
      <span style={{ verticalAlign: 'middle' }}>{props.text}</span>
    </span>
  );
  return newProps;
};

export const getTabsProps = (parentProps, props) => {
  if (props.tabs.length !== 1 || typeof props.tabs[0].title !== 'string') return props;
  const newProps = { ...props };
  const Icon = getIcon(props.tabs[0].title);
  newProps.tabs[0].title = (
    <span>
      <Icon active />
      <span style={{ verticalAlign: 'middle' }}>{props.tabs[0].title}</span>
    </span>
  );
  return newProps;
};
