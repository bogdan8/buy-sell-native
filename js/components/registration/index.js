import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  Header,
  Body,
  Right,
  Left,
  Title,
  Label,
  Spinner
} from 'native-base';
import {TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {showToast} from '../../helpers/helpers';

import * as drawerActions from '../../actions/drawer';
import * as userActions from '../../actions/user';

import styles from './styles';

class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      telephone: "",
      location: "",
      password: "",
      repeat_password: "",
      loading: false,
      avatarSource: null,
      avatar: new Image()
    }
  }

  onRegisterPressed() {
    const {email, username, password, telephone, repeat_password, avatar, location} = this.state;
    const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (username.length < 3 || password.length < 6 || telephone.length < 10) {
      showToast('Ви незаповнели обов\'язкові поля', 'warning');
    } else {
      if (!re.test(email)) {
        showToast("Невірний формат 'email'", 'warning');
      } else {
        if (password != repeat_password) {
          showToast('Паролі незбігаються', 'danger');
        } else {
          let paramsUser = {
            avatar: avatar,
            username: username,
            email: email,
            telephone: telephone,
            location: location,
            password: password
          };
          this.setState({
            loading: true
          });
          this.props.actions.addUser(paramsUser).then(() => {
            this.setState({
              loading: false
            })
          });
        }
      }
    }
  }

  isLoading() {
    if (!this.state.loading) {
      return <Button style={styles.btn} onPress={this.onRegisterPressed.bind(this)}>
        <Text>Зареєструватись</Text>
      </Button>
    } else {
      return <Spinner color='blue'/>
    }
  }

  selectPhotoTapped() {
    const options = {
      title: 'Виберіть фото',
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
      },
      quality: 0.8,
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 1000
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        showToast('Ви відмінили вибір фотографії', 'warning');
      }
      else if (response.error) {
        showToast(`Помилка ${response.error}`, 'danger');
      }
      else if (response.customButton) {
        showToast(response.customButton, 'danger');
      }
      else {
        let source = { uri: response.uri };
        
        this.setState({
          avatarSource: source,
          avatar: response
        });
      }
    });
  }

  render() {
    const {email, username, password, telephone, repeat_password, avatarSource} = this.state;
    const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.props.actions.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Left>
          <Body>
            <Title>Реєстрація</Title>
          </Body>
        </Header>

        <Content>
          <Body style={styles.bg}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View>
                { avatarSource === null ?
                  <View style={styles.avatarContainer}><Text><Icon style={{color: '#fff'}} name="cloud-upload"/></Text></View> :
                  <Image style={styles.avatar} source={avatarSource} />
                }
              </View>
            </TouchableOpacity>
            <Item floatingLabel
                  error={username.length < 3 && username != "" ? true : false }
                  success={username.length < 3 ? false : true }
                  style={styles.input}>
              <Label>{"Ім'я*"}</Label>
              <Input  
                returnKeyType="next"
                onChangeText={(val) => this.setState({username: val})}
              />
              {username != "" ? <Icon name={username.length < 3 ? 'close-circle' : 'checkmark-circle'} /> : "" }
            </Item>
            <Item floatingLabel
                  error={!re.test(email) && email != "" ? true : false }
                  success={!re.test(email) ? false : true }
                  style={styles.input}>
              <Label>Електрона пошта*</Label>
              <Input 
                returnKeyType="next"
                keyboardType='email-address'
                onChangeText={(val) => this.setState({email: val})}
              />
              {email != "" ? <Icon name={!re.test(email) ? 'close-circle' : 'checkmark-circle'} /> : ""}
            </Item>
            <Item floatingLabel
                  error={telephone.length < 10 && telephone != "" ? true : false }
                  success={telephone.length < 10 ? false : true }
                  style={styles.input}>
              <Label>Телефон*</Label>
              <Input
                returnKeyType="next" 
                keyboardType='numeric'
                maxLength={10}
                onChangeText={(val) => this.setState({telephone: val})}
              />
              { telephone != "" ? <Icon name={telephone.length < 10 ? 'close-circle' : 'checkmark-circle'} /> : "" }
            </Item>
            <Item floatingLabel
                  style={styles.input}>
              <Label>Місце знаходження</Label>
              <Input
                returnKeyType="next" 
                multiline={true}
                onChangeText={(val) => this.setState({location: val})}
              />
            </Item>
            <Item floatingLabel
                  error={password.length < 6 && password != "" ? true : false }
                  success={password.length < 6 ? false : true }
                  style={styles.input}>
              <Label>Пароль*</Label>
              <Input
                returnKeyType="next"
                onChangeText={(val) => this.setState({password: val})}
                secureTextEntry
              />
              { password != "" ? <Icon name={password.length < 6 ? 'close-circle' : 'checkmark-circle'} /> : "" }
            </Item>
            <Item floatingLabel
                  error={repeat_password != password && repeat_password != "" ? true : false }
                  success={repeat_password == "" ? false : repeat_password != password ? false : true }
                  style={styles.input}>
              <Label>Повторіть пароль*</Label>
              <Input
                returnKeyType="send"
                onChangeText={(val) => this.setState({repeat_password: val})}
                secureTextEntry
              />
              {repeat_password != "" ? <Icon name={repeat_password != password ? 'close-circle' : 'checkmark-circle'} /> : "" }
            </Item>
            {this.isLoading()}
          </Body>
        </Content>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...userActions}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Registration);
