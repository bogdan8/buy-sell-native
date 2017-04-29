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
  Title,
  Label,
  Spinner
} from 'native-base';
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
    }
  }

  onRegisterPressed() {
    if (this.state.email == "" && this.state.username == "" && this.state.password == "" && this.state.telephone == "") {
      showToast('Ви незаповнели обов\'язкові поля');
    } else {
      if (this.state.password != this.state.repeat_password) {
        showToast('Паролі незбігаються');
      } else {
        let paramsUser = {
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

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
          <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>
          </Body>

          <Right>
            <Button transparent onPress={this.props.actions.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Right>
        </Header>

        <Content>
          <View style={styles.bg}>
            <Item floatingLabel
                  error={this.state.username == "" ? true : false }
                  style={styles.input}>
              <Label>{"Ім'я*"}</Label>
              <Input onChangeText={(val) => this.setState({username: val})}/>
            </Item>
            <Item floatingLabel
                  error={this.state.email == "" ? true : false }
                  style={styles.input}>
              <Label>Електрона пошта*</Label>
              <Input onChangeText={(val) => this.setState({email: val})}/>
            </Item>
            <Item floatingLabel
                  error={this.state.telephone == "" ? true : false }
                  style={styles.input}>
              <Label>Телефон*</Label>
              <Input onChangeText={(val) => this.setState({telephone: val})}/>
            </Item>
            <Item floatingLabel
                  style={styles.input}>
              <Label>Місце знаходження</Label>
              <Input onChangeText={(val) => this.setState({location: val})}/>
            </Item>
            <Item floatingLabel
                  error={this.state.password == "" ? true : false }
                  style={styles.input}>
              <Label>Пароль*</Label>
              <Input
                onChangeText={(val) => this.setState({password: val})}
                secureTextEntry
              />
            </Item>
            <Item floatingLabel
                  error={this.state.repeat_password == "" ? true : false }
                  style={styles.input}>
              <Label>Повторіть пароль*</Label>
              <Input
                onChangeText={(val) => this.setState({repeat_password: val})}
                secureTextEntry
              />
            </Item>
            {this.isLoading()}
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: 'Bobo'
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...userActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
