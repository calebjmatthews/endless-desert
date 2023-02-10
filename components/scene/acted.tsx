import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../styles';

import BadgeComponent from '../badge';

import { SceneAction } from '../../models/scene';
import Icon from '../../models/icon';
import Positioner from '../../models/positioner';
import { utils } from '../../utils';

const SceneActedComponent = (props: SceneActedProps) => {
  const { sceneAction, pos } = props;

  const cost = sceneAction.getCost(1);
  const resourceKind = cost?.[0] ? utils.getMatchingResourceKind(cost?.[0].specificity, cost?.[0].kind)
    : null;
  const icon = sceneAction.requirementIcon || resourceKind?.icon;
  let buttonStyle: any = [styles.button, styles.sceneActionButton, {minWidth: pos.speechButtonWidth, 
    maxWidth: pos.speechButtonWidth, backgroundColor: '#5e77b0', borderColor: '#5e77b0' }];
  if (sceneAction.label === '...') {
    buttonStyle = [...buttonStyle, { minWidth: 60, maxWidth: 60, justifyContent: 'center' }];
  }

  return (
    <View style={[styles.container, { marginBottom: 10 }]}>
      <View style={buttonStyle} >
        <View style={[styles.rows, { paddingVertical: 5 }]}>
          {icon && (
            <View style={{marginRight: 3}}>
              <BadgeComponent icon={new Icon({...icon, size: 16})} />
            </View>
          )}
          <Text style={[styles.buttonText, { fontSize: 12, opacity: 0.9 }]}>
            {sceneAction.label}
          </Text>
        </View>
      </View>
    </View>
  );
}

interface SceneActedProps {
  sceneAction: SceneAction;

  pos: Positioner;
}

export default SceneActedComponent;