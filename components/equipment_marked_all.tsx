import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../models/root_state';
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

import BadgeComponent from './badge';
import IconComponent from './icon';
import SvgComponent from './svg';
import EquipmentNameComponent from './equipment_name';
import EquipmentEffectComponent from './equipment_effect';
import ProgressBarComponent from './progress_bar';
import { displayModal } from '../actions/ui';
import { addEquipment } from '../actions/equipment';
import { removeEquipmentMarked, clearEquipmentMarked } from '../actions/equipment_marked';
import { increaseResources, consumeResources } from '../actions/vault';

import Icon from '../models/icon';
import Resource from '../models/resource';
import Equipment from '../models/equipment';
import Vault from '../models/vault';
import Positioner from '../models/positioner';
import { CategoryBranch } from '../models/category_branch';
import { equipmentTypes } from '../instances/equipment_types';
import { utils } from '../utils';
import { EQUIPMENT_TIER_DATA } from '../constants';
const ETD = EQUIPMENT_TIER_DATA;

export default function EquipmentMarkedAllComponent() {
  const equipment = useTypedSelector(state => state.equipmentMarked.equipment);
  const vault = useTypedSelector(state => state.vault);
  const positioner = useTypedSelector(state => state.ui.positioner);

  return useMemo(() => (
    <EquipmentMarkedOneComponentStatic equipment={equipment} vault={vault} positioner={positioner} />
  ), [positioner, equipment]);
}

