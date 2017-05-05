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
   formData.append('product[text]', paramsProduct.text);
   formData.append('product[user_id]', paramsProduct.user_id);
   formData.append('product[category_id]', paramsProduct.category_id);
   formData.append('product[price]', paramsProduct.price);
   if(paramsProduct.image.fileName){ // check if upload image
     formData.append('product[image]', {
       uri: paramsProduct.image.uri,
       type: paramsProduct.image.type,
       name: paramsProduct.image.fileName,
     });
   }
   let response = await fetch('http://fshop.ustk.in.ua/products.json', {
    method: 'POST',
    headers: {
      'AUTHORIZATION': `Bearer ${jwt}`,
    },
    body: formData
  });
   return response = JSON.parse(await response.text())
 }
}

export default ProductApi