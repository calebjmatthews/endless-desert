import Icon from './icon';
import { DESTINATION_TYPES } from '../enums/destination_types';

export default class Destination {
  id: string = '';
  name: string = '';
  coordinates: [number, number] = [0, 0];
  atFinish: { id: string, type: DESTINATION_TYPES } = {
    id: 'id_missing',
    type: DESTINATION_TYPES.DESTINATION_TYPE_MISSING
  };
  icon: Icon = new Icon({provider: '', name: ''});

  constructor(destination: Destination) {
    Object.assign(this, destination);
  }
}