import React, {Component} from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Body,
  Card,
  CardItem,
  Left,
  Thumbnail
} from 'native-base';

import * as drawerActions from '../../actions/drawer';

import styles from './styles';

class CartProduct extends Component {
  render() {
    const {product} = this.props;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.props.actions.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Left>
          <Body>
          <Title>{product.user.username}</Title>
          </Body>
        </Header>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{uri: `http://fshop.ustk.in.ua/system/users/avatars/${product.user.id}/small/${product.user.avatar_file_name}`}}
                />
                <Body>
                <Text>{product.user.username ? product.user.username : 'Користувач'}</Text>
                <Text note>{product.user.email}</Text>
                <Text note>{product.user.telephone}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
              <Image
                style={styles.productImage}
                source={{uri: `http://fshop.ustk.in.ua/system/products/images/${product.id}/medium/${product.image_file_name}`}}
              />
              <Text>
                {product.text}
              </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="cash"/>
                <Text> {product.price}.грн</Text>
              </Button>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="clock"/>
                <Text> {product.updated_at.substring(0, 10)}</Text>
              </Button>
              </Body>
            </CardItem>
          </Card>
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

export default connect(null, mapDispatchToProps)(CartProduct);