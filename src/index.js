import React from 'react';
import TabIcon from './TabIcon';

export TabIcon from './TabIcon';

export const getTabProps = (uid, parentProps, props) => {
  const newProps = { ...props };
  newProps.text = (
    <span>
      <TabIcon active={props.isActive} title={props.text} />
      <span style={{ verticalAlign: 'middle' }}>{props.text}</span>
    </span>
  );
  return newProps;
};

export const getTabsProps = (parentProps, props) => {
  if (props.tabs.length !== 1 || typeof props.tabs[0].title !== 'string') return props;
  const newProps = { ...props };
  newProps.tabs[0].title = (
    <span>
      <TabIcon active title={props.tabs[0].title} />
      <span style={{ verticalAlign: 'middle' }}>{props.tabs[0].title}</span>
    </span>
  );
  return newProps;
};
