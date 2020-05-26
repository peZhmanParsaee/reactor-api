export default (function AddProductBuilder() {
  let self = {
    name: null,
    stock: null,
    unitPrice: null
  };

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

  function build() {
    return self;
  }

  return {
    build,
    setName,
    setStock,
    setUnitPrice
  };
})();
