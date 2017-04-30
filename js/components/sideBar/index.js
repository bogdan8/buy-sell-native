import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Content, Text, ListItem} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {View} from 'react-native';

import * as drawerActions from '../../actions/drawer';
import * as sessionActions from '../../actions/session';

import styles from './style';

class SideBar extends Component {

  menu() {
    if (!this.props.session.jwt) {
      return <View>
        <ListItem button onPress={() => { Actions.signin(); this.props.actions.closeDrawer(); }}>
          <Text>Вхід</Text>
        </ListItem>
        <ListItem button onPress={() => { Actions.registration(); this.props.actions.closeDrawer(); }}>
          <Text>Реєстрація</Text>
        </ListItem>
      </View>
    } else {
      return <View>
        <ListItem button onPress={() => { Actions.createProduct(); this.props.actions.closeDrawer(); }}>
          <Text>Додати оголошення</Text>
        </ListItem>
        <ListItem button onPress={() => { this.props.actions.signOutUser(); this.props.actions.closeDrawer(); }}>
          <Text>Вихід</Text>
        </ListItem>
      </View>
    }
  }

  render() {
    return (
      <Content style={styles.sidebar}>
        <ListItem button onPress={() => { Actions.home(); this.props.actions.closeDrawer(); }}>
          <Text>Головна</Text>
        </ListItem>
        {this.menu()}
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...sessionActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
