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

  constructor(icon: IconInterface|null) {
    if (icon) {
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

  export() {
    const expIcon: IconInterface = {
      provider: this.provider,
      name: this.name
    };
    if (this.size !== 29) { expIcon.size = this.size; }
    if (!this.size && this.width !== '29px') { expIcon.width = this.width; }
    if (!this.size && this.height !== '29px') { expIcon.height = this.height; }
    if (this.color !== '#000') { expIcon.color = this.color; }
    if (this.shadow !== '#fff') { expIcon.shadow = this.shadow; }
    if (this.secondaryColor !== '#000') {
      expIcon.secondaryColor = this.secondaryColor;
    }
    if (this.secondaryShadow !== '#fff') {
      expIcon.secondaryShadow = this.secondaryShadow;
    }
    if (this.tertiaryColor !== '#000') {
      expIcon.tertiaryColor = this.tertiaryColor;
    }
    if (this.tertiaryShadow !== '#fff') {
      expIcon.tertiaryShadow = this.tertiaryShadow;
    }
    if (this.borderless) { expIcon.borderless = this.borderless; }
    if (this.quality) { expIcon.quality = this.quality; }
    return expIcon;
  }
}

export interface IconInterface {
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
