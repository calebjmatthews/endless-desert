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
    justifyContent: 'flex-start'
  },
  containerStretchColumn: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  column: {
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
    fontSize: 16
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
    backgroundColor: '#071f56',
    color: '#fff',
    borderRadius: 2
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
    borderRadius: 2
  },
  buttonDisabled: {
    backgroundColor: '#97a4c3'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#fff'
  },
  buttonTextLarge: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#fff'
  },
  buttonRow: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 2
  },
  buttonRowItem: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    padding: 2,
    backgroundColor: '#071f56',
    color: '#fff',
    borderRadius: 2
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
    position: 'absolute',
    opacity: 0.5,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  modal: {
    minWidth: '60%',
    minHeight: '40%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 2
  },
  emphasis: {
    fontStyle: 'italic'
  },
  break: {
    marginTop: 10
  },

  statusBarSpacer: {
    height: 50
  },
  headingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    marginTop: 5,
    marginBottom: 20
  },
  buttonTabWrapper: {
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
  headingBadge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    margin: 5,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#071f56',
    borderRadius: 2
  }
});
