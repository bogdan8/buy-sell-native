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
    if (this.state.email == "" || this.state.username == "" || this.state.password == "" || this.state.telephone == "") {
      showToast('Ви незаповнели обов\'язкові поля', 'warning');
    } else {
      if (this.state.password != this.state.repeat_password) {
        showToast('Паролі незбігаються', 'danger');
      } else {
        let paramsUser = {
          avatar: this.state.avatar,
          username: this.state.username,
          email: this.state.email,
          telephone: this.state.telephone,
          location: this.state.location,
          password: this.state.password
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
                { this.state.avatarSource === null ?
                  <View style={styles.avatarContainer}><Text><Icon style={{color: '#fff'}} name="cloud-upload"/></Text></View> :
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                }
              </View>
            </TouchableOpacity>
            <Item floatingLabel
                  error={this.state.username.length < 3 ? true : false }
                  success={this.state.username.length < 3 ? false : true }
                  style={styles.input}>
              <Label>{"Ім'я*"}</Label>
              <Input  
                returnKeyType="next"
                onChangeText={(val) => this.setState({username: val})}
              />
              <Icon name={this.state.username.length < 3 ? 'close-circle' : 'checkmark-circle'} />
            </Item>
            <Item floatingLabel
                  error={this.state.email.length < 6 ? true : false }
                  success={this.state.email.length < 6 ? false : true }
                  style={styles.input}>
              <Label>Електрона пошта*</Label>
              <Input 
                returnKeyType="next"
                keyboardType='email-address'
                onChangeText={(val) => this.setState({email: val})}
              />
              <Icon name={this.state.email.length < 5 ? 'close-circle' : 'checkmark-circle'} />
            </Item>
            <Item floatingLabel
                  error={this.state.telephone.length < 10 ? true : false }
                  success={this.state.telephone.length < 10 ? false : true }
                  style={styles.input}>
              <Label>Телефон*</Label>
              <Input
                returnKeyType="next" 
                keyboardType='numeric'
                maxLength={10}
                onChangeText={(val) => this.setState({telephone: val})}
              />
              <Icon name={this.state.telephone.length < 10 ? 'close-circle' : 'checkmark-circle'} />
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
                  error={this.state.password.length < 6 ? true : false }
                  success={this.state.password.length < 6 ? false : true }
                  style={styles.input}>
              <Label>Пароль*</Label>
              <Input
                returnKeyType="next"
                onChangeText={(val) => this.setState({password: val})}
                secureTextEntry
              />
              <Icon name={this.state.password.length < 6 ? 'close-circle' : 'checkmark-circle'} />
            </Item>
            <Item floatingLabel
                  error={this.state.repeat_password.length < 6 ? true : false }
                  success={this.state.repeat_password.length < 6 ? false : true }
                  style={styles.input}>
              <Label>Повторіть пароль*</Label>
              <Input
                returnKeyType="send"
                onChangeText={(val) => this.setState({repeat_password: val})}
                secureTextEntry
              />
              <Icon name={this.state.repeat_password.length < 6 ? 'close-circle' : 'checkmark-circle'} />
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
