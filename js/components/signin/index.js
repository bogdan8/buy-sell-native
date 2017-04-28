import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Item, Input, Button, Icon, View, Text, Header, Left, Body, Right, Title} from 'native-base';
import {Actions} from 'react-native-router-flux';

import {setIndex} from '../../actions/list';
import {openDrawer} from '../../actions/drawer';
import styles from './styles';

class SignIn extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    setUser: React.PropTypes.func,
  };

  newPage(index) {
    this.props.setIndex(index);
  }

  constructor(props) {
    super(props);
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
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Right>
        </Header>

        <Content>
          <View style={styles.bg}>
            <Item style={styles.input}>
              <Icon active name="person"/>
              <Input placeholder="EMAIL" onChangeText={name => this.setState({ name })}/>
            </Item>
            <Item style={styles.input}>
              <Icon name="unlock"/>
              <Input
                placeholder="PASSWORD"
                secureTextEntry
              />
            </Item>
            <Button style={styles.btn} onPress={() => Actions.signin()}>
              <Text>SignIn</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: 'Bobo',
});

export default connect(mapStateToProps, bindAction)(SignIn);
