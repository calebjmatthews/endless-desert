import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { styles } from '../styles';

import IconComponent from './icon';
import SvgComponent from './svg';
import BadgeComponent from './badge';
import RatingComponent from './rating';
import { selectTab, displayModalValue } from '../actions/ui';
import { dismissTradingPartnerVisit, welcomePendingVisit,
  setUpcomingTradingPartnerNames, addPendingVisit, talkTo }
  from '../actions/trading_status';
import { addTimer } from '../actions/timers';

import TradingPartnerVisit from '../models/trading_partner_visit';
import TradingPartner from '../models/trading_partner';
import Trade from '../models/trade';
import Vault from '../models/vault';
import ResourceType from '../models/resource_type';
import ResourceTag from '../models/resource_tag';
import ResourceCategory from '../models/resource_category';
import TradingStatus from '../models/trading_status';
import Timer from '../models/timer';
import Icon from '../models/icon';
import { tradingPartnerTypes } from '../instances/trading_partner_types';
import { resourceTypes } from '../instances/resource_types';
import { resourceTags } from '../instances/resource_tags';
import { resourceSubcategories } from '../instances/resource_subcategories';
import { resourceCategories } from '../instances/resource_categories';
import { utils } from '../utils';
import { RESOURCE_SPECIFICITY } from '../enums/resource_specificity';
import { INTRO_STATES } from '../enums/intro_states';
import { MODALS } from '../enums/modals';