function EquipmentMarkedOneComponentStatic(props: { equipment: { [id: string] : Equipment },
  vault: Vault, positioner: Positioner }) {
  const { equipment, vault, positioner } = props;
  const dispatch = useDispatch();

  // The UI state of each category branch
  const [state, setState] = useState(['clean']);
  // The array of catgegory branches, reversed so rarest tier is first
  const [branches, setBranches] = useState <CategoryBranch[]> ([]);
  // Which category branches are currently expanded
  const [expanded, setExpanded] = useState([true]);
  // Qualitatively how many equipment within each branch are checked (selected)
  const [branchChecked, setBranchChecked] = useState <('all'|'some'|'none')[]> (['none']);
  // Whether an individual equipment has been selected
  const [checked, setChecked] = useState <{ [id:string] : boolean }> ({});
  // Timeouts created to handle animation delay
  const [timeouts, setTimeouts] = useState <NodeJS.Timeout[]> ([]);
  // Resources from deconstruction
  const [rfd, setRfd] = useState <Resource[]> ([]);
  // Whether any equipment from any branch has been deconstructed
  const [anyDeconstructed, setAnyDeconstructed] = useState(false);

  useEffect(() => {
    if (state[0] === 'clean') {
      setState(['initializing']);
      buildBranches();
    }
  }, [state, equipment]);

  if (branches.length === 0) { return null; }

  return (
    <View style={styles.modalContent}>
      <View style={styles.headingWrapper}>
        <IconComponent provider="FontAwesome5" name="stamp"
          color="#fff" size={20} style={styles.headingIcon} />
        <Text style={styles.heading1}>{` Marked Equipment`}</Text>
      </View>

      <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
        {branches.map((branch, index) => (
          <View key={`branch-${branch.order}`} style={styles.columns}>
            <View style={[styles.buttonTextRow, {minWidth: positioner.modalMajor,
              maxWidth: positioner.modalMajor}]}>
              <View style={styles.columns}>
                <View style={styles.rows}>
                  <Text style={[styles.heading1, {color: (ETD[branch.order].color !== '#111')
                    ? ETD[branch.order].color : '#fff'}]}>
                    {` ${ETD[branch.order].label}`}
                  </Text>
                  <SvgComponent icon={branch.icon} />
                </View>
              </View>
             
              <TouchableOpacity style={[styles.button, {width: 64}]}
                onPress={() => branchToggle(index)}>
                <IconComponent provider="FontAwesome5" color='#fff' size={18} 
                  name={(expanded[index]) ? 'angle-up' : 'angle-down'} />
                <Text style={styles.buttonText}>
                  {(expanded[index]) ? ' Hide' : ' Show'}
                </Text>
              </TouchableOpacity>
            </View>

            {expanded[index] && (
              <CheckAllOrNoneButton index={index} branchChecked={branchChecked}
                checkAllOrNone={checkAllOrNone} />
            )}

            {(expanded[index] && branch.equipment) && branch.equipment.map((anEquipment) => {
              const equipmentType = equipmentTypes[anEquipment.typeName];
              let buttonStyle: any = [styles.button, styles.sideButton];
              let iconProps = { provider:"FontAwesome5", name:"check-square", color:"#fff", size: 20 };
              if (!checked[anEquipment.id]) {
                buttonStyle.push(styles.buttonLight);
                iconProps = {...iconProps, name:"square", color: "#071f56"};
              }
              return (
                <View key={anEquipment.id} style={[styles.panelFlex, styles.sideButtonContainer,
                  {alignItems: 'flex-start', padding: 0, minWidth: positioner.modalMajor,
                  maxWidth: positioner.modalMajor}]}>
                  <TouchableOpacity style={buttonStyle}
                    onPress={() => checkBoxPress(index, anEquipment.id)} >
                    <IconComponent {...iconProps} />
                  </TouchableOpacity>
                  <View style={styles.columns}>
                    <View style={styles.rows}>
                      <BadgeComponent icon={new Icon({...equipmentType.icon, size: 38})} />
                      <EquipmentNameComponent anEquipment={anEquipment} />
                    </View>
                    <View style={styles.columns}>
                      {anEquipment.effects.map((anEffect, index) => (
                        <EquipmentEffectComponent key={`equip-${index}`} anEffect={anEffect} />
                      ))}
                    </View>
                  </View>
                </View>
              )
            })}

            {!expanded[index] && (
              <View style={[styles.panelFlex, {justifyContent: 'center', minWidth: positioner.modalMajor,
                maxWidth: positioner.modalMajor}]}>
                <Text style={styles.mutedText}>{`- ${branch.value} hidden -`}</Text>
              </View>
            )}

            {(state[index] !== 'deconstructing') && (
              <DeconstructButton state={state} index={index} branchChecked={branchChecked}
                branch={branch} deconstructPress={deconstructPress} />
            )}

            {(state[index] === 'deconstructing') && (
              <View style={{marginTop: 10}}>
                <ProgressBarComponent startingProgress={0}
                  width={positioner.majorWidth - positioner.minorPadding}
                  endingProgress={1} duration={2000}
                  labelStyle={styles.bareText}
                  color={'#9e3733'}
                  label={'Deconstructing...'} />
              </View>
            )}
            
            <View style={styles.breakLarge} />
          </View>
        ))}

        {(rfd?.length > 0) && (
          <View style={[styles.panelFlexColumn, {minWidth: positioner.modalMajor,
            maxWidth: positioner.modalMajor}]}>
            <Text style={styles.bodyText}>
              {`Taking equipment apart yielded:`}
            </Text>
            {rfd.map((resource, index) => {
              const resourceType = utils.getResourceType(resource);
              if (Math.floor(resource.quantity) === 0) { return null; }
              return (
                <View key={index} style={styles.containerStretchRow}>
                  <BadgeComponent icon={resourceType.icon} size={21} />
                  <Text style={styles.bodyText}>
                    {` +${utils.formatNumberShort(resource.quantity)} ${utils.getResourceName(resource)}`}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {(!anyDeconstructing()) && (
          <NextButton branches={branches} anyDeconstructed={anyDeconstructed} nextPress={nextPress} />
        )}

      </ScrollView>
    </View>
  );

  function buildBranches() {
    const newBranches: CategoryBranch[] = [];
    Object.keys(equipment).forEach((id) => {
      const anEquipment = equipment[id];
      if (!newBranches[anEquipment.tier]) {
        newBranches[anEquipment.tier] = {
          name: ETD[anEquipment.tier].label,
          value: 0,
          order: anEquipment.tier,
          icon: new Icon({ provider: 'svg', name: (ETD[anEquipment.tier].iconName || ''),
            color: ETD[anEquipment.tier].color, secondaryColor: '#555' }),
          equipment: []
        };
      }
      newBranches[anEquipment.tier].equipment?.push(anEquipment);
      newBranches[anEquipment.tier].value = (newBranches[anEquipment.tier].value || 0) + 1;
    });
    setBranches(newBranches.reverse());
    const newState: string[] = [];
    const newBranchChecked: ('all'|'some'|'none')[] = [];
    newBranches.forEach((branch, index) => {
      newState[index] = 'initialized';
      newBranchChecked[index] = 'none';
    });
    setState(newState);
    setBranchChecked(newBranchChecked);
  }

  function branchToggle(index: number) {
    if (!anyDeconstructing()) {
      const newExpanded = [...expanded];
      (expanded[index] === true) ? newExpanded[index] = false : newExpanded[index] = true;
      setExpanded(newExpanded);
    }
  }

  function checkBoxPress(branchIndex: number, id: string) {
    if (!anyDeconstructing()) {
      const newChecked = {...checked};
      (checked[id] === true) ? newChecked[id] = false : newChecked[id] = true;
      setChecked(newChecked);

      const newBranchChecked: ('all'|'some'|'none')[] = [...branchChecked];
      let anyChecked = false;
      let allChecked = true;
      branches[branchIndex].equipment?.forEach((anEquipment) => {
        (newChecked[anEquipment.id]) ? anyChecked = true : allChecked = false;
      });
      if (allChecked) { newBranchChecked[branchIndex] = 'all'; }
      else if (anyChecked) { newBranchChecked[branchIndex] = 'some'; }
      else { newBranchChecked[branchIndex] = 'none'; }
      setBranchChecked(newBranchChecked);
      if (state[branchIndex] === 'confirmDeconstruct') {
        const newState = [...state];
        newState[branchIndex] = 'initialized';
        setState(newState);
      }
    }
  }

  function checkAllOrNone(index: number, check: boolean) {
    const newChecked = {...checked};
    branches[index].equipment?.forEach((anEquipment) => {
      newChecked[anEquipment.id] = check;
    });
    setChecked(newChecked);
    const newBranchChecked = [...branchChecked];
    newBranchChecked[index] = (check) ? 'all' : 'none';
    setBranchChecked(newBranchChecked);
  }

  function anyDeconstructing() {
    return state.filter((oneState) => oneState === 'deconstructing').length > 0;
  }

  function deconstructPress(index: number) {
    if (state[index] === 'confirmDeconstruct' && !anyDeconstructing()) {
      const newState = [...state];
      newState[index] = 'deconstructing';
      setState(newState);
      if (!anyDeconstructed) { setAnyDeconstructed(true); }

      const rti: { [typeQuality: string] : Resource } = {};
      rfd.forEach((r) => { rti[`${r.type}|${r.quality}`] = r; });
      const rtc: { [typeQuality: string] : Resource } = {};
      const idsRemoved: string[] = [];
      branches[index].equipment?.forEach((anEquipment) => {
        if (checked[anEquipment.id]) {
          idsRemoved.push(anEquipment.id);
          const equipmentType = equipmentTypes[anEquipment.typeName];
          const eResource = new Resource({
            type: `${anEquipment.typeName} (U)`,
            quality: anEquipment.originalQuality,
            quantity: 1
          });
          if (!rtc[`${eResource.type}|${eResource.quality}`]) {
            rtc[`${eResource.type}|${eResource.quality}`] = eResource;
          }
          else {
            rtc[`${eResource.type}|${eResource.quality}`].quantity += eResource.quantity;
          }
          if (equipmentType.recipeConsumes) {
            equipmentType.recipeConsumes.forEach((consume) => {
              const resource = new Resource({ ...consume, 
                quantity: (consume.quantity * 0.1), quality: 0 });
              if (!rti[`${resource.type}|${resource.quality}`]) {
                rti[`${resource.type}|${resource.quality}`] = resource;
              }
              else {
                rti[`${resource.type}|${resource.quality}`].quantity += resource.quantity;
              }
            });
          }
        }
      });
      dispatch(removeEquipmentMarked(idsRemoved));
      const newRfd: Resource[] = Object.keys(rti).map((typeQuality) => rti[typeQuality]);
      dispatch(increaseResources(vault, newRfd));
      const rtcArray: Resource[] = Object.keys(rtc).map((typeQuality) => rtc[typeQuality]);
      dispatch(consumeResources(vault, rtcArray));

      const progressTimeout = setTimeout(() => {
        const afterState = [...newState];
        afterState[index] = 'initialized';
        setState(afterState);
        setRfd(newRfd);
        buildBranches();
      }, 2500);
      setTimeouts([...timeouts, progressTimeout]);
    }
    else {
      const newState = [...state];
      newState[index] = 'confirmDeconstruct';
      setState(newState);
      if (branchChecked[index] === 'none') {
        checkAllOrNone(index, true);
      }
    }
  }

  function nextPress() {
    let rtc: { [typeQuality: string] : Resource} = {};
    let eta: Equipment[] = [];
    branches.forEach((branch) => {
      branch.equipment?.forEach((anEquipment) => {
        const typeQuality = `${anEquipment.typeName} (U)|${anEquipment.originalQuality}`;
        if (!rtc[typeQuality]) {
          rtc[typeQuality] = new Resource({
            type: `${anEquipment.typeName} (U)`,
            quality: anEquipment.originalQuality,
            quantity: 1
          });
        }
        else {
          rtc[typeQuality].quantity++;
        }
        eta.push(anEquipment);
      });
    });

    const rtcArray = Object.keys(rtc).map((typeQuality) => rtc[typeQuality]);
    dispatch(consumeResources(vault, rtcArray));
    dispatch(addEquipment(eta));
    dispatch(clearEquipmentMarked());
    dispatch(displayModal(null));
  }
}

function CheckAllOrNoneButton(props: { index: number, branchChecked: ('all'|'some'|'none')[],
  checkAllOrNone: (index: number, check: boolean) => void}) {
  const {index, branchChecked, checkAllOrNone} = props;
  let buttonStyle: any = [styles.button];
  let iconProps = { provider:"FontAwesome5", name:"check-square", color:"#fff", size: 16 };
  if (branchChecked[index] === 'none') {
    buttonStyle.push(styles.buttonLight);
    iconProps = {...iconProps, name:"square", color: "#071f56"};
  }
  else if (branchChecked[index] === 'some') {
    buttonStyle.push({ backgroundColor: '#6882c0' })
  }
  buttonStyle.push(styles.checkAllOrNoneButton);

  return (
    <TouchableOpacity style={buttonStyle}
      onPress={() => checkAllOrNone(index, (branchChecked[index] === 'none'))} >
      <IconComponent {...iconProps} />
      <IconComponent {...iconProps} name='angle-down' />
    </TouchableOpacity>
  );
}

function DeconstructButton(props: { state: string[], index: number, branchChecked: ('all'|'some'|'none')[],
  branch: CategoryBranch, deconstructPress: (index: number) => void }) {
  const { state, index, branchChecked, branch, deconstructPress } = props;
  let text = ` Deconstruct`;
  if (branchChecked[index] === 'all' || branchChecked[index] === 'none') { text = `${text} All`; }
  else { text = `${text} Selected`; }
  text = `${text} ${ETD[branch.order].label}`;
  if (state[index] === 'confirmDeconstruct') { text = ` Really${text}?`; }

  return (
    <TouchableOpacity style={[styles.buttonMedium, styles.buttonAway,
      {alignSelf: 'center'}]} onPress={() => deconstructPress(index)} >
      <IconComponent provider="FontAwesome5" name="bomb" color="#fff" size={12}
        style={styles.headingIcon} />
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

function NextButton(props: { branches: CategoryBranch[], anyDeconstructed: boolean,
  nextPress: () => void }) {
  const { branches, anyDeconstructed, nextPress} = props;
  let text = ' Next';
  if (branches) { text = ' Keep All'; }
  if (anyDeconstructed) { text = ' Keep Remaining'; }

  return (
    <TouchableOpacity style={[styles.buttonLarge, {alignSelf: 'center', marginBottom: 20}]}
      onPress={() => nextPress()} >
      <IconComponent provider="FontAwesome" color="#fff" size={16} style={styles.headingIcon}
        name={(branches.length > 0) ? "arrow-down" : "arrow-right"} />
      <Text style={styles.buttonTextLarge}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}