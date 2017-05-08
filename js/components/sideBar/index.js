import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';
import {Content, Text, ListItem} from 'native-base';
import {View, Image} from 'react-native';

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

  image() {
    if(this.props.session.avatar){
      return <Image
              style={{width: 150, height: 150, borderRadius: 100}}
              source={{uri: `http://fshop.ustk.in.ua/system/users/avatars/${this.props.session.id}/small/${this.props.session.avatar}`}}
            />
    }else{
      return <Text style={styles.menuTitle}> FShop </Text>
    }
  }

  render() {
    return (
      <Content style={styles.sidebar}>
        <View style={styles.menuImageBlock}>
          {this.image()}
        </View>
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
