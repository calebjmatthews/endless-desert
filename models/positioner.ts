export default class Positioner {
  screenWidth: number = 320;
  screenHeight: number = 540;

  majorPadding: number = 20;
  minorPadding: number = 10;
  iconSpacer: number = 55;
  headerSpacer: number = 80;
  headerSpacerAndroid: number = 39;
  titleSpacer: number = 25;
  buildingButtonSpacer: number = 47;

  bodyHeight: number = 470;
  majorWidth: number = 280;
  minorWidth: number = 130;
  bodyMedWidth: number = 225;
  buildingBarWidth: number = 208;
  modalWidth: number = 300;
  modalMajor: number = 260;
  modalMinor: number = 240;
  modalHalf: number = 130;
  modalThird: number = 90;
  modalHeight: number = 375;
  modalHeightMajor: number = 210;
  modalHeightMinor: number = 140;
  speechPartnerWidth: number = 55;
  speechBubbleWidth: number = 200;
  speechButtonWidth: number = 270;
  mapHeight: number = 460;
  confirmationRowHeight: number = 108;

  constructor(screenWidth?: number, screenHeight?: number, os?: string) {
    if (screenWidth && screenHeight) {
      this.screenWidth = screenWidth; this.screenHeight = screenHeight;
      switch(os) {
        case('android'):
          this.bodyHeight = screenHeight - (this.headerSpacerAndroid); break;
        default:
        this.bodyHeight = screenHeight - (this.headerSpacer); break;
      }
      this.majorWidth = screenWidth - (this.majorPadding * 2);
      this.minorWidth = (this.majorWidth / 2) - this.minorPadding;
      this.bodyMedWidth = this.majorWidth - this.iconSpacer;
      this.buildingBarWidth = this.majorWidth - this.buildingButtonSpacer
        - (this.minorPadding * 2);
      this.modalWidth = screenWidth - (this.minorPadding * 2);
      this.modalMajor = screenWidth - (this.minorPadding * 4);
      this.modalMinor = screenWidth - (this.minorPadding * 8);
      this.modalHalf = (screenWidth / 2) - (this.minorPadding * 2);
      this.modalThird = (screenWidth / 3) - (this.minorPadding * 2);
      this.modalHeight = this.bodyHeight * 0.8;
      this.modalHeightMajor = ((this.modalHeight - this.titleSpacer) * 0.6)
        - this.minorPadding;
      this.modalHeightMinor = ((this.modalHeight - this.titleSpacer) * 0.4)
        - this.minorPadding;
      this.speechBubbleWidth = this.modalWidth - this.speechPartnerWidth
        - (this.majorPadding * 2);
      this.speechButtonWidth = this.modalMajor - this.majorPadding;
      this.mapHeight = this.bodyHeight - (this.majorPadding * 2.5);
    }
  }
}
