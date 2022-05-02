import { StyleSheet } from 'react-native';

// @ts-ignore
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStretchRow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  containerStretchColumn: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  containerSpacedColumn: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  scrollWrapper: {
    flex: 1,
    maxHeight: 473
  },
  panelFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: 0.9,
    minWidth: 280,
    maxWidth: 280,
    minHeight: 50,
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#00000080',
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2}
  },
  panelFlexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: 0.9,
    minWidth: 280,
    maxWidth: 280,
    minHeight: 50,
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#00000080',
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2}
  },
  tileContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%'
  },
  panelTile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: 0.9,
    minWidth: 130,
    maxWidth: 130,
    minHeight: 50,
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#00000080',
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2}
  },
  inputBox: {
    paddingHorizontal: 5,
    maxWidth: 130,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#9ea0bd',
    borderRadius: 4
  },
  inputBoxLarge: {
    paddingVertical: 10
  },

  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%'
  },
  rows: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  spacedRows: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 2
  },
  centeredRows: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  columns: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownList: {
    position: 'absolute',
    top: 83,
    right: 20,
    opacity: 0.95,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#00000080',
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2}
  },
  dropdownListItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    margin: -1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#071f56'
  },
  dropdownHeading: {
    paddingTop: 5,
    paddingHorizontal: 5,
    fontSize: 12,
    fontStyle: 'italic'
  },
  bodyText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 13
  },
  bodyTextMed: {
    maxWidth: 220,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 13
  },
  heading1: {
    fontSize: 20,
    color: '#fff',
    textShadowColor: '#00000080',
    textShadowRadius: 2,
    textShadowOffset: {width: 0, height: 2}
  },
  heading1Inverse: {
    color: '#071f56',
    textShadowColor: '#00000000'
  },
  heading2: {
    fontSize: 16,
    textAlign: 'center'
  },
  heading3: {
    fontSize: 15
  },
  headingIcon: {
    textShadowColor: '#00000080',
    textShadowRadius: 2,
    textShadowOffset: {width: 0, height: 2}
  },
  bareText: {
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: {width: 0, height: 1}
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#071f56',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#071f56'
  },
  buttonLarge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    backgroundColor: '#071f56',
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#071f56'
  },
  buttonDisabled: {
    backgroundColor: '#97a4c3',
    borderColor: '#97a4c3'
  },
  buttonLight: {
    backgroundColor: '#fff',
    borderColor: '#071f56'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'sans-serif',
    color: '#fff'
  },
  buttonTextLarge: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: '#fff'
  },
  buttonTextSmall: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'sans-serif',
    color: '#fff'
  },
  buttonTextDark: {
    color: '#071f56'
  },
  buttonTextAway: {
    color: '#5a201e'
  },
  buttonRow: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  buttonRowItem: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    padding: 2,
    backgroundColor: '#071f56',
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#071f56',
    borderRadius: 2
  },
  buttonRowItemSmall: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 19,
    minWidth: 55,
    paddingHorizontal: 2,
    backgroundColor: '#071f56',
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#071f56',
    borderRadius: 2
  },
  buttonRowDetail: {
    paddingHorizontal: 5,
    marginLeft: 10,
    marginVertical: 1,
    backgroundColor: '#404c7d',
    borderRadius: 2
  },
  buttonRowDetailText: {
    fontSize: 12,
    color: '#fff'
  },
  buttonTextRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    alignSelf: 'stretch'
  },
  buttonSubtle: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    padding: 2,
    paddingRight: 6,
    backgroundColor: '#fff',
    color: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#73799f',
    borderRadius: 2
  },
  buttonAway: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 6,
    backgroundColor: '#5a201e',
    borderColor: '#5a201e'
  },
  buttonOutlineAway: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 6,
    backgroundColor: '#fff',
    borderColor: '#5a201e'
  },
  sideButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10
  },
  sideButton: {
    minWidth: 40,
    borderWidth: 0
  },
  modalContainer: {
    zIndex: 100,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  modalBackground: {
    zIndex: 99,
    position: 'absolute',
    opacity: 0.5,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  modal: {
    zIndex: 100,
    minWidth: 300,
    maxWidth: 300,
    maxHeight: '80%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 2
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  emphasis: {
    fontStyle: 'italic'
  },
  break: {
    marginTop: 10
  },
  breakSmall: {
    marginTop: 4
  },

  statusBarSpacer: {
    height: 50
  },
  headingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20
  },
  saveButtonWrapper: {
    position: 'absolute',
    top: 50,
    left: 20,
    opacity: 0
  },
  menuButtonWrapper: {
    position: 'absolute',
    top: 50,
    right: 20
  },
  buttonResearchWrapper: {
    width: 110,
    marginRight: 10
  },
  quantityContainer: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  progressBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  progressBarWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    overflow: 'hidden',
    height: 14,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#071f56',
    borderRadius: 5
  },
  progressBar: {
    height: 11,
    backgroundColor: '#071f56'
  },
  progressBarLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },

  messageBarContainer: {
    zIndex: 50,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 30,
    opacity: 0.95
  },
  messageBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
    width: '100%',
    paddingHorizontal: 10,
    overflow: 'hidden'
  },
  messageBarText: {
    fontSize: 12,
    color: '#fff'
  },
  messageBarBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
    backgroundColor: '#071f56'
  },
  descriptionBand: {
    width: 280,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    opacity: 0.95
  },
  descriptionBandText: {
    textAlign: 'center',
    fontStyle: 'italic'
  },

  leaderCircle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15
  },

  infoBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff3ff',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#dce0e8',
    borderStyle: 'solid',
    marginVertical: 2,
    paddingHorizontal: 5,
    paddingVertical: 1
  },

  ratingRow: {
    position: 'absolute',
    overflow: 'hidden'
  },

  pseudoCellRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  pseudoCell: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#00000080',
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},
    opacity: 0.9
  },

  rateButton: {
    minHeight: 36,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#73799f',
    borderRadius: 2
  },

  speechBubble: {
    opacity: 0.9,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#727f9c',
    borderRadius: 10
  },

  mapColumn: {
    display: 'flex',
    flexDirection: 'column-reverse'
  }
});
