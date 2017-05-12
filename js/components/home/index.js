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
import {Modal, View} from 'react-native';
import * as drawerActions from '../../actions/drawer';
import * as productActions from '../../actions/product';

import styles from './styles';

class Home extends Component {
  state = {
    modalVisible: false,
    choseCategory: ''
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillMount() {
    this.props.actions.allProducts();
  }

  render() {
    const {choseCategory, modalVisible} = this.state;
    const products = this.props.products.map((product, index) => {
      let active = product.prepaid_products.length > 0 ? '#FDF0DD' : '#FFFFFF';
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
              <Text note>{product.text.slice(0, 50)}...</Text>
          </Body>
          <Right>
              <Icon active style={styles.arrowForward} name="arrow-forward"/>
          </Right>
      </ListItem>
    });
    const categories = this.props.categories.map((category, index) => {
      return <Button 
              transparent 
              style={styles.modalList} 
              key={index}
              onPress={() => {
                this.props.actions.fetchProductWithCategory(category.id);
                this.setModalVisible(!modalVisible);
                this.setState({choseCategory: category.id})
              }}
              >
        <Text> {category.name} </Text> 
        {this.state.choseCategory == category.id ? <Icon name="checkmark" /> : null}
      </Button>
    });
    return (
      <Container style={styles.container}>
      <Modal
          animationType={"fade"}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => this.setModalVisible(!modalVisible)}>
         <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text>
              </Text>
              <Text>
                Виберіть категорію
              </Text>
              <Text>
                <Icon name="close" style={styles.closeBtn} onPress={() => this.setModalVisible(!modalVisible)} />
              </Text>
            </View>
            <Button
              transparent 
              style={styles.modalList}
              onPress={() => {
                this.props.actions.fetchProductWithCategory('0');
                this.setModalVisible(!modalVisible);
                this.setState({choseCategory: '0'})
                }}
            >
              <Text> Всі </Text> 
              {this.state.choseCategory == '0' ? <Icon name="checkmark" /> : null}
            </Button>
            {categories}
         </View>
        </Modal>
        <Header>
          <Left>
            <Button transparent onPress={this.props.actions.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Left>
          <Body>
            <Title>{(this.props.session.username) ? this.props.session.username : 'Головна'}</Title>
          </Body>
           <Right>
            <Button transparent onPress={() => {
              this.props.actions.allProducts;
              this.props.actions.fetchProductWithCategory(choseCategory != "" ? choseCategory : "0")
            }}>
              <Icon active name="refresh"/>
            </Button>
          </Right>
        </Header>
        <Content>
          {products}
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => {
              this.setModalVisible(!modalVisible)
            }}>
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
    products: state.products,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...productActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
