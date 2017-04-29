import {Toast} from 'native-base';

export function showToast(message) {
  Toast.show({
    text: message,
    position: 'bottom',
    buttonText: 'X'
  });
}