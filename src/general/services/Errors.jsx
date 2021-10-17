class Errors {
  errors = {};
  getErrors() {
    return this.errors;
  }
  setErrors(response) {
    this.errors = response.data.errors;
    return true;
  }
  getKey(key) {
    return this.errors[key] !== undefined ? this.errors[key][0] : null;
  }
  reset() {
    this.errors = {};
    return true;
  }
}

export default new Errors();