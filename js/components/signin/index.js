import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Content, Item, Input, Button, Icon, View, Text, Header, Left, Body, Right, Title} from 'native-base';
import {Actions} from 'react-native-router-flux';

import * as drawerActions from '../../actions/drawer';
import * as listActions from '../../actions/list';
import * as sessionActions from '../../actions/session';
import * as notificationActions from '../../actions/notification';

import styles from './styles';

class SignIn extends Component {
  newPage(index) {
    console.log('casdas');
    this.props.actions.setIndex(index);
  }
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }
  onLoginPressed() {
    if (this.state.email != "" && this.state.password != "") {
      let credentials = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.actions.logInUser(credentials);
    } else {
      this.props.actions.addNotification('Ви нічого неввели', 'error')
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.signin({ type: ActionConst.RESET })}>
              <Icon active name="power"/>
            </Button>
          </Left>

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
            <Item style={styles.input}>
              <Icon active name="person"/>
              <Input placeholder="EMAIL" onChangeText={(text) => this.setState({email: text})}/>
            </Item>
            <Item style={styles.input}>
              <Icon name="unlock"/>
              <Input
                onChangeText={(text) => this.setState({password: text})}
                placeholder="PASSWORD"
                secureTextEntry
              />
            </Item>
            <Text>
              {this.props.notification.message ? this.props.notification.message : '' }
            </Text>
            <Button style={styles.btn} onPress={this.onLoginPressed.bind(this)}>
              <Text>SignIn</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  name: 'Bobo',
  notification: state.notification
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...listActions, ...sessionActions, ...notificationActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
