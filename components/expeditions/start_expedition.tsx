import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import IconComponent from '../icon';

export default function StartExpeditionButton(props: { onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.buttonLarge, {alignSelf: 'center', marginTop: 5, marginBottom: 10}]}
      onPress={() => props.onPress()} >
      <IconComponent provider="FontAwesome5" color="#fff" size={16} style={styles.headingIcon}
        name={"walking"} />
      <Text style={styles.buttonTextLarge}>
        {' Start a new expedition'}
      </Text>
    </TouchableOpacity>
  )
}