export default class ImplementType {
  typeName: string = '';
  provides: { [pointType: string] : number } = {};

  constructor(implementType: ImplementType) {
    Object.assign(this, implementType);
  }
}