export default function TradingComponent() {
  const dispatch = useDispatch();
  const tradingStatus = useTypedSelector(state => state.tradingStatus);
  const visits = tradingStatus.visits;
  const visitsPending = tradingStatus.visitsPending;
  const vault = useTypedSelector(state => state.vault);
  const timers = useTypedSelector(state => state.timers);
  const introState = useTypedSelector(state => state.account.introState);
  const positioner = useTypedSelector(state => state.ui.positioner);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="Entypo" name="address" color="#fff" size={20}
          style={styles.headingIcon} />
        <Text style={styles.heading1}>{' Trading'}</Text>
      </View>
      {renderBody()}
    </View>
  );

  function renderBody() {
    if (introState == INTRO_STATES.REFURBISH_HUTS || introState == INTRO_STATES.DONE) {
      return (
        <ScrollView>
          {utils.range(0, (tradingStatus.visitSlots-1)).map((slot) => (
            renderVisit(slot)
          ))}
          {utils.range(0, (tradingStatus.visitSlots-1)).map((slot) => (
            renderVisitPending(slot)
          ))}
        </ScrollView>
      );
    }
    else {
      return (
        <ScrollView>
          <View style={styles.break}></View>
          <Text style={StyleSheet.flatten([styles.bareText, { textAlign: 'center'}])}>
            {'You\'ll have to repair the market before trading with anyone.'}
          </Text>
        </ScrollView>

      );
    }
  }

  function tradePress(slot: number, tradeId: string) {
    dispatch(displayModalValue(MODALS.RESOURCE_SELECT_ONE, 'open',
      {type: 'Trading', slot, tradeId}));
  }

  function dismissPress(slot: number) {
    dispatch(dismissTradingPartnerVisit(slot));
  }

  function welcomePress(slot: number) {
    const newTradingStatus = new TradingStatus(tradingStatus);
    newTradingStatus.welcomePendingVisit(slot);
    dispatch(welcomePendingVisit(slot));
    const { visit, newNamesUpcoming } = newTradingStatus.handleNewPendingVisit();
    dispatch(setUpcomingTradingPartnerNames(newNamesUpcoming))
    let newTimer = new Timer({
      name: `Trading|${slot}`,
      endsAt: (new Date(Date.now()).valueOf() + 600000),
      tradingPartnerToArrive: visit.name,
      messageToDisplay: `${visit.name} are waiting outside the gate.`,
      iconToDisplay: new Icon(tradingPartnerTypes[visit.name].icon)
    });
    dispatch(addTimer(newTimer));
    dispatch(addPendingVisit(visit, slot));
  }

  function talkPress(slot: number) {
    dispatch(talkTo(slot));
  }

  function renderVisit(slot: number) {
    const visit = tradingStatus.visits[slot];
    if (visit !== null && visit !== undefined && visit?.name?.length > 0) {
      const tradingPartner = tradingStatus.tradingPartners[visit.name];
      return (
        <VisitDescription key={`visit|${slot}`} slot={slot}
          visit={visit} tradingPartner={tradingPartner}
          vault={vault} positioner={positioner} tradePress={tradePress}
          dismissPress={dismissPress} talkPress={talkPress} />
      )
    }
    return null;
  }

  function renderVisitPending(slot: number) {
    const timer = timers[`Trading|${slot}`];
    const visit = (tradingStatus.visits[slot]?.name?.length || 0) > 0 ?
      tradingStatus.visits[slot] : null;
    const visitPending = tradingStatus.visitsPending[slot];
    const tpt = visitPending && tradingPartnerTypes[visitPending.name];
    if (timer || visitPending) {
      let contents = null;
      if (timer) {
        contents = (
         <Text>
           {`The ${timer.tradingPartnerToArrive} are arriving in ${timer.remainingLabel}`}
         </Text>
       );
      }
      else if (visitPending !== null && (visit === null || visit === undefined)) {
        contents = (
         <>
           <Text style={styles.bodyTextMed}>
             {`The ${visitPending.name} are waiting outside the gate.`}
           </Text>
           <View style={styles.buttonRow}>
             <TouchableOpacity style={styles.buttonRowItem}
               onPress={() => { welcomePress(slot) }}>
               <IconComponent provider={'FontAwesome5'}
                 name={'hand-holding'} color="#fff" size={16} />
               <Text style={styles.buttonText}>{' Welcome in'}</Text>
             </TouchableOpacity>
           </View>
         </>
       );
      }
      else if (visitPending !== null && visit !== null) {
          contents = (
           <>
             <Text style={styles.bodyTextMed}>
               {`The ${visitPending.name} are waiting outside the gate, but there's no room in the market.`}
             </Text>
             <View style={styles.buttonRow}>
               <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
                 styles.buttonDisabled])} disabled
                 onPress={() => { welcomePress(slot) }}>
                 <IconComponent provider={'FontAwesome5'}
                   name={'hand-holding'} color="#fff" size={16} />
                 <Text style={styles.buttonText}>{' Welcome in'}</Text>
               </TouchableOpacity>
             </View>
           </>
         );
      }

      return (
        <View key={`pending|${slot}`} style={StyleSheet.flatten([styles.panelFlexColumn,
          {minWidth: positioner.majorWidth,
            maxWidth: positioner.majorWidth}])}>
          <View style={styles.containerStretchRow}>
            {tpt && (
              <View style={StyleSheet.flatten([styles.container, {width: 40, height: 40}])}>
                <IconComponent style={{position: 'absolute', zIndex: -1}}
                  provider={'MaterialCommunityIcons'}
                  name={'shield'} color={tpt.icon.backgroundColor} size={36} />
                <SvgComponent icon={new Icon({...tpt.icon, size: 19})} />
              </View>
            )}
            <View style={styles.containerStretchColumn}>
              {contents}
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
}

