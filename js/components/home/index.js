import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Header, Title, Content, Text, Button, Icon, Body, Right} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';

import * as drawerActions from '../../actions/drawer';

import styles from './styles';

class Home extends Component {

  render() {
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
          <Grid style={styles.mt}>
          </Grid>
        </Content>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(drawerActions, dispatch)
  };
}
const mapStateToProps = state => ({
  name: 'Bobo',
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
