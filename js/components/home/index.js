import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
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
  Left,
  ListItem,
  Thumbnail,
  Footer,
  FooterTab,
  Picker,
  Item
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
      let active = product.prepaid_products.length > 0 ? 'rgba(255,153,130,.74)' : '#FFFFFF';
      return <ListItem avatar 
              key={index}  
              onPress={() => Actions.cartProduct({product}) }
              style={{backgroundColor: active, marginLeft: 0}}
            >
          <Left style={{marginLeft: 5}}>
              <Thumbnail  square size={80} source={{uri: `http://fshop.ustk.in.ua/system/products/images/${product.id}/medium/${product.image_file_name}`}} />
          </Left>
          <Body>
              <Text>{product.user.username ? product.user.username : 'Користувач'}  </Text>
              <Text note>{product.text}</Text>
          </Body>
          <Right>
              <Icon active style={styles.arrowForward} name="arrow-forward"/>
          </Right>
      </ListItem>
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
        <Footer>
          <FooterTab>
            <Button>
                <Icon name="list" />
            </Button>
          </FooterTab>
        </Footer>
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