function VisitDescription(props: any) {
  const visit: TradingPartnerVisit = props.visit;
  const tpt = tradingPartnerTypes[visit.name];
  const tp: TradingPartner = props.tradingPartner;
  const emptyIcon = new Icon({ provider: 'FontAwesome', name: 'star-o',
    color: '#8a6100', size: 18 });
  const filledIcon = new Icon({ provider: 'FontAwesome', name: 'star',
    color: '#ffb400', size: 18 });
  const tier = tpt.getTier(tp.trust);
  const ratingNumerator = tier.value + 1 + (tier.toNext / 100);

  return (
    <View style={StyleSheet.flatten([styles.panelFlexColumn,
      {minWidth: props.positioner.majorWidth,
        maxWidth: props.positioner.majorWidth}])}>
      <View style={styles.containerStretchRow}>
        <View style={StyleSheet.flatten([styles.container, {width: 40, height: 40}])}>
          <IconComponent style={{position: 'absolute', zIndex: -1}}
            provider={'MaterialCommunityIcons'}
            name={'shield'} color={tpt.icon.backgroundColor} size={36} />
          <SvgComponent icon={new Icon({...tpt.icon, size: 19})} />
        </View>
        <View style={styles.containerStretchColumn}>
          <Text>
            {visit.name}
          </Text>
          <View style={styles.rows}>
            <Text style={{fontSize: 12}}>{"Trust: "}</Text>
            <RatingComponent numerator={ratingNumerator} denominator={5}
              iconCount={5} emptyIcon={emptyIcon} filledIcon={filledIcon}
              width={84} />
            <Text style={{fontSize: 12}}>{" (" + tp.trust + ")"}</Text>
          </View>
          <View style={styles.buttonRow}>
            {renderGoodbye(props.slot, visit.trades, visit.traded)}
            <TouchableOpacity style={StyleSheet.flatten([styles.buttonRowItem,
              styles.buttonLight])} onPress={() => props.talkPress(props.slot)}>
              <IconComponent provider="FontAwesome5" name="angle-down"
                color="#071f56" size={16} />
              <Text style={styles.buttonTextDark}>{' Hello'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {renderTrades(props.slot, visit.trades, props.vault, visit.traded,
        props.tradePress)}
    </View>
  );

  function renderTrades(slot: number, trades: { [id: string] : Trade}, vault: Vault,
    traded: { [id: string] : {
    given: { type: string, quantity: number,  quality: number },
    received: { type: string, quantity: number,  quality: number }} },
    tradePress: Function) {
    return Object.keys(trades).map((tradeId) => {
      const trade = trades[tradeId];
      const wasTraded = traded[tradeId];

      if (!wasTraded) {
        return renderTrade(slot, trade, tradePress);
      }
      return renderWasTraded(trade, wasTraded, vault);
    });
  }

  function renderTrade(slot: number, trade: Trade, tradePress: Function) {
    const give = resourceTypes[trade.give.type];
    const receive = utils.getMatchingResourceKind(trade.receive.specificity,
      trade.receive.type);

    return (
      <TouchableOpacity key={trade.id} style={StyleSheet.flatten([styles.buttonRowItem,
        styles.buttonLight, {justifyContent: 'flex-start', alignSelf: 'stretch'}])}
        onPress={() => { tradePress(slot, trade.id) }} >
        <BadgeComponent icon={give.icon} size={21} />
        <Text style={styles.buttonTextDark}>
          {' ' + give.name + ' for '}
        </Text>
        <BadgeComponent icon={receive.icon} size={21} />
        <Text style={styles.buttonTextDark}>
          {receive.name}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderWasTraded(trade: Trade, wasTraded:
    {given: { type: string, quantity: number },
    received: { type: string, quantity: number, quality: number }}, vault: Vault ) {
    const give = resourceTypes[wasTraded.given.type];
    const receive = utils.getResourceType(vault.resources[wasTraded.received.type
      + '|' + wasTraded.received.quality]);
    const rName = receive.displayName || receive.name;

    return (
      <TouchableOpacity key={trade.id} style={StyleSheet.flatten([styles.buttonRowItem,
        styles.buttonDisabled, {justifyContent: 'flex-start', alignSelf: 'stretch'}])}
        disabled >
        <BadgeComponent icon={give.icon} size={21} />
        <Text style={styles.buttonTextDark}>
          {give.name + ' x' + utils.formatNumberShort(wasTraded.given.quantity)
          + ' for '}
        </Text>
        <BadgeComponent icon={receive.icon} size={21} />
        <Text style={styles.buttonTextDark}>
          {rName + ' x' + utils.formatNumberShort(wasTraded.received.quantity)}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderGoodbye(slot: number, trades: { [id: string] : Trade},
    traded: { [id: string] : {given: { type: string, quantity: number },
      received: { type: string, quantity: number }} }) {
    let allTraded = true;
    Object.keys(trades).map((tradeId) => {
      if (!traded[tradeId]) { allTraded = false; }
    });

    if (!allTraded) {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { props.dismissPress(slot) }}>
          <IconComponent provider={'FontAwesome5'}
            name={'hand-paper'} color="#fff" size={16} />
          <Text style={styles.buttonText}>{' No thanks'}</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonRowItem}
          onPress={() => { props.dismissPress(slot) }}>
          <IconComponent provider={'FontAwesome5'}
            name={'hand-peace'} color="#fff" size={16} />
          <Text style={styles.buttonText}>{' Farewell'}</Text>
        </TouchableOpacity>
      );
    }
  }
}
