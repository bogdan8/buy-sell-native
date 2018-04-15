import {Toast} from 'native-base';

export function showToast(message, level) {
  Toast.show({
    text: message,
    position: 'bottom',
    buttonText: 'X',
    type: level,
    duration: 3000
  });
}