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
  Left,
  Title,
  Label,
  Spinner,
  Picker
} from 'native-base';
import {TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {showToast} from '../../helpers/helpers';

import * as drawerActions from '../../actions/drawer';
import * as productActions from '../../actions/product';
import * as sessionActions from '../../actions/session';

import styles from './styles';

class CreateProduct extends Component {

  state = {
    text: "",
    category_id: this.props.categories[0]['id'],
    price: "",
    loading: false,
    imageSource: null,
    image: new Image,
  };

  onCreateProductPressed() {
    const {text, price, image, category_id} = this.state;
    const {session} = this.props;
    if (price.length < 1) {
      showToast('Ви незаповнели обов\'язкові поля', 'warning');
    } else {
      if (text.length < 10) {
        showToast('Малий опис оголошення', 'warning');
      } else {
        if (category_id === "") {
          showToast('Ви невибрали категорію', 'warning');
        } else {
          let paramsProduct = {
            text,
            user_id: session.id,
            category_id: category_id,
            price,
            image,
          };
          this.setState({
            loading: true
          });
          this.props.actions.addProduct(paramsProduct, session.jwt).then(() => {
            this.setState({
              loading: false
            })
          });
        }
      }
    }
  }

  isLoading() {
    if (!this.state.loading) {
      return <Button style={styles.btn} onPress={this.onCreateProductPressed.bind(this)}>
        <Text> Додати </Text>
      </Button>
    } else {
      return <Spinner color='blue'/>
    }
  }

  selectPhotoTapped() {
    const options = {
      title: 'Виберіть фото',
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
      },
      quality: 0.8,
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 1000
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        showToast('Ви відмінили вибір фотографії', 'warning');
      }
      else if (response.error) {
        showToast(`Помилка ${response.error}`, 'danger');
      }
      else if (response.customButton) {
        showToast(response.customButton, 'danger');
      }
      else {
        let source = {uri: response.uri};

        this.setState({
          imageSource: source,
          image: response
        });
      }
    });
  }

  render() {
    const categories = this.props.categories.map((category, index) => {
      return <Item key={index} label={category.name} value={category.id}/>
    });
    const {text, price, category_id, imageSource} = this.state;
    const {session} = this.props;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.props.actions.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Left>
          <Body>
          <Title>{(session.username) ? session.username : 'Додати оголошення'}</Title>
          </Body>
        </Header>

        <Content>
          <Body style={styles.bg}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View>
              { imageSource === null ?
                <View style={styles.imageContainer}><Text><Icon style={{color: '#fff'}}
                                                                name="cloud-upload"/></Text></View> :
                <Image style={styles.image} source={imageSource}/>
              }
            </View>
          </TouchableOpacity>
          </Body>
          <Label style={styles.pickerTitle}>Категорія*</Label>
          <Picker
            style={styles.bg}
            iosHeader="Виберіть категорію"
            mode="dialog"
            prompt="Виберіть категорію"
            selectedValue={category_id}
            onValueChange={(val) => this.setState({category_id: val})}>
            {categories}
          </Picker>
          <Body style={styles.bg}>
          <Item floatingLabel
                error={text.length < 10 && text != "" }
                success={text.length>=10 }
                style={styles.input}>
            <Label>Опис*</Label>
            <Input
              multiline={true}
              onChangeText={(val) => this.setState({text: val})}
            />
            { text != "" && <Icon name={text.length < 10 ? 'close-circle' : 'checkmark-circle'}/> }
          </Item>
          <Item floatingLabel
                error={price.length < 1 && price != "" }
                success={price.length>=1 }
                style={styles.input}>
            <Label>Ціна (грн)*</Label>
            <Input
              keyboardType='numeric'
              maxLength={5}
              onChangeText={(val) => this.setState({price: val})}
            />
            { price != "" && <Icon name={price.length < 1 ? 'close-circle' : 'checkmark-circle'}/> }
          </Item>
          {this.isLoading()}
          </Body>
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
    actions: bindActionCreators({...drawerActions, ...productActions, ...sessionActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
