import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';
import SvgComponent from './svg';

import EquipmentEffect from '../models/equipment_effect';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceSubcategory from '../models/resource_subcategory';
import ResourceCategory from '../models/resource_category';
import Icon from '../models/icon';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { resourceCategories } from '../instances/resource_categories';
import { leaderQualities } from '../instances/leader_qualities';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { LEADER_QUALITIES } from '../enums/leader_qualities';
const LQ = LEADER_QUALITIES;

export default function EquipmentEffectComponent(props: { anEffect: EquipmentEffect, 
  size?: 'large'|'medium'|'small', showWhenZero?: boolean }) {
  if (props.anEffect.change === 0 && !props.showWhenZero) { return null; }
  let fontSize = 12; let iconSize = 16;
  if (props.size == 'large') { fontSize = 14; iconSize = 18; }

  return (
    <View style={styles.infoBar}>
      {renderChange(props.anEffect, props.size)}
      {renderEffectSpecificity(props.anEffect, props.size)}
      {renderEffectQuality(props.anEffect, props.size)}
    </View>
  );

  function renderChange(anEffect: EquipmentEffect, size?: 'large'|'medium'|'small') {
    let text = null;
    let sign = '+';
    const happinessChange = (anEffect.quality == LQ.HAPPINESS_TO_SPEED
      || anEffect.quality == LQ.HAPPINESS_TO_QUALITY
      || anEffect.quality == LQ.HAPPINESS_TO_EFFICIENCY);
    if (size === 'small' && happinessChange) {
      sign = 'x';
      if (anEffect.change == 100) { text = '100% '; }
        else if (anEffect.change == 50) { text = '50% '; }
        else if (anEffect.change == 25) { text = '25% '; }
        else { text = `${utils.formatNumberShort(props.anEffect.change)}% `; }
        text = `${sign}${text}`;
    }
    else {
      if (happinessChange) {
        if (anEffect.change == 100) { return null; }
        else if (anEffect.change == 50) { text = '½ '; }
        else if (anEffect.change == 25) { text = '¼ '; }
        else { text = `${utils.formatNumberShort(props.anEffect.change)}% `; }
      }
      else {
        if (props.anEffect.change < 0) { sign = ''; }
        text = `${sign}${utils.formatNumberShort(props.anEffect.change)}% `;
      }
    }
    
    return (
      <Text style={{fontSize}}>
        {text}
      </Text>
    );
  }

  function renderEffectSpecificity(anEffect: EquipmentEffect, size?: 'large'|'medium'|'small') {
    if (anEffect.specificity && anEffect.type) {
      let type: ResourceType|ResourceTag|ResourceSubcategory|ResourceCategory =
        resourceTypes[anEffect.type];
      switch(anEffect.specificity) {
        case RESOURCE_SPECIFICITY.TAG:
        type = resourceTags[anEffect.type]; break;
        case RESOURCE_SPECIFICITY.SUBCATEGORY:
        type = resourceSubcategories[anEffect.type]; break;
        case RESOURCE_SPECIFICITY.CATEGORY:
        type = resourceCategories[anEffect.type]; break;
      }
      let icon = <IconComponent provider={type.icon.provider} name={type.icon.name}
        color={type.icon.color} size={iconSize} />;
      if (type.icon.provider == 'svg') {
        icon = <SvgComponent icon={new Icon({...type.icon, size: iconSize})} />
      }
      return (
        <View style={styles.rows}>
          {icon}
          {(size !== 'small') && (
            <Text style={{fontSize}}>{` ${anEffect.type} `}</Text>
          )}
        </View>
      );
    }
    return null;
  }

  function renderEffectQuality(anEffect: EquipmentEffect, size?: 'large'|'medium'|'small') {
    let quality = leaderQualities[anEffect.quality];
    return (
      <View style={styles.rows}>
        <IconComponent provider={quality.icon.provider} name={quality.icon.name}
          color={quality.icon.color} size={iconSize} />
        {(size !== 'small') && (
          <Text style={{fontSize}}>{` ${anEffect.quality}`}</Text>
        )}
      </View>
    );
  }
}
