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
}

export default ProductApi