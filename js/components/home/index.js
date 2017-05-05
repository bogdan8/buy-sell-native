import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
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
  Right,
  Card,
  CardItem,
  Left,
  Thumbnail
} from 'native-base';

import * as drawerActions from '../../actions/drawer';
import * as productActions from '../../actions/product';

import styles from './styles';

class Home extends Component {

  componentWillMount() {
    this.props.actions.allProducts();
  }

  render() {
    const products = this.props.products.map((product, index) => {
      return <Card style={{ flex: 0 }} key={index}>
        <CardItem>
          <Left>
            <Thumbnail
              source={{uri: `http://fshop.ustk.in.ua/system/users/avatars/${product.user.id}/small/${product.user.avatar_file_name}`}}
            />
            <Body>
            <Text>{product.user.username ? product.user.username : 'Користувач'}</Text>
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
            <Icon name="logo-usd"/>
            <Text> {product.price}.грн</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}>
            <Icon name="clock"/>
            <Text> {product.updated_at.substring(0,10)}</Text>
          </Button>
          </Body>
        </CardItem>
      </Card>
    });
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
          <Title>{(this.props.session.username) ? this.props.session.username : 'Головна'}</Title>
          </Body>

          <Right>
            <Button transparent onPress={this.props.actions.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Right>
        </Header>
        <Content>
          {products}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...productActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
