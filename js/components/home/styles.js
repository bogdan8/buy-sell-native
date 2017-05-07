import {Dimensions, Platform} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#FBFAFA',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  productImage: {
    width: deviceWidth - 40,
    height: 150
  },
  arrowForward: {
    color: (Platform.OS === 'ios') ? '#F8F8F8' : '#4179F7'
  }
};
