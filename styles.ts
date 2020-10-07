import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    margin: 5
  },
  statusBarSpacer: {
    height: 50
  },
  heading1: {
    fontSize: 20
  },

  buttonResearchWrapper: {
    width: 110,
    marginRight: 10
  }
});
