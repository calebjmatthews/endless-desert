export default class Positioner {
  screenWidth: number = 320;
  screenHeight: number = 540;

  majorPadding: number = 20;
  minorPadding: number = 10;
  iconSpacer: number = 60
  headerSpacer: number = 70;

  bodyHeight: number = 470;
  majorWidth: number = 280;
  minorWidth: number = 130;
  bodyMedWidth: number = 220;
  modalWidth: number = 300;
  modalHalf: number = 130;
  modalThird: number = 90;

  constructor(screenWidth?: number, screenHeight?: number) {
    if (screenWidth && screenHeight) {
      this.screenWidth = screenWidth; this.screenHeight = screenHeight;
      this.bodyHeight = screenHeight - (this.headerSpacer);
      this.majorWidth = screenWidth - (this.majorPadding * 2);
      this.minorWidth = (this.majorWidth / 2) - this.minorPadding;
      this.bodyMedWidth = this.majorWidth - this.iconSpacer;
      this.modalWidth = screenWidth - (this.minorPadding * 2);
      this.modalHalf = (screenWidth / 2) - this.minorPadding;
      this.modalThird = (screenWidth / 3) - this.minorPadding;
    }
  }
}
