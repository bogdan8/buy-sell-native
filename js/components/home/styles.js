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
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 3,
    padding: 10,
    height: 400
  },
  modalHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth - 60,
    height: 30,
    marginBottom: 20
  },
  modalList: {
    paddingTop: 5,
    paddingBottom: 5
  },
  closeBtn: {
    color: (Platform.OS === 'ios') ? '#F8F8F8' : '#4179F7'
  },
  listProduct: {
    marginLeft: 0
  },
  categoryBlcok: {
    height: 25,
    paddingTop: 6
  }
};
