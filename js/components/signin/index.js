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
  Label
} from 'native-base';

import * as drawerActions from '../../actions/drawer';
import * as listActions from '../../actions/list';
import * as sessionActions from '../../actions/session';
import * as notificationActions from '../../actions/notification';

import styles from './styles';

class SignIn extends Component {
  newPage(index) {
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
    const {notification} = this.props;
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
                  success={notification.level == 'success' ? true : false }
                  error={notification.level == 'error' ? true : false }
                  style={styles.input}>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.setState({email: text})}/>
            </Item>
            <Item floatingLabel
                  success={notification.level == 'success' ? true : false }
                  error={notification.level == 'error' ? true : false }
                  style={styles.input}>
              <Label>Password</Label>
              <Input
                onChangeText={(text) => this.setState({password: text})}
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
