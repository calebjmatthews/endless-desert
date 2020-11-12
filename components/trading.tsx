import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import RootState from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import { selectTab, displayModalValue } from '../actions/ui';
import IconComponent from './icon';
import BadgeComponent from './badge';

import TradingPartner from '../models/trading_partner';
import Trade from '../models/trade';
import Vault from '../models/vault';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceCategory from '../models/resource_category';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceCategories } from '../instances/resource_categories';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { MODALS } from '../enums/modals';

export default function TradingComponent() {
  const dispatch = useDispatch();
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const tradingPartnerArray = Object.keys(tradingStatus.tradingPartners).map((name) => {
    return tradingStatus.tradingPartners[name];
  });
  const vault = useTypedSelector(state => state.vault);
  function renderTradingPartner(tpData: any) {
    return <TradingPartnerDescription tpData={tpData} vault={vault}
      tradeClick={tradeClick} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="Entypo" name="address" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Trading'}</Text>
      </View>
      <FlatList
        data={tradingPartnerArray}
        renderItem={renderTradingPartner}
        keyExtractor={tradingPartner => tradingPartner.name}>
      </FlatList>
    </View>
  );

  function tradeClick(tradingPartner: string, tradeId: string) {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: 'Trading', tradingPartner: tradingPartner, tradeId: tradeId}));
  }
}

function TradingPartnerDescription(props: any) {
  let tradingPartner: TradingPartner = props.tpData.item;
  let tradingPartnerType = tradingPartnerTypes[tradingPartner.name];

  return (
    <View style={styles.panelFlexColumn}>
      <View style={styles.containerStretchRow}>
        <View style={{width: 40, height: 40}}>
          <IconComponent style={{position: 'absolute'}}
            provider={'MaterialCommunityIcons'}
            name={'shield'}
            color={tradingPartnerType.backgroundColor}
            size={36} />
          <IconComponent style={{position: 'absolute', paddingHorizontal: 11,
              paddingVertical: 8}}
            provider={tradingPartnerType.icon.provider}
            name={tradingPartnerType.icon.name}
            color={tradingPartnerType.foregroundColor}
            size={18} />
        </View>
        <View style={styles.containerStretchColumn}>
          <Text>
            {tradingPartner.name}
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonRowItem}
              onPress={() => {}}>
              <IconComponent provider={'FontAwesome5'}
                name={'hand-paper'} color="#fff" size={16} />
              <Text style={styles.buttonText}>{' No thanks'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
              styles.buttonLight])}>
              <IconComponent provider="FontAwesome5" name="question-circle"
                color="#071f56" size={16} />
              <Text style={styles.buttonTextDark}>{' Info'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {renderTrades(tradingPartner.trades, props.vault, tradingPartner.traded,
        props.tradeClick)}
    </View>
  );

  function renderTrades(trades: { [id: string] : Trade}, vault: Vault,
    traded: { [id: string] : boolean }, tradeClick: Function) {
    return Object.keys(trades).map((tradeId) => {
      const trade = trades[tradeId];
      let give = resourceTypes[trade.give.type];
      let receive = getMatchingResource(trade.receive.specificity, trade.receive.type);

      let buttonStyle: any = StyleSheet.flatten([styles.buttonRowItem,
        styles.buttonLight]);
      let buttonDisabled = false;
      let wasTraded = traded[trade.id] ? true : false;

      if (wasTraded) {
        buttonStyle = StyleSheet.flatten([styles.buttonRowItem,
          styles.buttonDisabled]);
        buttonDisabled = true;
      }

      return (
        <TouchableOpacity key={trade.id} style={StyleSheet.flatten([buttonStyle,
          {justifyContent: 'flex-start', alignSelf: 'stretch'}])}
          disabled={buttonDisabled}
          onPress={() => { tradeClick(trade.tradingPartnerType, trade.id) }} >
          <BadgeComponent
            provider={give.icon.provider}
            name={give.icon.name}
            foregroundColor={give.foregroundColor}
            backgroundColor={give.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonTextDark}>
            {' ' + give.name + ' (' + trade.give.quantity + ') for '}
          </Text>
          <BadgeComponent
            provider={receive.icon.provider}
            name={receive.icon.name}
            foregroundColor={receive.foregroundColor}
            backgroundColor={receive.backgroundColor}
            iconSize={16} />
          <Text style={styles.buttonTextDark}>
            {receive.name}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  function getMatchingResource(specificity: string, type: string):
    ResourceType|ResourceTag|ResourceCategory {
    switch(specificity) {
      case RESOURCE_SPECIFICITY.EXACT:
      return resourceTypes[type];

      case RESOURCE_SPECIFICITY.TAG:
      return resourceTags[type];

      case RESOURCE_SPECIFICITY.CATEGORY:
      return resourceCategories[type];

      default:
      return resourceTypes[type];
    }
  }
}
