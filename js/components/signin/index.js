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
import {showToast} from '../../helpers/helpers';

import * as drawerActions from '../../actions/drawer';
import * as sessionActions from '../../actions/session';

import styles from './styles';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false,
    }
  }

  onLoginPressed() {
    if (this.state.email.length < 6 || this.state.password.length < 6) {
      showToast('Ви нічого неввели', 'warning');
    } else {
      let credentials = {
        email: this.state.email,
        password: this.state.password
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
    const { email, password } = this.state;
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
                  error={email.length < 6 && email != "" ? true : false }
                  success={email.length < 6 ? false : true }
                  style={styles.input}>
              <Label>Email *</Label>
              <Input onChangeText={(text) => this.setState({email: text})}/>
              { email != "" ? <Icon name={email.length < 6 ? 'close-circle' : 'checkmark-circle'} /> : "" }
            </Item>
            <Item floatingLabel
                  error={password.length < 6 && password != "" ? true : false }
                  success={password.length < 6 ? false : true }
                  style={styles.input}>
              <Label>Пароль *</Label>
              <Input
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry
              />
              { password != "" ? <Icon name={password.length < 6 ? 'close-circle' : 'checkmark-circle'} /> : "" }
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
