import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Content, Text, ListItem} from 'native-base';
import {Actions} from 'react-native-router-flux';

import * as drawerActions from '../../actions/drawer';
import * as listActions from '../../actions/list';

import styles from './style';

class SideBar extends Component {

  navigateTo(route) {
    this.props.actions.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content style={styles.sidebar}>
        <ListItem button onPress={() => { Actions.home(); this.props.actions.closeDrawer(); }}>
          <Text>Home</Text>
        </ListItem>
        <ListItem button onPress={() => { Actions.signin(); this.props.actions.closeDrawer(); }}>
          <Text>SignIn</Text>
        </ListItem>
      </Content>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...listActions}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SideBar);
