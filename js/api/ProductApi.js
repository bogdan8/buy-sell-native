class ProductApi {
  /* Get all products */
  static async getAllProducts() {
    let response = await fetch('http://firtkashop.herokuapp.com/products/1.json?per=100', {
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
    console.log(paramsProduct)
    let response = await fetch('http://firtkashop.herokuapp.com/products.json', {
      method: 'POST',
      headers: {
        'AUTHORIZATION': `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: paramsProduct
      })
    });

    return response = JSON.parse(await response.text());
  }
}

export default ProductApi