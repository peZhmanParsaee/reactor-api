export default (function AddProductBuilder() {
  let self = {
    name: null,
    stock: null,
    unitPrice: null
  };
  let validationErrors = [];

  function setName(name) {
    if (name) {
      self.name = name;
    }
    return this;
  }

  function setStock(stock) {
    if (stock) {
      self.stock = stock;
    }
    return this;
  }

  function setUnitPrice(unitPrice) {
    if (unitPrice) {
      self.unitPrice = unitPrice;
    }
    return this;
  }

  function validate() {
    if (!self.name) {
      validationErrors.push('نام محصول اجباری است');
    }
    if (!self.stock) {
      validationErrors.push('موجودی اجباری است');
    }
    if (!self.unitPrice) {
      validationErrors.push('قیمت واحد اجباری است');
    }
    return validationErrors.length === 0;
  }

  function build() {
    if (!validate()) {
      // TODO return errors or throw an error
    }
    return self;
  }

  return {
    build,
    setName,
    setStock,
    setUnitPrice
  };
})();
