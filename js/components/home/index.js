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
  Spinner,
  Fab
} from 'native-base';
import {Modal, View, ScrollView, RefreshControl, Dimensions, NetInfo} from 'react-native';

import {showToast} from '../../helpers/helpers';

import * as drawerActions from '../../actions/drawer';
import * as productActions from '../../actions/product';

import styles from './styles';

class Home extends Component {
  state = {
    modalVisible: false,
    choseCategory: '',
    per: 10,
    isRefreshing: false,
    getData: false,
    isConnected: true
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };

  componentWillMount() {
    this.checkIfConnected();
  };

  checkIfConnected(){
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected){
        this.props.actions.allProducts(this.state.per);
        this.setState({isConnected});
      } else {
        this.setState({isConnected});
      }
    })
  }

  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.actions.allProducts;
    this.props.actions.fetchProductWithCategory(this.state.choseCategory != "" ? this.state.choseCategory : "0", this.state.per)
    .then(() => 
      this.setState({
        isRefreshing: false
      })
    );
  };

  onScroll(e) {
    const {choseCategory, per} = this.state;
    const windowHeight =  Dimensions.get('window').height,
              height = e.nativeEvent.contentSize.height,
              offset = e.nativeEvent.contentOffset.y;
    if(windowHeight + offset >= height){
      this.setState({
        getData: true,
        per: per + 5
      });
      this.props.actions.fetchProductWithCategory(choseCategory != "" ? choseCategory : "0", per + 5)
        .then(() => this.setState({
          getData: false
        })
      );

    }
  };

  render() {
    const {choseCategory, modalVisible, per, isRefreshing} = this.state;
    const products = this.props.products.map((product, index) => {
      let active = product.prepaid_products.length > 0 ? '#FDF0DD' : '#FFFFFF';
      return <ListItem avatar
                       key={index}
                       onPress={() => Actions.cartProduct({product}) }
                       style={{backgroundColor: active, ...styles.listProduct}}>
        <Left style={{marginLeft: 5}}>
          <Thumbnail square size={80}
                     source={{uri: `http://fshop.ustk.in.ua/system/products/images/${product.id}/medium/${product.image_file_name}`}}/>
        </Left>
        <Body>
          <Text> {product.user.username ? product.user.username : 'Користувач'} </Text>
          <Text note> {product.text.slice(0, 50)}... </Text>
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
                this.props.actions.fetchProductWithCategory(category.id, per);
                this.setModalVisible(!modalVisible);
                this.setState({choseCategory: category.id})
              }}>
        <Text style={styles.categoryBlcok}> {category.name} </Text>
        {choseCategory == category.id ? <Icon name="checkmark"/> : null}
      </Button>
    });

    const container = <Container style={styles.container}>
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
                <Icon name="close" style={styles.closeBtn} onPress={() => this.setModalVisible(false)}/>
              </Text>
            </View>
            <Button
              transparent
              style={styles.modalList}
              onPress={() => {
                this.props.actions.fetchProductWithCategory('0', per);
                this.setModalVisible(!modalVisible);
                this.setState({choseCategory: '0'})
                }}>
              <Text> Всі </Text>
              {choseCategory == '0' ? <Icon name="checkmark"/> : null}
            </Button>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              scrollEventThrottle={100}>
              {categories}
            </ScrollView>
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
        </Header>
        <ScrollView
          onScroll={this.onScroll.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
              tintColor="#ff0000"
              title="Завантаження..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"
            />
          }>
          {products}
          {this.state.getData ? <Spinner color='blue' /> : undefined}
        </ScrollView>
          <Fab
              active={false}
              direction="down"
              containerStyle={{ marginLeft: 10 }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomLeft"
              onPress={() => this.setModalVisible(!modalVisible)}>
              <Icon name="list"/>
          </Fab>
           <Fab
              active={false}
              direction="down"
              containerStyle={{ marginRight: 10 }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.props.session.username ? Actions.createProduct() : Actions.signin() }>
              <Icon name="add"/>
          </Fab>
      </Container>;

    const containerFailedConnect = <Container>
        <View style={styles.containerFailedConnect}>
          <Text style={styles.containerFailedConnectText}>
            У вас немає доступу до інтернету(
          </Text>
          <Button
            transparent
            style={styles.containerFailedConnectButton}
            onPress={() => this.checkIfConnected()}>
            <Icon style={styles.containerFailedConnectIcon} name="refresh"/>
          </Button>
        </View>
      </Container>;

    return this.state.isConnected ? container : containerFailedConnect;
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

