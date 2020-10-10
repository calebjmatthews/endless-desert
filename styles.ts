import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  panelFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: 0.9,
    minWidth: 280,
    minHeight: 50,
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#00000080',
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2}
  },
  dropdownList: {
    position: 'absolute',
    top: 83,
    right: 20,
    opacity: 0.95,
    backgroundColor: '#fff',
    borderRadius: 2
  },
  dropdownListItem: {
    padding: 8,
    margin: -1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000'
  },
  heading1: {
    fontSize: 20,
    color: '#fff',
    textShadowColor: '#00000080',
    textShadowRadius: 2,
    textShadowOffset: {width: 0, height: 2}
  },
  bareText: {
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: {width: 0, height: 1}
  },

  statusBarSpacer: {
    height: 50
  },
  headingWrapper: {
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
  }
});
