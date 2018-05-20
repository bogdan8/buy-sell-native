class CategoryApi {
  /* Get all categories */
  static async getAllCategories() {
    let response = await fetch('http://fshop.ustk.in.ua/categories/1.json?per=100', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response = await response.json();
  }
}

export default CategoryApi;
