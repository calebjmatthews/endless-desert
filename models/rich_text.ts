export default class RichText {
  type: 'View'|'Text'|'Icon' = 'Text';
  props?: any;
  contents?: (RichText|string)[];

  constructor(richText: RichText) {
    Object.assign(this, richText);
  }
};