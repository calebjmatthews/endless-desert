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

export default function EquipmentEffectComponent(props:
  { anEffect: EquipmentEffect, size?: string }) {
  let fontSize = 12; let iconSize = 16;
  if (props.size == 'large') { fontSize = 14; iconSize = 18; }

  return (
    <View style={styles.infoBar}>
      {renderChange(props.anEffect)}
      {renderEffectSpecificity(props.anEffect)}
      {renderEffectQuality(props.anEffect)}
    </View>
  );

  function renderChange(anEffect: EquipmentEffect) {
    if ((anEffect.quality == LQ.HAPPINESS_TO_SPEED
      || anEffect.quality == LQ.HAPPINESS_TO_QUALITY
      || anEffect.quality == LQ.HAPPINESS_TO_EFFICIENCY) && anEffect.change == 100) {
      return null;
    }
    else {
      let sign = '+'
      if (props.anEffect.change < 0) { sign = ''; }
      return (
        <Text style={{fontSize}}>
          {sign + utils.formatNumberShort(props.anEffect.change) + '% '}
        </Text>
      );
    }
  }

  function renderEffectSpecificity(anEffect: EquipmentEffect) {
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
          <Text style={{fontSize}}>{' ' + anEffect.type + ' '}</Text>
        </View>
      );
    }
    return null;
  }

  function renderEffectQuality(anEffect: EquipmentEffect) {
    let quality = leaderQualities[anEffect.quality];
    return (
      <View style={styles.rows}>
        <IconComponent provider={quality.icon.provider} name={quality.icon.name}
          color={quality.icon.color} size={iconSize} />
        <Text style={{fontSize}}>{' ' + anEffect.quality}</Text>
      </View>
    );
  }
}
