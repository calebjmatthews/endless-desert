import React from 'react';
import BadgeComponent from './badge';
import Icon from '../models/icon';

export function renderBadge(objWithIcon: ObjWithIconProps,
  quality: number = 0, size?: number) {
  if (objWithIcon.icon.provider == 'svg') {
    if (size) {
      objWithIcon.icon = new Icon(Object.assign(objWithIcon.icon, { size }));
    }
    return (
      <BadgeComponent icon={objWithIcon.icon} />
    );
  }
  return (
    <BadgeComponent
      provider={objWithIcon.icon.provider}
      name={objWithIcon.icon.name}
      foregroundColor={objWithIcon.foregroundColor}
      backgroundColor={objWithIcon.backgroundColor}
      iconSize={18}
      quality={quality} />
  );
}

interface ObjWithIconProps {
  icon: Icon,
  foregroundColor?: string,
  backgroundColor?: string
}
