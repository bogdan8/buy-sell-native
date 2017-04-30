import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  Header,
  Body,
  Right,
  Title,
  Label,
  Spinner,
  Picker
} from 'native-base';
import {showToast} from '../../helpers/helpers';

import * as drawerActions from '../../actions/drawer';
import * as productActions from '../../actions/product';
import * as categoryActions from '../../actions/category';
import * as sessionActions from '../../actions/session';

import styles from './styles';

class CreateProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      category_id: "",
      price: 0,
      loading: false,
    }
  }

  componentWillMount(){
    this.props.actions.allCategories();
  }

  onCreateProductPressed() {
    if (this.state.text == "" && this.state.price == "" && this.state.category_id == "" ) {
      showToast('Ви незаповнели обов\'язкові поля');
    } else {
      let paramsProduct = {
        text: this.state.text,
        user_id: this.props.session.id,
        category_id: this.state.category_id,
        price: this.state.price,
      };
      this.setState({
        loading: true
      });
      this.props.actions.addProduct(paramsProduct, this.props.session.jwt).then(() => {
        this.setState({
          loading: false
        })
      });
    }
  }

  isLoading() {
    if (!this.state.loading) {
      return <Button style={styles.btn} onPress={this.onCreateProductPressed.bind(this)}>
        <Text>Додати</Text>
      </Button>
    } else {
      return <Spinner color='blue'/>
    }
  }

  render() {
    const categories = this.props.categories.map((category, index) => {
      return <Item key={index} label={category.name} value={category.id} />
    });
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>{(this.props.session.username) ? this.props.session.username : 'Home'}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.props.actions.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Right>
        </Header>

        <Content>
          <Label style={styles.pickerTitle}>Категорія*</Label>
          <Picker
            style={styles.bg}
            iosHeader="Select one"
            mode="dropdown"
            selectedValue={this.state.category_id}
            onValueChange={(val) => this.setState({category_id: val})}>
            {categories}
          </Picker>
          <View style={styles.bg}>
            <Item floatingLabel
                  error={this.state.text == "" ? true : false }
                  style={styles.input}>
              <Label>Опис*</Label>
              <Input onChangeText={(val) => this.setState({text: val})}/>
            </Item>
            <Item floatingLabel
                  error={this.state.price == "" ? true : false }
                  style={styles.input}>
              <Label>Ціна (грн)*</Label>
              <Input onChangeText={(val) => this.setState({price: val})}/>
            </Item>
            {this.isLoading()}
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
  	categories: state.categories,
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...productActions, ...sessionActions, ...categoryActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
