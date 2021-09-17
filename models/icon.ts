export default class Icon {
  provider: string = '';
  name: string = '';
  size: number = 29;
  width: string = '29px';
  height: string = '29px';
  color: string = '#000';
  shadow: string = '#000';
  backgroundColor: string = '#fff';
  secondaryColor: string = '#000';
  secondaryShadow: string = '#000';
  tertiaryColor: string = '#000';
  tertiaryShadow: string = '#000';
  borderless: boolean = false;
  quality: number = 0;

  constructor(icon: IconInterface) {
    if (!icon.size) { icon.size = 29; icon.width = '29px'; icon.height = '29px'; }
    else { icon.width = icon.size + 'px'; icon.height = icon.size + 'px'; }
    if (!icon.color) { icon.color = '#000'; }
    if (!icon.shadow) { icon.shadow = '#fff'; }
    if (!icon.secondaryColor) { icon.secondaryColor = '#000'; }
    if (!icon.secondaryShadow) { icon.secondaryShadow = '#000'; }
    if (!icon.tertiaryColor) { icon.tertiaryColor = '#000'; }
    if (!icon.tertiaryShadow) { icon.tertiaryShadow = '#000'; }
    if (!icon.borderless) { icon.borderless = false; }
    if (!icon.quality) { icon.quality = 0; }
    Object.assign(this, icon);
  }
}

interface IconInterface {
  provider: string;
  name: string;
  size?: number;
  width?: string;
  height?: string;
  color?: string;
  shadow?: string;
  backgroundColor?: string;
  secondaryColor?: string;
  secondaryShadow?: string;
  tertiaryColor?: string;
  tertiaryShadow?: string;
  borderless?: boolean;
  quality?: number;
}
