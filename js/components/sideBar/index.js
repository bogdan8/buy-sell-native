import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Content, Text, ListItem} from 'native-base';
import {Actions} from 'react-native-router-flux';

import * as drawerActions from '../../actions/drawer';

import styles from './style';

class SideBar extends Component {

  render() {
    return (
      <Content style={styles.sidebar}>
        <ListItem button onPress={() => { Actions.home(); this.props.actions.closeDrawer(); }}>
          <Text>Головна</Text>
        </ListItem>
        <ListItem button onPress={() => { Actions.signin(); this.props.actions.closeDrawer(); }}>
          <Text>Вхід</Text>
        </ListItem>
        <ListItem button onPress={() => { Actions.registration(); this.props.actions.closeDrawer(); }}>
          <Text>Реєстрація</Text>
        </ListItem>
      </Content>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(drawerActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SideBar);
