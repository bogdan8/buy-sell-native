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
  Left,
  Title,
  Label,
  Spinner
} from 'native-base';

import {showToast} from '../../helpers/helpers';

import * as drawerActions from '../../actions/drawer';
import * as sessionActions from '../../actions/session';

import styles from './styles';

class SignIn extends Component {

  state = {
    email: "",
    password: "",
    loading: false,
  };

  onLoginPressed() {
    const {email, password} = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(this.state.email)) {
      showToast("Невірний формат 'email'", 'warning');
    } else {
      let credentials = {
        email,
        password
      };
      this.setState({
        loading: true
      });
      this.props.actions.logInUser(credentials).then(() => {
        this.setState({
          loading: false
        })
      });
    }
  }

  isLoading() {
    if (!this.state.loading) {
      return <Button style={styles.btn} onPress={this.onLoginPressed.bind(this)}>
        <Text>Ввійти</Text>
      </Button>
    } else {
      return <Spinner color='blue'/>
    }
  }

  render() {
    const {email, password} = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.props.actions.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Left>
          <Body>
          <Title>Вхід</Title>
          </Body>
        </Header>

        <Content>
          <View style={styles.bg}>
            <Item floatingLabel
                  error={ !re.test(email) && email != "" }
                  success={ re.test(email) }
                  style={styles.input}>
              <Label>Email *</Label>
              <Input onChangeText={(text) => this.setState({email: text})}/>
              { email != "" && <Icon name={!re.test(email) ? 'close-circle' : 'checkmark-circle'}/> }
            </Item>
            <Item floatingLabel
                  error={ password.length < 6 && password != "" }
                  success={ password.length>=6 }
                  style={styles.input}>
              <Label>Пароль *</Label>
              <Input
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry
              />
              { password != "" && <Icon name={password.length < 6 ? 'close-circle' : 'checkmark-circle'}/> }
            </Item>
            {this.isLoading()}
          </View>
        </Content>
      </Container>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...sessionActions}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
