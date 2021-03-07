import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

import IconComponent from './icon';

import EquipmentEffect from '../models/equipment_effect';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceSubcategory from '../models/resource_subcategory';
import ResourceCategory from '../models/resource_category';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { resourceCategories } from '../instances/resource_categories';
import { leaderQualities } from '../instances/leader_qualities';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';

export default function EquipmentEffectComponent(props:
  { anEffect: EquipmentEffect }) {
  return (
    <View style={styles.infoBar}>
      <Text style={{fontSize: 12}}>{'+' + props.anEffect.change + '% '}</Text>
      {renderEffectSpecificity(props.anEffect)}
      {renderEffectQuality(props.anEffect)}
    </View>
  );

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
      return (
        <View style={styles.rows}>
          <IconComponent provider={type.icon.provider} name={type.icon.name}
            color={type.foregroundColor} size={16} />
          <Text style={{fontSize: 12}}>{' ' + anEffect.type + ' '}</Text>
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
          color={quality.foregroundColor} size={16} />
        <Text style={{fontSize: 12}}>{' ' + anEffect.quality}</Text>
      </View>
    );
  }
}
