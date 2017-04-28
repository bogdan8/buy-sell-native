import request from 'superagent';

class CategoryApi {
  /* Get all categories */
  static getAllCategories() {
    let req = request.get('/categories.json');
    return req.then(response => {
      return response;
    }, error => {
      return error;
    });
  }
}

export default CategoryApi