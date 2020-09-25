var listBuilder = (function() {
  let self = {
    fromDate: null,
    toDate: null,
    invoiceType: null,
    offset: 0,
    limit: 10
  };

  let validationErrors = [];

  function setFromDate(fromDate) {
    if (fromDate) {
      self.fromDate = fromDate;
    }

    return listBuilder;
  }

  function setToDate(toDate) {
    if (toDate) {
      self.toDate = toDate;
    }

    return listBuilder;
  }

  function setInvoiceType(invoiceType) {
    if (invoiceType) {
      self.invoiceType = invoiceType;
    }

    return listBuilder;
  }

  function setOffset(offset) {
    if (offset) {
      self.offset = offset;
    }

    return listBuilder;
  }

  function setLimit(limit) {
    if (limit) {
      self.limit = limit;
    }

    return listBuilder;
  }

  function validate() {
    return validationErrors.length === 0;
  }

  function build() {
    if (!validate()) {
      // TODO return errors or throw an error
    }

    return self;
  }

  return {
    setFromDate,
    setToDate,
    setInvoiceType,
    setOffset,
    setLimit,
    build
  };
})();

module.exports = listBuilder;
