import React from 'react';
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsCategoryHeader,
} from 'react-native-settings-components';
import { flatMap } from 'lodash';

const SettingsSection = ({ title, children }) => {
  return (
    <>
      <SettingsCategoryHeader title={title} />
      <SettingsDividerLong android={false} />
      {flatMap(React.Children.toArray(children), (item, i, a) =>
        a.length - 1 === i ? item : [item, <SettingsDividerShort key={i} />]
      )}
      <SettingsDividerLong android={false} />
    </>
  );
};

export default SettingsSection;
