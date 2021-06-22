export default class Positioner {
  screenWidth: number = 320;
  screenHeight: number = 540;

  majorPadding: number = 20;
  minorPadding: number = 10;
  iconSpacer: number = 55;
  headerSpacer: number = 70;
  titleSpacer: number = 25;

  bodyHeight: number = 470;
  majorWidth: number = 280;
  minorWidth: number = 130;
  bodyMedWidth: number = 225;
  modalWidth: number = 300;
  modalMajor: number = 260;
  modalHalf: number = 130;
  modalThird: number = 90;
  modalHeight: number = 375;
  modalHeightMajor: number = 210;
  modalHeightMinor: number = 140;

  constructor(screenWidth?: number, screenHeight?: number) {
    if (screenWidth && screenHeight) {
      this.screenWidth = screenWidth; this.screenHeight = screenHeight;
      this.bodyHeight = screenHeight - (this.headerSpacer);
      this.majorWidth = screenWidth - (this.majorPadding * 2);
      this.minorWidth = (this.majorWidth / 2) - this.minorPadding;
      this.bodyMedWidth = this.majorWidth - this.iconSpacer;
      this.modalWidth = screenWidth - (this.minorPadding * 2);
      this.modalMajor = screenWidth - (this.minorPadding * 4);
      this.modalHalf = (screenWidth / 2) - (this.minorPadding * 2);
      this.modalThird = (screenWidth / 3) - (this.minorPadding * 2);
      this.modalHeight = this.bodyHeight * 0.8;
      this.modalHeightMajor = ((this.modalHeight - this.titleSpacer) * 0.6)
        - this.minorPadding;
      this.modalHeightMinor = ((this.modalHeight - this.titleSpacer) * 0.4)
        - this.minorPadding;
    }
  }
}
