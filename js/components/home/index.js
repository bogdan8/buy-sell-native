import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';

import * as drawerActions from '../../actions/drawer';
import * as listActions from '../../actions/list';

import styles from './styles';

class Home extends Component {

  newPage(index) {
    this.props.actions.setIndex(index);
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
          <Grid style={styles.mt}>
          </Grid>
        </Content>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, listActions}, dispatch)
  };
}
const mapStateToProps = state => ({
  name: 'Bobo',
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
