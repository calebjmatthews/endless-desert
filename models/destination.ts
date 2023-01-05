import Icon from './icon';
import { utils } from '../utils';
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

  constructor(destination: DestinationInterface) {
    Object.assign(this, destination);
  }

  getFriendlyCoordinates() {
    const eorw = (this.coordinates[0] >= 0) ? 'E' : 'W';
    const nors = (this.coordinates[1] >= 0) ? 'N' : 'S';
    const xExtent = utils.formatNumberShort(Math.abs(this.coordinates[0]));
    const yExtent = utils.formatNumberShort(Math.abs(this.coordinates[1]));
    return `${xExtent}°${eorw}, ${yExtent}°${nors}`;
  }
}

interface DestinationInterface {
  id: string;
  name: string;
  coordinates: [number, number];
  atFinish: { id: string, type: DESTINATION_TYPES };
  icon: Icon;
}