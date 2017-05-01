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
    if (this.state.email != "" && this.state.password != "") {
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
    } else {
      showToast('Ви нічого неввели', 'warning');
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
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
          <Title>Вхід</Title>
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
                  style={styles.input}>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.setState({email: text})}/>
            </Item>
            <Item floatingLabel
                  style={styles.input}>
              <Label>Пароль</Label>
              <Input
                onChangeText={(text) => this.setState({password: text})}
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


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...sessionActions}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
