class ProductApi {
  /* Get all products */
  static async getAllProducts() {
    let response = await fetch('http://fshop.ustk.in.ua/products/1.json?per=100', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    return response = await response.text()
  }

  /* Create product */
  static async createProduct(paramsProduct, jwt) {
    let formData = new FormData();
    let image = {
     uri: paramsProduct.image.uri,
     type: paramsProduct.image.type,
     name: paramsProduct.image.fileName,
   }
   formData.append('product[text]', paramsProduct.text);
   formData.append('product[user_id]', paramsProduct.user_id);
   formData.append('product[category_id]', paramsProduct.category_id);
   formData.append('product[price]', paramsProduct.price);
   formData.append('product[image]', image);
   let xhr = new XMLHttpRequest();
   xhr.open('POST', 'http://fshop.ustk.in.ua/products.json');
   xhr.setRequestHeader('AUTHORIZATION', `Bearer ${jwt}`,)
   xhr.send(formData);
 }
}

export default ProductApi